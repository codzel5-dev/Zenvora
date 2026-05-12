import { createClient } from '@libsql/client';

const client = createClient({
  url: 'libsql://zenvora-zenvoora.aws-ap-northeast-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsImtpZCI6InByaXZhdGUtdXJpIiwiYWxnIjoiRWREU0EifQ.eyJqdWkiOiI1MGM3ZGJhOC0xYzMzLTQ0ZjktYTRiOS1mZWNjYmI1NDJiOTciLCJpYXQiOjE3NDY4NzU3MjMsInNjb3BlIjoiZnVsbCIsInBlcm1pc3Npb25zIjpbXSwiaXNzIjoidHVyc28iLCJhdWQiOiJsaWJzcWw6Ly96ZW52b3JhLXplbnZvb3JhLmF3cy1hcC1ub3J0aGVhc3QtMS50dXJzby5kYiJ9.NgnBkjqRfFoFZTxH6QkNNw1qRlOF4cXJNlSDoCL_X44I4zU-9o2H_tqfBk5mEAzNfxhBgCSGhWb_GmDR2I1vCg',
});

// Update article 1: May 7, 2026
await client.execute({
  sql: `UPDATE BlogPost SET imageUrl = ?, createdAt = '2026-05-07 10:00:00', updatedAt = '2026-05-07 10:00:00' WHERE slug = ?`,
  args: ['https://zenvoora.vercel.app/blog/file-conversion-hero.png', 'essential-file-conversion-tools-professionals-2026'],
});
console.log('Updated article 1');

// Update article 2: May 6, 2026
await client.execute({
  sql: `UPDATE BlogPost SET imageUrl = ?, createdAt = '2026-05-06 10:00:00', updatedAt = '2026-05-06 10:00:00' WHERE slug = ?`,
  args: ['https://zenvoora.vercel.app/blog/cloud-security-hero.png', 'cloud-storage-security-complete-guide-protecting-files-online'],
});
console.log('Updated article 2');

// Update article 3: May 5, 2026
await client.execute({
  sql: `UPDATE BlogPost SET imageUrl = ?, createdAt = '2026-05-05 10:00:00', updatedAt = '2026-05-05 10:00:00' WHERE slug = ?`,
  args: ['https://zenvoora.vercel.app/blog/free-file-sharing-hero.png', 'ultimate-guide-free-file-sharing-upload-convert-share'],
});
console.log('Updated article 3');

// Verify
const check = await client.execute({
  sql: `SELECT slug, imageUrl, createdAt FROM BlogPost WHERE slug IN (?, ?, ?)`,
  args: ['essential-file-conversion-tools-professionals-2026', 'cloud-storage-security-complete-guide-protecting-files-online', 'ultimate-guide-free-file-sharing-upload-convert-share'],
});
for (const row of check.rows) {
  console.log(`${row.slug} | ${row.imageUrl} | ${row.createdAt}`);
}
