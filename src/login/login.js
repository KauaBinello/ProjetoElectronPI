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

        switch (retorno.perfil) {
            case 'Administrador':
                localStorage.setItem('perfil', retorno.perfil)
                localStorage.setItem('id', retorno.id)
                localStorage.setItem('nome', retorno.nome);
                await window.janelaAPI.createMainWindow();
                break;
            case 'Usuário':
                localStorage.setItem('perfil', retorno.perfil)
                localStorage.setItem('id', retorno.id)
                localStorage.setItem('nome', retorno.nome);
                await window.janelaAPI.createMainWindowUser();
                break;
            default:
                throw new Error('Perfil não reconhecido');
        }

        await window.janelaAPI.fecharLogin();

    } catch {
        await window.dialogAPI.alertar('Login inválido ou senha incorreta!')
    }
}

// Renderiza os ícones no carregamento da página
lucide.createIcons();
