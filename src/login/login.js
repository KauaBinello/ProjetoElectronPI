const login = document.getElementById('login');
const senha = document.getElementById('senha');
const btnLogin = document.getElementById('acessar');
const msg = document.getElementById('msg');

btnLogin.addEventListener('click', validarLogin);

async function validarLogin() {
    const retorno = await window.projetoAPI.validarLogin(login.value, senha.value);

    if (retorno) {
        await window.projetoAPI.setUsuarioLogado({
            id: retorno.id,
            nome: retorno.nome,
            email: retorno.email,
            login: retorno.login
        });

        await window.janelaAPI.createMainWindow();
        await window.janelaAPI.fecharLogin();
    } else {
        msg.style.color = 'red';
        msg.textContent = 'Login inválido ou senha incorreta!';
    }
}

// Renderiza os ícones no carregamento da página
lucide.createIcons();
