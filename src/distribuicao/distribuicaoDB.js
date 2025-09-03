const db = require('../db');

async function getDistribuicoes() {
    const result = await db.query(`
SELECT 
distribuicoes.serial, 
distribuicoes.cliente_id, 
clientes.nome AS cliente_nome,
clientes.cpf AS cliente_cpf,
distribuicoes.medicamento_id, 
medicamentos.nome AS medicamento_nome, 
distribuicoes.quantidade, 
distribuicoes.usuario_id, 
usuarios.nome AS usuario_nome, 
TO_CHAR(distribuicoes.saida, 'DD/MM/YYYY') AS saida
FROM pi.distribuicoes
JOIN pi.clientes ON distribuicoes.cliente_id = clientes.id
JOIN pi.medicamentos ON distribuicoes.medicamento_id = medicamentos.id
JOIN pi.usuarios ON distribuicoes.usuario_id = usuarios.id ORDER BY distribuicoes.saida DESC`);
    return result.rows;
}

async function atualizarDistribuicao(event, clienteId, medicamentoId, quantidade, serial) {
    const sql = `UPDATE pi.distribuicoes SET cliente_id = $1, medicamento_id = $2, quantidade = $3 WHERE serial = $4`
    const values = [clienteId, medicamentoId, quantidade, serial]
    await db.query(sql, values)
}

async function deletarDistribuicao(event, serial) {
    const sql = `DELETE FROM pi.distribuicoes WHERE serial = $1`
    await db.query(sql, [serial])
}

async function getDistribuicaoById(event, serial) {
    const result = await db.query(`
SELECT 
distribuicoes.serial, 
distribuicoes.cliente_id, 
clientes.nome AS cliente_nome,
clientes.cpf AS cliente_cpf,
distribuicoes.medicamento_id, 
medicamentos.nome AS medicamento_nome, 
distribuicoes.quantidade, 
distribuicoes.usuario_id, 
usuarios.nome AS usuario_nome, 
TO_CHAR(distribuicoes.saida, 'DD-MM-YYYY') AS saida
FROM pi.distribuicoes
JOIN pi.clientes ON distribuicoes.cliente_id = clientes.id
JOIN pi.medicamentos ON distribuicoes.medicamento_id = medicamentos.id
JOIN pi.usuarios ON distribuicoes.usuario_id = usuarios.id
WHERE distribuicoes.serial = $1`, [serial]);
    return result.rows[0];
}

async function adicionarDistribuicao(event, medicamento_id, quantidade, saida, usuario_id, cliente_id) {
    const sql = `INSERT INTO pi.distribuicoes (medicamento_id, quantidade, saida, usuario_id, cliente_id)
    VALUES ($1, $2, $3, $4, $5)`
    const sql2 = `UPDATE pi.medicamentos SET saldo = saldo - $1 WHERE id = $2`
    const values = [medicamento_id, quantidade, saida, usuario_id, cliente_id]
    const values2 = [quantidade, medicamento_id]

    await db.query(sql, values)
    await db.query(sql2, values2)
}
module.exports = {
    getDistribuicoes,
    adicionarDistribuicao,
    getDistribuicaoById,
    atualizarDistribuicao,
    deletarDistribuicao
}