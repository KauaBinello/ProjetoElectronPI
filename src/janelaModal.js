const { BrowserWindow } = require('electron')
const path = require('path');
const { getJanelaPrincipal } = require('./janelaPrincipal');

let janelaMedicamento = null;
let janelaCliente = null
let janelaUsuario = null
let janelaDistribuicao = null

function criarJanelaModal(arquivohtml, telaPai) {
    const novaJanela = new BrowserWindow({
        width: 1620,
        height: 980,
        center: true,
        modal: true,
        parent: telaPai,
        resizable: false,
        minimizable: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    novaJanela.setMenu(null);
    novaJanela.loadFile(arquivohtml);

    return novaJanela;
}

//medicamento
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

//cliente
function modalAbrirCliente(event) {
    let mainWindow = getJanelaPrincipal();
    if (mainWindow) {
        janelaCliente = criarJanelaModal('./src/cliente/cliente.html', mainWindow);
    } else {
        console.warn('Não foi possível abrir a modal: Janela principal não encontrada.');
    }
}

function abrirDadosCliente(event) {
    if (janelaCliente) {
        criarJanelaModal('./src/cliente/clienteDados.html', janelaCliente)
    } else {
        console.warn('Não foi possível abrir a modal de detalhes: janelaMedicamento não está definida.')
    }
}

function getJanelaCliente() {
    return janelaCliente
}

//usuario
function modalAbrirUsuario(event) {
    let mainWindow = getJanelaPrincipal();
    if (mainWindow) {
        janelaUsuario = criarJanelaModal('./src/usuario/usuario.html', mainWindow);
    } else {
        console.warn('Não foi possível abrir a modal: Janela principal não encontrada.');
    }
}

function abrirDadosUsuario(event) {
    if (janelaUsuario) {
        criarJanelaModal('./src/usuario/usuarioDados.html', janelaUsuario);
    } else {
        console.warn('Não foi possível abrir a modal de detalhes: janelaUsuario não está definida.');
    }
}

function getJanelaUsuario() {
    return janelaUsuario;
}

//distribuicao
function modalAbrirDistribuicao(event) {
    let mainWindow = getJanelaPrincipal();
    if (mainWindow) {
        janelaDistribuicao = criarJanelaModal('./src/distribuicao/distribuicao.html', mainWindow);
    } else {
        console.warn('Não foi possível abrir a modal: Janela principal não encontrada.');
    }
}

function abrirDadosDistribuicao(event) {
    if (janelaDistribuicao) {
        criarJanelaModal('./src/distribuicao/distribuicaoDados.html', janelaDistribuicao);
    } else {
        console.warn('Não foi possível abrir a modal de detalhes: janelaDistribuicao não está definida.');
    }
}

function getJanelaDistribuicao() {
    return janelaDistribuicao;
}

module.exports = {
    criarJanelaModal,

    modalAbrirMedicamento,
    modalAbrirCliente,
    modalAbrirUsuario,
    modalAbrirDistribuicao,

    AbrirDadosMedicamento,
    getJanelaMedicamento,

    abrirDadosCliente,
    getJanelaCliente,

    abrirDadosUsuario,
    getJanelaUsuario,

    abrirDadosDistribuicao,
    getJanelaDistribuicao
}