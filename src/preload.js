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
async function adicionarCliente(nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf) {
    return ipcRenderer.invoke('adicionar-cliente', nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf)
}
async function atualizarCliente(nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf, id) {
    return ipcRenderer.invoke('atualizar-cliente', nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf, id)
}
async function deletarCliente(id) {
    return ipcRenderer.invoke('deletar-cliente', id)
}

//usuario
async function getUsuarios() {
    return ipcRenderer.invoke('get-usuario')
}
async function adicionarUsuario(nome, email, login, senha, perfil) {
    return ipcRenderer.invoke('adicionar-usuario', nome, email, login, senha, perfil)
}
async function atualizarUsuario(nome, email, login, senha, perfil, id) {
    return ipcRenderer.invoke('atualizar-usuario', nome, email, login, senha, perfil, id)
}
async function deletarUsuario(id) {
    return ipcRenderer.invoke('deletar-usuario', id)
}

// distribuição
async function getDistribuicoes() {
    return ipcRenderer.invoke('get-distribuicao');
}
async function adicionarDistribuicao(medicamento_id, quantidade, saida, usuarioId, cliente_id) {
    return ipcRenderer.invoke('adicionar-distribuicao', medicamento_id, quantidade, saida, usuarioId, cliente_id)
}
async function validaCliente(cpf) {
    return ipcRenderer.invoke('valida-cliente', cpf)
}
async function validaMedicamento(nome) {
    return ipcRenderer.invoke('valida-medicamento', nome)
}

//login
async function validarLogin(login, senha) {
    return ipcRenderer.invoke('validar-login', login, senha)
}
async function fecharLogin() {
    return ipcRenderer.invoke('fechar-login');
}

//janelas
function abrirMedicamento() {
    ipcRenderer.send('abrir-medicamento');
}
function abrirCliente() {
    ipcRenderer.send('abrir-cliente')
}
function abrirUsuario() {
    ipcRenderer.send('abrir-usuario')
}
function createMainWindow() {
    ipcRenderer.send('abrir-janela-principal')
}
function abrirDistribuicao() {
    ipcRenderer.send('abrir-distribuicao');
}
function createMainWindowUser() {
    ipcRenderer.send('abrir-janela-user')
}

//caixas de dialogo
function alertar(mensagem) {
    return ipcRenderer.invoke('mostrar-alerta', mensagem);
}
function confirmar(mensagem) {
    return ipcRenderer.invoke('mostrar-confirm', mensagem);
}
// Expondo as APIs para o contexto da janela principal
contextBridge.exposeInMainWorld('projetoAPI',
    {
        getMedicamentos,
        adicionarMedicamento,
        atualizarMedicamento,
        deletarMedicamento,

        getClientes,
        adicionarCliente,
        atualizarCliente,
        deletarCliente,

        getUsuarios,
        adicionarUsuario,
        atualizarUsuario,
        deletarUsuario,

        validarLogin,

        getDistribuicoes,
        adicionarDistribuicao,
        validaCliente,
        validaMedicamento,
    }
)

contextBridge.exposeInMainWorld('dialogAPI',
    { alertar, confirmar }
);

contextBridge.exposeInMainWorld('janelaAPI',
    {
        abrirMedicamento: abrirMedicamento,
        abrirCliente: abrirCliente,
        abrirUsuario: abrirUsuario,
        createMainWindow: createMainWindow,
        fecharLogin: fecharLogin,
        abrirDistribuicao: abrirDistribuicao,
        createMainWindowUser: createMainWindowUser
    }
);
