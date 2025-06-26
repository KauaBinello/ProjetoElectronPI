const db = require('../db');

async function getUsuarios() {
    const sql = await db.query(`SELECT usuarios.id, usuarios.nome, usuarios.email, usuarios.login, usuarios.senha, usuarios.perfil FROM pi.usuarios ORDER BY nome`)
    return sql.rows
}

async function adicionarUsuario(event, nome, email, login, senha, perfil) {
    const sql = `INSERT INTO pi.usuarios(
	nome, email, login, senha, perfil)
	VALUES ($1, $2, $3, $4, $5); `
    const values = [nome, email, login, senha, perfil]
    await db.query(sql, values)
}

async function atualizarUsuario(event, nome, email, login, senha, perfil, id) {
    const sql = `UPDATE pi.usuarios SET nome = $1, email= $2, login= $3, senha= $4, perfil = $5 WHERE ID = $6`
    const values = [nome, email, login, senha, perfil, id]
    await db.query(sql, values)
}

async function deletarUsuario(event, id) {
    const sql = `DELETE FROM pi.usuarios WHERE id = $1`
    const values = [id]
    await db.query(sql, values)
}

module.exports = {
    getUsuarios,
    adicionarUsuario,
    atualizarUsuario,
    deletarUsuario
}