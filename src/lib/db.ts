import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  __dbUrl?: string
}

function createDbClient() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN || ''

  // If Turso URL is configured, use the driver adapter
  if (tursoUrl) {
    // Recreate client if URL changed
    if (globalForPrisma.prisma && globalForPrisma.__dbUrl === tursoUrl) {
      return globalForPrisma.prisma
    }

    const adapter = new PrismaLibSQL({
      url: tursoUrl,
      authToken: tursoToken,
    })
    const client = new PrismaClient({ adapter })
    globalForPrisma.__dbUrl = tursoUrl
    return client
  }

  // Fallback to local SQLite (DATABASE_URL)
  return new PrismaClient({
    log: ['query'],
  })
}

export const db = createDbClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
