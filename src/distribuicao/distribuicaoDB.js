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
JOIN pi.usuarios ON distribuicoes.usuario_id = usuarios.id`);
    return result.rows;
}

module.exports = {
    getDistribuicoes,
}