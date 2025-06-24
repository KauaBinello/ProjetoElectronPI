const db = require('../db');

async function validarLogin(event, login, senha) {
    const sql = await db.query(
        `SELECT id, nome, email, login, perfil FROM pi.usuarios WHERE login = $1 AND senha = $2`,
        [login, senha]
    );

    if (sql.rows.length > 0) {
        return sql.rows[0]; // retorna os dados do usuário
    } else {
        return null; // login inválido
    }
}

module.exports = {
    validarLogin
};