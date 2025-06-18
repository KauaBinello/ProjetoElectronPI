const { BrowserWindow } = require('electron');
const path = require('path');

let janelaPrincipal;
let janelaLogin;

function createMainWindow() {
    janelaPrincipal = new BrowserWindow({
        width: 1000,
        height: 900,
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

function createLoginWindow() {
    janelaLogin = new BrowserWindow({
        width: 550,
        height: 550,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    janelaLogin.loadFile('./src/login/login.html');

}

function getJanelaLogin() {
    return janelaLogin;
}

module.exports = {
    createLoginWindow,
    createMainWindow,
    getJanelaPrincipal,
    getJanelaLogin
}