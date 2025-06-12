const { contextBridge, ipcRenderer } = require('electron');

//medicamento
async function getMedicamentos() {
    return ipcRenderer.invoke('get-medicamento');
}
async function adicionarMedicamento(nome, embalagem, saldo, validade) {
    return ipcRenderer.invoke('adicionar-medicamento', nome, embalagem, saldo, validade);
}
async function atualizarMedicamento(nome, embalagem, saldo, validade, id) {
    return ipcRenderer.invoke('atualizar-medicamento', nome, embalagem, saldo, validade, id);
}
async function deletarMedicamento(id) {
    return ipcRenderer.invoke('deletar-medicamento', id);
}

//cliente
async function getClientes() {
    return ipcRenderer.invoke('get-cliente');
}
async function adicionarCliente(nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, nascimento) {
    ipcRenderer.invoke('adicionar-cliente', nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, nascimento)
}
async function atualizarCliente(nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, nascimento, id) {
    ipcRenderer.invoke('atualizar-cliente', nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, nascimento, id)
}
async function deletarCliente(id) {
    ipcRenderer.invoke('deletar-cliente', id)
}
//janelas
function abrirMedicamento() {
    ipcRenderer.send('abrir-medicamento');
}
function abrirCliente() {
    ipcRenderer.send('abrir-cliente')
}

// Expondo as APIs para o contexto da janela principal
contextBridge.exposeInMainWorld('projetoAPI',
    {
        getMedicamentos: getMedicamentos,
        adicionarMedicamento: adicionarMedicamento,
        atualizarMedicamento: atualizarMedicamento,
        deletarMedicamento: deletarMedicamento,

        getClientes: getClientes,
        adicionarCliente: adicionarCliente,
        atualizarCliente: atualizarCliente,
        deletarCliente: deletarCliente
    }
)

contextBridge.exposeInMainWorld('janelaAPI',
    {
        abrirMedicamento: abrirMedicamento,
        abrirCliente: abrirCliente
    }
);