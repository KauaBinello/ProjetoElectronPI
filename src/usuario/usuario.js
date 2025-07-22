const tabelaUsuario = document.getElementById('usuariosTableDados');
const cadastrarUsuario = document.getElementById('cadastrar-novo')

window.comunicacaoAPI.escutarAtualizacao('usuario', carregarUsuarios);

cadastrarUsuario.addEventListener('click', () => {
    localStorage.setItem('usuarioId', '');
    window.janelaAPI.abrirDadosUsuario();
});

let lista = [];

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
    botao.addEventListener('click', () => {
        window.janelaAPI.abrirDadosUsuario();
        localStorage.setItem('usuarioId', usuario.id);
    });

    const icone = document.createElement('i');
    icone.setAttribute('data-lucide', 'edit-2');
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaUsuario.appendChild(linha);
}
pesquisa();
carregarUsuarios();
