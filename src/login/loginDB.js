const db = require('../db')

async function validarLogin(event, login, senha) {
    const sql = await db.query(`SELECT * FROM pi.usuarios WHERE login = $1 AND senha = $2`, [login, senha])
    if (sql.rows.length > 0) {
        return true
    } else {
        return false
    }
}

module.exports = {
    validarLogin
}