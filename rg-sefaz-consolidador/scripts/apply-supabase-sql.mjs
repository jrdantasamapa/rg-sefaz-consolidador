import { readFile } from "node:fs/promises";
import { Client } from "pg";

const password = process.env.SUPABASE_DB_PASSWORD;
const databaseUrl = process.env.SUPABASE_DATABASE_URL;

if (!password) {
  console.error("SUPABASE_DB_PASSWORD nao informado.");
  process.exit(1);
}

const files = [
  "supabase/migrations/202605200001_initial_schema.sql",
  "supabase/migrations/202605200002_rls_policies.sql",
  "supabase/migrations/202605200003_dynamic_forms.sql",
  "supabase/seed.sql",
];

const client = databaseUrl
  ? new Client({ connectionString: databaseUrl.replace("[YOUR-PASSWORD]", encodeURIComponent(password)), ssl: { rejectUnauthorized: false } })
  : new Client({
      host: "db.brtmwmeccvfrblyuniwc.supabase.co",
      port: 5432,
      database: "postgres",
      user: "postgres",
      password,
      ssl: { rejectUnauthorized: false },
    });

try {
  await client.connect();

  for (const file of files) {
    console.log(`Aplicando ${file}...`);
    const sql = await readFile(file, "utf8");
    await client.query(sql);
  }

  console.log("Migrations e seed aplicados com sucesso.");
} finally {
  await client.end();
}
