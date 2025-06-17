const { ipcMain } = require('electron');

const { modalAbrirMedicamento, modalAbrirCliente, modalAbrirUsuario } = require('./janelaModal');
const { getMedicamentos, adicionarMedicamento, atualizarMedicamento, deletarMedicamento } = require('./medicamento/medicamentoDB');
const { getClientes, adicionarCliente, atualizarCliente, deletarCliente } = require('./cliente/clienteDB')
const { getUsuarios, adicionarUsuario, atualizarUsuario, deletarUsuario} = require('./usuario/usuarioDB')

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

function registrarUsuariosListeners(){
    ipcMain.handle('get-usuario', getUsuarios);
    ipcMain.handle('adicionar-usuario', adicionarUsuario);
    ipcMain.handle('atualizar-usuario', atualizarUsuario);
    ipcMain.handle('deletar-usuario', deletarUsuario)
}

function registrarJanelas() {
    ipcMain.on('abrir-medicamento', modalAbrirMedicamento);
    ipcMain.on('abrir-cliente', modalAbrirCliente);
    ipcMain.on('abrir-usuario', modalAbrirUsuario)
}

function registrarListeners() {
    registrarMedicamentosListeners();
    registrarClientesListeners();
    registrarUsuariosListeners();
    registrarJanelas();
}

module.exports = {
    registrarListeners
}