const db = require('../db');

async function getMedicamentos() {
    const sql = await db.query(`SELECT 
  id, 
  nome, 
  embalagem, 
  saldo, 
  TO_CHAR(validade, 'DD/MM/YYYY') AS validade_formatada
FROM pi.medicamentos ORDER BY nome`);
    return sql.rows;
}

async function getMedicamentoById(event, id) {
    const sql = await db.query(`SELECT 
  id, 
  nome, 
  embalagem, 
  saldo, 
  TO_CHAR(validade, 'YYYY-MM-DD') AS validade
FROM pi.medicamentos WHERE id = $1`, [id]);
    return sql.rows[0];
}

async function adicionarMedicamento(event, nome, embalagem, saldo, validade) {
    const sql = `INSERT INTO pi.medicamentos (nome, embalagem, saldo, validade) 
                 VALUES ($1, $2, $3, $4)`;
    const values = [nome, embalagem, saldo, validade];
    await db.query(sql, values);
}

async function atualizarMedicamento(event, nome, embalagem, saldo, validade, id) {
    const sql = `UPDATE pi.medicamentos SET 
                 nome = $1, 
                 embalagem = $2, 
                 saldo = $3, 
                 validade = $4 
                 WHERE id = $5`;
    const values = [nome, embalagem, saldo, validade, id];
    await db.query(sql, values);
}

async function deletarMedicamento(event, id) {
    const sql = `DELETE FROM pi.medicamentos WHERE id = $1`;
    const values = [id];
    await db.query(sql, values);
}

module.exports = {
    getMedicamentos,
    adicionarMedicamento,
    atualizarMedicamento,
    deletarMedicamento,
    getMedicamentoById
};