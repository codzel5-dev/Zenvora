import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

/**
 * POST /api/blog/update-dates
 * One-time endpoint to update blog post dates and images on Turso.
 */
export async function POST() {
  try {
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;

    if (!tursoUrl) {
      return NextResponse.json({ error: 'TURSO_DATABASE_URL not configured' }, { status: 500 });
    }

    const client = createClient({
      url: tursoUrl,
      authToken: tursoToken || '',
    });

    const results: string[] = [];

    // Article 1: May 7, 2026
    await client.execute({
      sql: `UPDATE BlogPost SET imageUrl = ?, createdAt = '2026-05-07T10:00:00.000Z', updatedAt = '2026-05-07T10:00:00.000Z' WHERE slug = ?`,
      args: ['https://zenvoora.vercel.app/blog/file-conversion-hero.png', 'essential-file-conversion-tools-professionals-2026'],
    });
    results.push('Updated: essential-file-conversion-tools (May 7, 2026)');

    // Article 2: May 6, 2026
    await client.execute({
      sql: `UPDATE BlogPost SET imageUrl = ?, createdAt = '2026-05-06T10:00:00.000Z', updatedAt = '2026-05-06T10:00:00.000Z' WHERE slug = ?`,
      args: ['https://zenvoora.vercel.app/blog/cloud-security-hero.png', 'cloud-storage-security-complete-guide-protecting-files-online'],
    });
    results.push('Updated: cloud-storage-security (May 6, 2026)');

    // Article 3: May 5, 2026
    await client.execute({
      sql: `UPDATE BlogPost SET imageUrl = ?, createdAt = '2026-05-05T10:00:00.000Z', updatedAt = '2026-05-05T10:00:00.000Z' WHERE slug = ?`,
      args: ['https://zenvoora.vercel.app/blog/free-file-sharing-hero.png', 'ultimate-guide-free-file-sharing-upload-convert-share'],
    });
    results.push('Updated: ultimate-guide-free-file-sharing (May 5, 2026)');

    // Verify
    const check = await client.execute({
      sql: `SELECT slug, imageUrl, createdAt FROM BlogPost WHERE slug IN (?, ?, ?)`,
      args: ['essential-file-conversion-tools-professionals-2026', 'cloud-storage-security-complete-guide-protecting-files-online', 'ultimate-guide-free-file-sharing-upload-convert-share'],
    });
    const verification = check.rows.map(r => ({
      slug: r.slug,
      imageUrl: r.imageUrl,
      createdAt: r.createdAt,
    }));

    return NextResponse.json({ success: true, results, verification });
  } catch (error) {
    console.error('Update dates error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 }
    );
  }
}
