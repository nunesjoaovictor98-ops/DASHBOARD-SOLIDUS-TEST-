import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

export default async function handler(req, res) {
  try {
    const resultado = await pool.query(`
      SELECT
        current_database() AS banco,
        NOW() AS horario
    `);

    return res.status(200).json({
      conectado: true,
      banco: resultado.rows[0].banco,
      horario: resultado.rows[0].horario
    });
  } catch (erro) {
    console.error("Erro de conexão:", erro.message);

    return res.status(500).json({
      conectado: false,
      mensagem: erro.message
    });
  }
}
