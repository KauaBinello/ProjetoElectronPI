const { BrowserWindow } = require('electron')
const path = require('path');
const { getJanelaPrincipal } = require('./janelaPrincipal');

function criarJanelaModal(arquivohtml, telaPai) {
    const janela = new BrowserWindow({
        width: 800,
        height: 600,
        modal: true,
        parent: telaPai,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janela.loadFile(arquivohtml); // Carrega o HTML correto

    return janela;
}

function modalAbrirMedicamento(event) {
    let mainWindow = getJanelaPrincipal();
    if (mainWindow) {
        criarJanelaModal('./src/medicamento/medicamento.html', mainWindow);
    } else {
        console.warn('Não foi possível abrir a modal: Janela principal não encontrada.');
    }
}

function modalAbrirCliente(event) {
    let mainWindow = getJanelaPrincipal()
    if (mainWindow) {
        criarJanelaModal('./src/cliente/cliente.html', mainWindow)
    } else {
        console.warn('Não foi possivel abrir a modal: Janela principal não encontrada.')
    }
}

/*function modalAbrirCurso(event) {
    let mainWindow = getJanelaPrincipal()
    if (mainWindow) {
        criarJanelaModal('./src/curso/curso.html', mainWindow)
    } else {
        console.warn('Não foi possivel abrir a modal: Janela principal não encontrada.')
    }
}

function modalAbrirMateria(event) {
    let mainWindow = getJanelaPrincipal()
    if (mainWindow) {
        criarJanelaModal('./src/materia/materia.html', mainWindow)
    } else {
        console.warn('Não foi possivel abrir a modal: Janela principal não encontrada.')
    }
}

function modalAbrirNotas(event) {
    let mainWindow = getJanelaPrincipal()
    if (mainWindow) {
        criarJanelaModal('./src/notas/notas.html', mainWindow)
    } else {
        console.warn('Não foi possivel abrir a modal: Janela principal não encontrada.')
    }
}*/

module.exports = {
    criarJanelaModal,
    modalAbrirMedicamento,
    modalAbrirCliente,
    /*modalAbrirCurso,
    modalAbrirMateria,
    modalAbrirNotas*/
}