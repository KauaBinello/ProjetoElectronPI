const tabelaUsuario = document.getElementById('usuariosTableDados');
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

let lista = [];

function limparCamposUsuario() {
    mostrarDetalhes('', '', '', '', '', '')
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
    carregarUsuarios();
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
    carregarUsuarios();
    limparCamposUsuario();
}

function mostrarDetalhes(id, nome, email, login, senha, perfil) {
    modalIdUsuario.value = id;
    modalNomeUsuario.value = nome
    modalEmailUsuario.value = email;
    modalLoginUsuario.value = login;
    modalSenhaUsuario.value = senha;
    modalPerfilUsuario.value = perfil;
}

async function carregarUsuarios() {
    lista = await window.projetoAPI.getUsuarios();
    mostrarUsuariosNaTabela(lista);
}

function mostrarUsuariosNaTabela(lista) {
    tabelaUsuario.innerHTML = '';

    if (lista.length === 0) {
        tabelaUsuario.innerHTML = '<tr><td colspan="5">Nenhum usuário encontrado.</td></tr>';
        return;
    }

    lista.forEach(criarLinhaUsuario);
    lucide.createIcons();
}

function pesquisa() {
    const campoPesquisa = document.getElementById('campo-pesquisa');

    campoPesquisa.addEventListener('input', () => {
        const termo = campoPesquisa.value.toLowerCase();
        const filtrados = lista.filter(usuario =>
            usuario.nome.toLowerCase().includes(termo)
        );
        mostrarUsuariosNaTabela(filtrados);
    });
}

async function criarLinhaUsuario(usuario) {
    const linha = document.createElement('tr');

    const celulaNome = document.createElement('td');
    celulaNome.textContent = usuario.nome;
    linha.appendChild(celulaNome);

    const celulaEmail = document.createElement('td');
    celulaEmail.textContent = usuario.email;
    linha.appendChild(celulaEmail);

    const celulaLogin = document.createElement('td');
    celulaLogin.textContent = usuario.login;
    linha.appendChild(celulaLogin);

    const celulaPerfil = document.createElement('td');
    celulaPerfil.textContent = usuario.perfil;
    linha.appendChild(celulaPerfil);

    const celulaBotao = document.createElement('td')

    const botao = document.createElement('button')
    botao.addEventListener('click',
        function () {
            mostrarDetalhes(usuario.id, usuario.nome, usuario.email, usuario.login, usuario.senha, usuario.perfil)
        }
    )

    const icone = document.createElement('i');
    icone.setAttribute('data-lucide', 'edit-2');
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaUsuario.appendChild(linha);
}
pesquisa();
carregarUsuarios();
