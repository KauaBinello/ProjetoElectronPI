const db = require('../db');

async function validaCliente(event, cpf) {
    const sql = `SELECT id FROM pi.clientes WHERE cpf = $1`
    const values = [cpf]
    const result = await db.query(sql, values)
    return result.rows[0];
}

async function validaTelefone(event, telefone) {
    const sql = `SELECT id FROM pi.clientes WHERE telefone = $1`
    const values = [telefone]
    const result = await db.query(sql, values)
    return result.rows[0];
}

async function validaMedicamento(event, nome) {
    const sql = await db.query(`
        SELECT id, saldo
        FROM pi.medicamentos
        WHERE TRIM(nome) ILIKE TRIM($1)
    `, [nome])

    if (sql.rows.length > 0) {
        return sql.rows[0]; // retorna os dados do medicamento
    } else {
        return null; // medicamento não encontrado
    }
}

async function validaUsuario(event, login) {
    const sql = `SELECT id FROM pi.usuarios WHERE login = $1`
    const values = [login]
    const result = await db.query(sql, values)
    return result.rows[0];
}

async function validaEmail(event, email) {
    const sql = `SELECT id FROM pi.usuarios WHERE email = $1`
    const values = [email]
    const result = await db.query(sql, values)
    return result.rows[0];
}

    module.exports = {
        validaCliente,
        validaMedicamento,
        validaTelefone,
        validaEmail,
        validaUsuario
    }