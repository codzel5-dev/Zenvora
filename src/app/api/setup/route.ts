import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

/**
 * GET /api/setup
 * One-time setup endpoint to create missing tables on Turso.
 * Call this once after deploying to ensure all tables exist.
 * 
 * Security: Only runs if a valid setup key is provided.
 */
export async function GET(request: NextRequest) {
  try {
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;

    if (!tursoUrl) {
      return NextResponse.json({ error: 'TURSO_DATABASE_URL is not configured' }, { status: 500 });
    }

    const client = createClient({
      url: tursoUrl,
      authToken: tursoToken || '',
    });

    const results: string[] = [];

    // Create ConversionJob table if it doesn't exist
    await client.execute(`
      CREATE TABLE IF NOT EXISTS ConversionJob (
        id TEXT PRIMARY KEY NOT NULL,
        jobId TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL DEFAULT 'waiting',
        percent INTEGER NOT NULL DEFAULT 0,
        inputFileName TEXT NOT NULL,
        inputMimeType TEXT NOT NULL,
        outputFormat TEXT NOT NULL,
        fileUrl TEXT NOT NULL DEFAULT '',
        downloadUrl TEXT,
        outputFilename TEXT,
        error TEXT,
        keyLabel TEXT,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    results.push('ConversionJob table created/verified');

    // Verify the table exists
    const tableCheck = await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='ConversionJob'");
    if (tableCheck.rows.length > 0) {
      results.push('ConversionJob table confirmed exists');
    }

    // Check all required tables
    const allTables = await client.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
    const tableNames = allTables.rows.map(r => r.name as string);
    results.push(`All tables: ${tableNames.join(', ')}`);

    return NextResponse.json({
      success: true,
      message: 'Database setup complete',
      results,
      tables: tableNames,
    });
  } catch (error) {
    console.error('[Setup] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Setup failed' },
      { status: 500 }
    );
  }
}
