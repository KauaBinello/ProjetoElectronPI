const db = require('../db');

async function validaCliente(event, cpf) {
    const sql = `SELECT id FROM pi.clientes WHERE cpf = $1`
    const values = [cpf]
    const result = await db.query(sql, values)
    return result.rows[0];
}

async function validaMedicamento(event, nome) {
    const sql = await db.query(`
        SELECT *
        FROM pi.medicamentos
        WHERE TRIM(nome) ILIKE TRIM($1)
    `, [nome])

    if (sql.rows.length > 0) {
        return sql.rows[0]; // retorna os dados do medicamento
    } else {
        return null; // medicamento não encontrado
    }
}

module.exports = {
    validaCliente,
    validaMedicamento,
}