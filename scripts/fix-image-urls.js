const { createClient } = require("@libsql/client");

const client = createClient({
  url: "libsql://zenvora-zenvoora.aws-ap-northeast-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzgyNjYyNzcsImlkIjoiMDE5ZTA4ZWQtOTcwMS03YWI1LWJiOTAtODA0NTVlZTFmMWI4IiwicmlkIjoiMjUwZTM1ZDEtNjJkYy00MzdjLWEwYzQtOWI1YmNjZGNmNzgwIn0.yqIVQb_rrJ9naecBS31uWb2YuBLchfr8HkFEM-tURFgPFu6rwK05a0_X6-YpC8CLroEeq6u5uPAMdIse2x7-Bg",
});

async function main() {
  // ============================================================
  // FIX 1: Replace absolute URLs with relative paths
  // ============================================================
  const fix1Updates = [
    {
      old: "https://zenvoora.vercel.app/blog/ai-file-management-hero.png",
      new: "/blog/ai-file-management-hero.png",
    },
    {
      old: "https://zenvoora.vercel.app/blog/file-conversion-hero.png",
      new: "/blog/file-conversion-hero.png",
    },
    {
      old: "https://zenvoora.vercel.app/blog/cloud-security-hero.png",
      new: "/blog/cloud-security-hero.png",
    },
    {
      old: "https://zenvoora.vercel.app/blog/free-file-sharing-hero.png",
      new: "/blog/free-file-sharing-hero.png",
    },
    {
      old: "https://zenvoora.vercel.app/blog/cloud-vs-local-storage-hero.png",
      new: "/blog/cloud-vs-local-storage-hero.png",
    },
    {
      old: "https://zenvoora.vercel.app/blog/data-privacy-laws-guide.png",
      new: "/blog/data-privacy-laws-guide.png",
    },
    {
      old: "https://zenvoora.vercel.app/blog/remote-work-file-sharing-guide.png",
      new: "/blog/remote-work-file-sharing-guide.png",
    },
    {
      old: "https://zenvoora.vercel.app/blog/encrypt-files-cloud-guide.png",
      new: "/blog/encrypt-files-cloud-guide.png",
    },
    {
      old: "https://zenvoora.vercel.app/blog/free-cloud-storage-2026.png",
      new: "/blog/free-cloud-storage-2026.png",
    },
    {
      old: "https://zenvoora.vercel.app/blog/file-format-conversion-guide.png",
      new: "/blog/file-format-conversion-guide.png",
    },
  ];

  console.log("=== FIX 1: Replacing absolute URLs with relative paths ===\n");

  for (const { old: oldUrl, new: newUrl } of fix1Updates) {
    const result = await client.execute({
      sql: "UPDATE BlogPost SET imageUrl = ? WHERE imageUrl = ?",
      args: [newUrl, oldUrl],
    });
    console.log(
      `  ${oldUrl} → ${newUrl}  (rows affected: ${result.rowsAffected})`
    );
  }

  // ============================================================
  // FIX 2: Fix wrong path prefix (only if file exists at new path)
  // ============================================================
  console.log("\n=== FIX 2: Check /images/blog/ → /blog/ path fix ===\n");

  // We checked the filesystem BEFORE running this script:
  // /public/blog/image-optimization-workflow.png    → DOES NOT EXIST
  // /public/images/blog/image-optimization-workflow.png → EXISTS
  // Therefore, we must KEEP the original path and NOT update it.

  const fileExistsAtNewPath = false; // verified outside script

  if (fileExistsAtNewPath) {
    const result = await client.execute({
      sql: "UPDATE BlogPost SET imageUrl = ? WHERE imageUrl = ?",
      args: ["/blog/image-optimization-workflow.png", "/images/blog/image-optimization-workflow.png"],
    });
    console.log(
      `  /images/blog/image-optimization-workflow.png → /blog/image-optimization-workflow.png  (rows affected: ${result.rowsAffected})`
    );
  } else {
    console.log(
      "  SKIPPED: File does NOT exist at /blog/image-optimization-workflow.png"
    );
    console.log(
      "  File exists at /images/blog/image-optimization-workflow.png — keeping original path."
    );
  }

  // ============================================================
  // VERIFY: Select all imageUrls
  // ============================================================
  console.log("\n=== VERIFICATION: All article imageUrls after update ===\n");

  const articles = await client.execute(
    "SELECT id, title, imageUrl FROM BlogPost ORDER BY id"
  );

  console.log(`Total articles: ${articles.rows.length}\n`);
  console.log(
    "| # | ID | Title | imageUrl |"
  );
  console.log(
    "|---|---|---|---|"
  );
  articles.rows.forEach((row, i) => {
    const id = row.id;
    const title = String(row.title).substring(0, 50);
    const imageUrl = row.imageUrl;
    console.log(`| ${i + 1} | ${id} | ${title} | ${imageUrl} |`);
  });

  // Also check: are there any remaining absolute URLs?
  console.log("\n=== CHECK: Any remaining absolute URLs? ===\n");
  const absUrls = await client.execute(
    "SELECT id, imageUrl FROM BlogPost WHERE imageUrl LIKE 'http%'"
  );
  if (absUrls.rows.length === 0) {
    console.log("  ✅ No absolute URLs remaining. All fixed!");
  } else {
    absUrls.rows.forEach((row) => {
      console.log(`  ⚠️  BlogPost ${row.id}: ${row.imageUrl}`);
    });
  }
}

main()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
