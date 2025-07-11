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
async function getMedicamentoById(id) {
    return ipcRenderer.invoke('get-medicamento-by-id', id);
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
async function getClienteById(id) {
    return ipcRenderer.invoke('get-cliente-by-id', id)
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

// validações
async function validaCliente(cpf) {
    return ipcRenderer.invoke('valida-cliente', cpf)
}
async function validaMedicamento(nome) {
    return ipcRenderer.invoke('valida-medicamento', nome)
}
async function validaTelefone(telefone) {
    return ipcRenderer.invoke('valida-telefone', telefone)
}
async function validaUsuario(login) {
    return ipcRenderer.invoke('valida-usuario', login)
}
async function validaEmail(email) {
    return ipcRenderer.invoke('valida-email', email)
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
function abrirDadosMedicamento() {
    ipcRenderer.send('abrir-dados-medicamento');
}
function abrirDadosCliente() {
    ipcRenderer.send('abrir-dados-cliente')
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
        getMedicamentoById,

        getClientes,
        adicionarCliente,
        atualizarCliente,
        deletarCliente,
        getClienteById,

        getUsuarios,
        adicionarUsuario,
        atualizarUsuario,
        deletarUsuario,

        validarLogin,

        getDistribuicoes,
        adicionarDistribuicao,

        validaCliente,
        validaMedicamento,
        validaTelefone,
        validaUsuario,
        validaEmail
    }
)

contextBridge.exposeInMainWorld('dialogAPI',
    { alertar, confirmar }
);

contextBridge.exposeInMainWorld('janelaAPI',
    {
        abrirMedicamento,
        abrirCliente,
        abrirUsuario,
        createMainWindow,
        fecharLogin,
        abrirDistribuicao,
        createMainWindowUser,
        abrirDadosMedicamento,
        abrirDadosCliente
    }
);

/*contextBridge.exposeInMainWorld('comunicacaoAPI', {
    notificarAtualizacao: () => ipcRenderer.send('medicamento-atualizado'),
    escutarAtualizacao: (callback) => ipcRenderer.on('medicamento-atualizado', callback),

    notificarAtualizacao: () => ipcRenderer.send('cliente-atualizado'),
    escutarAtualizacao: (callback) => ipcRenderer.on('cliente-atualizado', callback)
});*/

contextBridge.exposeInMainWorld('comunicacaoAPI', {
    notificarAtualizacao: () => ipcRenderer.send('medicamento-atualizado'),
    escutarAtualizacao: (callback) => ipcRenderer.on('medicamento-atualizado', callback),
});