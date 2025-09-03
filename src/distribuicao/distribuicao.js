const tabelaDistribuicao = document.getElementById('distribuicoesTableDados');
const novaDistribuicao = document.getElementById('cadastrar-novo')

novaDistribuicao.addEventListener('click', cadastrarDistribuicao)

function cadastrarDistribuicao() {
    localStorage.setItem('serial', '')
    window.janelaAPI.abrirDadosDistribuicao()
}

window.comunicacaoAPI.escutarAtualizacao('distribuicao', carregarDistribuicoes);

let lista = [];

async function carregarDistribuicoes() {
    lista = await window.projetoAPI.getDistribuicoes();
    mostrarDistribuicoesNaTabela(lista); // exibe tudo na tela
}

function mostrarDistribuicoesNaTabela(lista) {
    tabelaDistribuicao.innerHTML = ''; // Limpa a tabela antes de adicionar novas linhas
    if (lista.length === 0) {
        tabelaDistribuicao.innerHTML = '<tr><td colspan="4">Nenhuma distribuição encontrada.</td></tr>';
        return;
    }

    lista.forEach(criarLinhaDistribuicao);
    lucide.createIcons();
}

async function pesquisa() {
    const campoPesquisa = document.getElementById('campo-pesquisa')

    campoPesquisa.addEventListener('input', () => {
        const termo = campoPesquisa.value.toLowerCase();

        const filtrados = lista.filter(dados =>
            dados.cliente_cpf.toLowerCase().includes(termo)
        )
        mostrarDistribuicoesNaTabela(filtrados)
    })
}

async function criarLinhaDistribuicao(dados) {
    const linha = document.createElement('tr')

    const celulaCliente = document.createElement('td')
    celulaCliente.textContent = dados.cliente_nome
    linha.appendChild(celulaCliente)

    const celulaCpf = document.createElement('td')
    celulaCpf.textContent = dados.cliente_cpf
    linha.appendChild(celulaCpf)

    const celulaMedicamento = document.createElement('td')
    celulaMedicamento.textContent = dados.medicamento_nome
    linha.appendChild(celulaMedicamento)

    const celulaQuantidade = document.createElement('td')
    celulaQuantidade.textContent = dados.quantidade
    linha.appendChild(celulaQuantidade)

    const celulaUsuario = document.createElement('td')
    celulaUsuario.textContent = dados.usuario_nome
    linha.appendChild(celulaUsuario)

    const celulaSaida = document.createElement('td')
    celulaSaida.textContent = dados.saida
    linha.appendChild(celulaSaida)

    const celulaBotao = document.createElement('td');
    const botao = document.createElement('button');

    botao.addEventListener('click', () => {
        localStorage.setItem('serial', dados.serial)
        window.janelaAPI.abrirDadosDistribuicao()
    });

    const icone = document.createElement('i');
    icone.setAttribute('data-lucide', 'edit-2');
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);


    tabelaDistribuicao.appendChild(linha);

    lucide.createIcons();
}
pesquisa()
carregarDistribuicoes()
