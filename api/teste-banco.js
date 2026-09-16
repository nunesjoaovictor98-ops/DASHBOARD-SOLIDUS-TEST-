const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

module.exports = async function handler(req, res) {
  try {
    const resultado = await pool.query(`
      SELECT
        current_database() AS banco,
        NOW() AS horario
    `);

    res.status(200).json({
      conectado: true,
      banco: resultado.rows[0].banco,
      horario: resultado.rows[0].horario
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      conectado: false,
      mensagem: "Falha ao conectar ao banco"
    });
  }
};
