import postgres from "postgres";

const DB = process.env["DB"];

export async function connectDatabase() {
  try {
    if (!DB || !DB.length) {
      console.error(
        "Erro ao se conectar ao Banco de Dados. O caminho para o BD não está definido corretamente."
      );
      return;
    }

    const sql = postgres(DB);

    const [{ version }] = await sql`SELECT version()`;

    console.log(`Base de Dados conectada com sucesso. Versão: ${version}`);
    return sql;
  } catch (error) {
    console.error("Erro ao se conectar com a base de dados: ", error);
  }
}
