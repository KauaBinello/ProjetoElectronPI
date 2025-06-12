const { ipcMain } = require('electron');

const { modalAbrirMedicamento, modalAbrirCliente } = require('./janelaModal');
const { getMedicamentos, adicionarMedicamento, atualizarMedicamento, deletarMedicamento } = require('./medicamento/medicamentoDB');
const { getClientes, adicionarCliente, atualizarCliente, deletarCliente } = require('./cliente/clienteDB')

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

function registrarJanelas() {
    ipcMain.on('abrir-medicamento', modalAbrirMedicamento);
    ipcMain.on('abrir-cliente', modalAbrirCliente)
}

function registrarListeners() {
    registrarMedicamentosListeners();
    registrarClientesListeners();
    registrarJanelas();
}

module.exports = {
    registrarListeners
}