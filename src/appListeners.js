const { ipcMain, dialog, BrowserWindow } = require('electron');

const { modalAbrirMedicamento, modalAbrirCliente, modalAbrirUsuario, modalAbrirDistribuicao } = require('./janelaModal');
const { createMainWindow, closeLoginWindow, createMainWindowUser } = require('./janelaPrincipal')

const { getMedicamentos, adicionarMedicamento, atualizarMedicamento, deletarMedicamento } = require('./medicamento/medicamentoDB');
const { getClientes, adicionarCliente, atualizarCliente, deletarCliente } = require('./cliente/clienteDB')
const { getUsuarios, adicionarUsuario, atualizarUsuario, deletarUsuario } = require('./usuario/usuarioDB')
const { getDistribuicoes, adicionarDistribuicao } = require('./distribuicao/distribuicaoDB')

const { validarLogin } = require('./login/loginDB')
const { validaCliente, validaMedicamento } = require('./validacoes/validacoesDB')

const { mostrarAlerta, mostrarConfirm } = require('./dialogs/dialogs')

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

function registrarValidacoes() {
    ipcMain.handle('valida-cliente', validaCliente);
    ipcMain.handle('valida-medicamento', validaMedicamento);
}

function registrarDialogs() {
    ipcMain.handle('mostrar-alerta', mostrarAlerta)
    ipcMain.handle('mostrar-confirm', mostrarConfirm)
}

function registrarListeners() {
    registrarMedicamentosListeners();
    registrarClientesListeners();
    registrarUsuariosListeners();
    registrarLoginListeners();
    registrarJanelas();
    registrarDistribuicoesListeners();
    registrarDialogs();
    registrarValidacoes();
}

module.exports = {
    registrarListeners
}
