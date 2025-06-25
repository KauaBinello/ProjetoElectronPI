const { ipcMain } = require('electron');

const { modalAbrirMedicamento, modalAbrirCliente, modalAbrirUsuario, modalAbrirDistribuicao } = require('./janelaModal');
const { createMainWindow, closeLoginWindow, createMainWindowUser } = require('./janelaPrincipal')

const { getMedicamentos, adicionarMedicamento, atualizarMedicamento, deletarMedicamento } = require('./medicamento/medicamentoDB');
const { getClientes, adicionarCliente, atualizarCliente, deletarCliente } = require('./cliente/clienteDB')
const { getUsuarios, adicionarUsuario, atualizarUsuario, deletarUsuario } = require('./usuario/usuarioDB')
const { getDistribuicoes, adicionarDistribuicao, verificaCliente, verificaMedicamento } = require('./distribuicao/distribuicaoDB')

const { validarLogin } = require('./login/loginDB')

function registrarMedicamentosListeners() {
    ipcMain.handle('get-medicamento', getMedicamentos);
    ipcMain.handle('adicionar-medicamento', adicionarMedicamento);
    ipcMain.handle('atualizar-medicamento', atualizarMedicamento);
    ipcMain.handle('deletar-medicamento', deletarMedicamento);
}

function registrarClientesListeners() {
    ipcMain.handle('get-cliente', getClientes);
    ipcMain.handle('adicionar-cliente', adicionarCliente);
    ipcMain.handle('atualizar-cliente', atualizarCliente);
    ipcMain.handle('deletar-cliente', deletarCliente)
}

function registrarUsuariosListeners() {
    ipcMain.handle('get-usuario', getUsuarios);
    ipcMain.handle('adicionar-usuario', adicionarUsuario);
    ipcMain.handle('atualizar-usuario', atualizarUsuario);
    ipcMain.handle('deletar-usuario', deletarUsuario)
}

function registrarDistribuicoesListeners() {
    ipcMain.handle('get-distribuicao', getDistribuicoes);
    ipcMain.handle(`adicionar-distribuicao`, adicionarDistribuicao);
    ipcMain.handle('verifica-cliente', verificaCliente);
    ipcMain.handle('verifica-medicamento', verificaMedicamento);
}

function registrarLoginListeners() {
    ipcMain.handle('validar-login', validarLogin);
    ipcMain.handle('fechar-login', closeLoginWindow);
}

function registrarJanelas() {
    ipcMain.on('abrir-medicamento', modalAbrirMedicamento);
    ipcMain.on('abrir-cliente', modalAbrirCliente);
    ipcMain.on('abrir-usuario', modalAbrirUsuario);
    ipcMain.on('abrir-janela-principal', createMainWindow);
    ipcMain.on('abrir-distribuicao', modalAbrirDistribuicao);
    ipcMain.on('abrir-janela-user', createMainWindowUser)
}

function registrarSessaoListeners() {
    ipcMain.handle('set-usuario-logado', (event, usuario) => {
        global.usuarioLogado = usuario;
    });

    ipcMain.handle('get-usuario-logado', () => {
        return global.usuarioLogado;
    });
}

function registrarListeners() {
    registrarMedicamentosListeners();
    registrarClientesListeners();
    registrarUsuariosListeners();
    registrarLoginListeners();
    registrarJanelas();
    registrarSessaoListeners();
    registrarDistribuicoesListeners();
}

module.exports = {
    registrarListeners
}