const { ipcMain } = require('electron');

const { modalAbrirMedicamento, modalAbrirCliente, modalAbrirUsuario, modalAbrirDistribuicao, AbrirDadosMedicamento, abrirDadosCliente, getJanelaCliente, getJanelaMedicamento, abrirDadosUsuario, getJanelaUsuario, abrirDadosDistribuicao, getJanelaDistribuicao } = require('./janelaModal');
const { createMainWindow, closeLoginWindow, createMainWindowUser } = require('./janelaPrincipal')

const { getMedicamentos, getMedicamentoById, adicionarMedicamento, atualizarMedicamento, deletarMedicamento } = require('./medicamento/medicamentoDB');
const { getClientes, getClienteById, adicionarCliente, atualizarCliente, deletarCliente } = require('./cliente/clienteDB')
const { getUsuarios, adicionarUsuario, atualizarUsuario, deletarUsuario, getUsuarioById } = require('./usuario/usuarioDB')
const { getDistribuicoes, adicionarDistribuicao, getDistribuicaoById } = require('./distribuicao/distribuicaoDB')

const { validarLogin } = require('./login/loginDB')
const { validaCliente, validaMedicamento, validaTelefone, validaUsuario, validaEmail } = require('./validacoes/validacoesDB')

const { mostrarAlerta, mostrarConfirm } = require('./dialogs/dialogs')

const { notificarAtualizacao } = require('./utils/notificador');

function registrarMedicamentosListeners() {
    ipcMain.handle('get-medicamento', getMedicamentos);
    ipcMain.handle('adicionar-medicamento', adicionarMedicamento);
    ipcMain.handle('atualizar-medicamento', atualizarMedicamento);
    ipcMain.handle('deletar-medicamento', deletarMedicamento);
    ipcMain.handle('get-medicamento-by-id', getMedicamentoById);
}

function registrarClientesListeners() {
    ipcMain.handle('get-cliente', getClientes);
    ipcMain.handle('adicionar-cliente', adicionarCliente);
    ipcMain.handle('atualizar-cliente', atualizarCliente);
    ipcMain.handle('deletar-cliente', deletarCliente);
    ipcMain.handle('get-cliente-by-id', getClienteById)
}

function registrarUsuariosListeners() {
    ipcMain.handle('get-usuario', getUsuarios);
    ipcMain.handle('adicionar-usuario', adicionarUsuario);
    ipcMain.handle('atualizar-usuario', atualizarUsuario);
    ipcMain.handle('deletar-usuario', deletarUsuario)
    ipcMain.handle('get-usuario-by-id', getUsuarioById);
}

function registrarDistribuicoesListeners() {
    ipcMain.handle('get-distribuicao', getDistribuicoes);
    ipcMain.handle(`adicionar-distribuicao`, adicionarDistribuicao);
    ipcMain.handle('get-distribuicao-by-id', getDistribuicaoById);
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
    ipcMain.on('abrir-janela-user', createMainWindowUser);
    ipcMain.on('abrir-dados-medicamento', AbrirDadosMedicamento)
    ipcMain.on('abrir-dados-cliente', abrirDadosCliente)
    ipcMain.on('abrir-dados-usuario', abrirDadosUsuario);
    ipcMain.on('abrir-dados-distribuicao', abrirDadosDistribuicao);
}

function registrarValidacoes() {
    ipcMain.handle('valida-cliente', validaCliente);
    ipcMain.handle('valida-medicamento', validaMedicamento);
    ipcMain.handle('valida-telefone', validaTelefone);
    ipcMain.handle('valida-usuario', validaUsuario);
    ipcMain.handle('valida-email', validaEmail);
}

function registrarDialogs() {
    ipcMain.handle('mostrar-alerta', mostrarAlerta)
    ipcMain.handle('mostrar-confirm', mostrarConfirm)
}

function registrarNotificadores() {
    ipcMain.on('medicamento-atualizado', () => {
        notificarAtualizacao('medicamento', getJanelaMedicamento);
    });

    ipcMain.on('cliente-atualizado', () => {
        notificarAtualizacao('cliente', getJanelaCliente);
    });
    ipcMain.on('usuario-atualizado', () => {
        notificarAtualizacao('usuario', getJanelaUsuario);
    });
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
    registrarNotificadores();
}

module.exports = {
    registrarListeners
}