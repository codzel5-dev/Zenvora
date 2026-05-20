import { createClient } from "@libsql/client";

const TURSO_URL = "libsql://zenvora-zenvoora.aws-ap-northeast-1.turso.io";
const TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzgyNjYyNzcsImlkIjoiMDE5ZTA4ZWQtOTcwMS03YWI1LWJiOTAtODA0NTVlZTFmMWI4IiwicmlkIjoiMjUwZTM1ZDEtNjJkYy00MzdjLWEwYzQtOWI1YmNjZGNmNzgwIn0.yqIVQb_rrJ9naecBS31uWb2YuBLchfr8HkFEM-tURFgPFu6rwK05a0_X6-YpC8CLroEeq6u5uPAMdIse2x7-Bg";

const db = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});

async function main() {
  console.log("=".repeat(70));
  console.log("  TURSO DATABASE CONNECTION TEST");
  console.log("=".repeat(70));
  console.log(`  URL: ${TURSO_URL}`);
  console.log(`  Timestamp: ${new Date().toISOString()}`);
  console.log("=".repeat(70));

  // Step 0: Test connection
  console.log("\n📡 STEP 0: Testing Connection...");
  try {
    const connTest = await db.execute("SELECT 1 AS connected");
    console.log(`  ✅ Connection SUCCESSFUL — result: ${JSON.stringify(connTest.rows[0])}`);
  } catch (err) {
    console.log(`  ❌ Connection FAILED: ${err.message}`);
    process.exit(1);
  }

  // Step 1: Count published=1
  console.log("\n📊 STEP 1: Count blog posts where published=1");
  try {
    const res1 = await db.execute("SELECT COUNT(*) AS count FROM BlogPost WHERE published=1");
    console.log(`  ✅ Published posts (published=1): ${res1.rows[0].count}`);
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }

  // Step 2: Count published=0
  console.log("\n📊 STEP 2: Count blog posts where published=0");
  try {
    const res2 = await db.execute("SELECT COUNT(*) AS count FROM BlogPost WHERE published=0");
    console.log(`  ✅ Unpublished posts (published=0): ${res2.rows[0].count}`);
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }

  // Step 3: Latest 5 articles
  console.log("\n📝 STEP 3: Latest 5 articles (title, slug, published, createdAt)");
  try {
    const res3 = await db.execute({
      sql: "SELECT title, slug, published, createdAt FROM BlogPost ORDER BY createdAt DESC LIMIT 5",
    });
    if (res3.rows.length === 0) {
      console.log("  ⚠️  No articles found.");
    } else {
      res3.rows.forEach((row, i) => {
        console.log(`  ${i + 1}. "${row.title}"`);
        console.log(`     slug: ${row.slug}`);
        console.log(`     published: ${row.published}`);
        console.log(`     createdAt: ${row.createdAt}`);
      });
    }
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }

  // Step 4: imageUrl check
  console.log("\n🖼️  STEP 4: Check imageUrl presence");
  try {
    const withImg = await db.execute("SELECT COUNT(*) AS count FROM BlogPost WHERE imageUrl IS NOT NULL AND imageUrl != ''");
    const withoutImg = await db.execute("SELECT COUNT(*) AS count FROM BlogPost WHERE imageUrl IS NULL OR imageUrl = ''");
    console.log(`  ✅ Articles WITH imageUrl: ${withImg.rows[0].count}`);
    console.log(`  ✅ Articles WITHOUT imageUrl: ${withoutImg.rows[0].count}`);
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }

  // Step 5: Content length stats
  console.log("\n📏 STEP 5: Content length stats (min, max, avg character count)");
  try {
    const res5 = await db.execute({
      sql: "SELECT MIN(LENGTH(content)) AS minLen, MAX(LENGTH(content)) AS maxLen, AVG(LENGTH(content)) AS avgLen, COUNT(*) AS total FROM BlogPost",
    });
    const row = res5.rows[0];
    console.log(`  ✅ Total articles: ${row.total}`);
    console.log(`  ✅ Min content length: ${row.minLen} chars`);
    console.log(`  ✅ Max content length: ${row.maxLen} chars`);
    console.log(`  ✅ Avg content length: ${Math.round(Number(row.avgLen))} chars`);
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }

  // Bonus: Total row count
  console.log("\n🔢 BONUS: Total BlogPost count");
  try {
    const total = await db.execute("SELECT COUNT(*) AS count FROM BlogPost");
    console.log(`  ✅ Total blog posts: ${total.rows[0].count}`);
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }

  console.log("\n" + "=".repeat(70));
  console.log("  TEST COMPLETE");
  console.log("=".repeat(70));

  await db.close();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
