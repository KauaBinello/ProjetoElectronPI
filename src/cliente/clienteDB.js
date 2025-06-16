const db = require('../db');

async function getClientes() {
    const sql = await db.query(`SELECT id,
nome,
cpf,
telefone,
TO_CHAR (nascimento, 'YYYY-MM-DD') AS nascimento,
TO_CHAR (nascimento, 'DD/MM/YYYY') AS nascimento_formatada,
endereco,
numero_residencial,
bairro,
cidade,
uf
FROM pi.clientes
ORDER BY id ASC 
`)
    return sql.rows;
}

async function adicionarCliente(event, nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf) {
    const sql = `INSERT INTO pi.clientes(
	nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`
    const values = [nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf]
    await db.query(sql, values)
}

async function atualizarCliente(event, nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf, id) {
    const sql = `UPDATE pi.clientes
    SET nome = $1, cpf = $2, telefone = $3, nascimento = $4, endereco = $5, numero_residencial = $6, bairro = $7, cidade = $8, uf = $9 WHERE id = $10`
    const values = [nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf, id]
    await db.query(sql, values)
}

async function deletarCliente(event, id) {
    const sql = `DELETE FROM pi.clientes
	WHERE id = $1;`
    const values = [id]
    await db.query(sql, values)
}

module.exports = {
    getClientes,
    adicionarCliente,
    atualizarCliente,
    deletarCliente
}
