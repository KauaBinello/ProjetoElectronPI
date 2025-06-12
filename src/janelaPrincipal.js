const { BrowserWindow } = require('electron');
const { get } = require('http');
const path = require('path');

let janelaPrincipal;

function createMainWindow() {
    janelaPrincipal = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janelaPrincipal.loadFile('./src/index.html');
    janelaPrincipal.on('closed', () => {
        janelaPrincipal = null
    })

    return janelaPrincipal;
}

function getJanelaPrincipal() {
    return janelaPrincipal
}

module.exports = {
    createMainWindow,
    getJanelaPrincipal
}