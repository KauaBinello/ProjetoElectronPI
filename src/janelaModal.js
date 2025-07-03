const { BrowserWindow } = require('electron')
const path = require('path');
const { getJanelaPrincipal } = require('./janelaPrincipal');

let janelaMedicamento = null;

function criarJanelaModal(arquivohtml, telaPai) {
    const novaJanela = new BrowserWindow({
        width: 1050,
        height: 950,
        modal: true,
        parent: telaPai,
        resizable: false,
        minimizable: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    novaJanela.loadFile(arquivohtml);

    return novaJanela;
}

function modalAbrirMedicamento(event) {
    let mainWindow = getJanelaPrincipal();
    if (mainWindow) {
        janelaMedicamento = criarJanelaModal('./src/medicamento/medicamento.html', mainWindow);
    } else {
        console.warn('Não foi possível abrir a modal: Janela principal não encontrada.');
    }
}

function AbrirDadosMedicamento(event) {
    if (janelaMedicamento) {
        criarJanelaModal('./src/medicamento/medicamentoDados.html', janelaMedicamento);
    } else {
        console.warn('Não foi possível abrir a modal de detalhes: janelaMedicamento não está definida.');
    }
}

function getJanelaMedicamento() {
    return janelaMedicamento;
}

function modalAbrirCliente(event) {
    let mainWindow = getJanelaPrincipal();
    if (mainWindow) {
        criarJanelaModal('./src/cliente/cliente.html', mainWindow);
    } else {
        console.warn('Não foi possível abrir a modal: Janela principal não encontrada.');
    }
}

function modalAbrirUsuario(event) {
    let mainWindow = getJanelaPrincipal();
    if (mainWindow) {
        criarJanelaModal('./src/usuario/usuario.html', mainWindow);
    } else {
        console.warn('Não foi possível abrir a modal: Janela principal não encontrada.');
    }
}

function modalAbrirDistribuicao(event) {
    let mainWindow = getJanelaPrincipal();
    if (mainWindow) {
        criarJanelaModal('./src/distribuicao/distribuicao.html', mainWindow);
    } else {
        console.warn('Não foi possível abrir a modal: Janela principal não encontrada.');
    }
}

module.exports = {
    criarJanelaModal,
    modalAbrirMedicamento,
    modalAbrirCliente,
    modalAbrirUsuario,
    modalAbrirDistribuicao,
    AbrirDadosMedicamento,
    getJanelaMedicamento
}