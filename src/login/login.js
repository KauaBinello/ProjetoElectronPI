const login = document.getElementById('login');
const senha = document.getElementById('senha');
const btnLogin = document.getElementById('acessar');
const msg = document.getElementById('msg');

btnLogin.addEventListener('click', validarLogin);

async function validarLogin() {
    try {
        const retorno = await window.projetoAPI.validarLogin(login.value, senha.value);

        if (!retorno || !retorno.perfil) {
            throw new Error('Login inválido');
        }

        await window.projetoAPI.setUsuarioLogado({
            id: retorno.id,
            nome: retorno.nome,
            email: retorno.email,
            login: retorno.login
        });

        switch (retorno.perfil) {
            case 'adm':
                localStorage.setItem('perfil', retorno.perfil)
                localStorage.setItem('id', retorno.id)
                await window.janelaAPI.createMainWindow();
                break;
            case 'user':
                localStorage.setItem('perfil', retorno.perfil)
                localStorage.setItem('id', retorno.id)
                await window.janelaAPI.createMainWindowUser();
                break;
            default:
                throw new Error('Perfil não reconhecido');
        }

       await window.janelaAPI.fecharLogin();

    } catch {
        msg.style.color = 'red';
        msg.textContent = 'Login inválido ou senha incorreta!';
    }
}

// Renderiza os ícones no carregamento da página
lucide.createIcons();
