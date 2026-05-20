import { Client } from "pg";

const password = process.env.SUPABASE_DB_PASSWORD;

if (!password) {
  console.error("SUPABASE_DB_PASSWORD nao informado.");
  process.exit(1);
}

const client = new Client({
  host: "aws-1-sa-east-1.pooler.supabase.com",
  port: 6543,
  database: "postgres",
  user: "postgres.brtmwmeccvfrblyuniwc",
  password,
  ssl: { rejectUnauthorized: false },
});

const count = async (table) => {
  const result = await client.query(`select count(*)::int as total from public.${table}`);
  return result.rows[0].total;
};

try {
  await client.connect();
  const result = {
    setores: await count("setores"),
    itens_relatorio: await count("itens_relatorio"),
    tipos_formulario: await count("tipos_formulario"),
    informacoes_consolidadas: await count("informacoes_consolidadas"),
  };
  console.log(JSON.stringify(result, null, 2));
} finally {
  await client.end();
}
