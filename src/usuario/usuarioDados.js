lucide.createIcons()

const modalIdUsuario = document.getElementById('usuario-id');
const modalNomeUsuario = document.getElementById('usuario-nome');
const modalEmailUsuario = document.getElementById('usuario-email');
const modalLoginUsuario = document.getElementById('usuario-login');
const modalSenhaUsuario = document.getElementById('usuario-senha');
const modalPerfilUsuario = document.getElementById('usuario-perfil')

const botaoSalvar = document.getElementById('btn-salvar');
const botaoDeletar = document.getElementById('btn-deletar');
const botaoLimpar = document.getElementById('btn-limpar');

botaoLimpar.addEventListener('click', limparCamposUsuario);
botaoSalvar.addEventListener('click', salvarUsuario);
botaoDeletar.addEventListener('click', deletarUsuario);

function limparCamposUsuario() {

    modalNomeUsuario.value = '';
    modalEmailUsuario.value = '';
    modalLoginUsuario.value = '';
    modalSenhaUsuario.value = '';
    modalPerfilUsuario.value = '';
}

async function salvarUsuario() {
    const id = modalIdUsuario.value;
    const nome = modalNomeUsuario.value;
    const email = modalEmailUsuario.value;
    const login = modalLoginUsuario.value;
    const senha = modalSenhaUsuario.value;
    const perfil = modalPerfilUsuario.value
    if (!nome || !email || !login || !senha || !perfil) {
        await window.dialogAPI.alertar('Por favor! preencha todos os campos')
        return;
    }
    const emailExiste = await window.projetoAPI.validaEmail(email);
    const loginExiste = await window.projetoAPI.validaUsuario(login);


    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        await window.dialogAPI.alertar('Email inválido. Por favor, insira um email válido.');
        return;
    }
    if (id === '') {
        if (emailExiste) {
            await window.dialogAPI.alertar('Já existe um usuário cadastrado com este email.');
            return;
        }
        if (loginExiste) {
            await window.dialogAPI.alertar('Já existe um usuário cadastrado com este login.');
            return;
        }
        await window.projetoAPI.adicionarUsuario(nome, email, login, senha, perfil);
        await window.dialogAPI.alertar('Usuário cadastrado com sucesso');
    } else {
        await window.projetoAPI.atualizarUsuario(nome, email, login, senha, perfil, id);
        await window.dialogAPI.alertar('Usuário atualizado com sucesso');
    }
    window.comunicacaoAPI.notificarAtualizacao('usuario');
    limparCamposUsuario();
}

async function deletarUsuario() {
    const id = modalIdUsuario.value;
    if (!id) {
        await window.dialogAPI.alertar('Por favor, selecione um usuário para excluir.');
        return;
    }
    if (await window.dialogAPI.confirmar('Tem certeza que deseja deletar o usuário?')) {
        await window.projetoAPI.deletarUsuario(id);
        await window.dialogAPI.alertar('Usuário deletado com sucesso');
    }
    window.comunicacaoAPI.notificarAtualizacao('usuario');
    limparCamposUsuario();
}

async function mostrarDetalhes() {
    let id = localStorage.getItem('usuarioId');
    console.log(id);
    if (!id) {
        modalIdUsuario.value = '';
        modalNomeUsuario.value = '';
        modalEmailUsuario.value = '';
        modalLoginUsuario.value = '';
        modalSenhaUsuario.value = '';
        modalPerfilUsuario.value = '';
    } else {
        const usuario = await window.projetoAPI.getUsuarioById(id);
        modalIdUsuario.value = usuario.id;
        modalNomeUsuario.value = usuario.nome
        modalEmailUsuario.value = usuario.email;
        modalLoginUsuario.value = usuario.login;
        modalSenhaUsuario.value = usuario.senha;
        modalPerfilUsuario.value = usuario.perfil;
    }
}

mostrarDetalhes();
