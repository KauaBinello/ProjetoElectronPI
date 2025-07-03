const { BrowserWindow } = require('electron');
const { get } = require('http');
const path = require('path');

let janelaPrincipal;
let janelaLogin;

//WindowAdmin
function createMainWindow() {
    janelaPrincipal = new BrowserWindow({
        width: 1100,
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

//WindowsUser
function createMainWindowUser() {
    janelaPrincipal = new BrowserWindow({
        width: 1000,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janelaPrincipal.loadFile('./src/indexUser.html');
    janelaPrincipal.on('closed', () => {
        janelaPrincipal = null
    })

    return janelaPrincipal;
}

function getJanelaPrincipalUser() {
    return janelaPrincipal
}

//login
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

function closeLoginWindow() {
    if (janelaLogin) {
        janelaLogin.close();
        janelaLogin = null;
    }
}

function getJanelaLogin() {
    return janelaLogin;
}

module.exports = {
    createLoginWindow,
    createMainWindow,
    getJanelaPrincipal,
    getJanelaLogin,
    closeLoginWindow,
    getJanelaLogin,
    createMainWindowUser,
    getJanelaPrincipalUser
}