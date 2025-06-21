const tabelaDistribuicao = document.getElementById('distribuicoesTableDados');
const modalNomeCliente = document.getElementById('distribuicao-cliente');
const modalNomeMedicamento = document.getElementById('distribuicao-medicamento');
const modalQuantidade = document.getElementById('distribuicao-quantidade');

const botaoSalvar = document.getElementById('btn-salvar');
const botaoDeletar = document.getElementById('btn-deletar');
const botaoLimpar = document.getElementById('btn-limpar');

botaoSalvar = document.addEventListener(`click`, adicionarDistrivuicao)
botaoLimpar = document.addEventListener(`click`, adicionarDistrivuicao)

function limparCampos() {
    modalNomeMedicamento = ``
    modalQuantidade = ``
    modalNomeCliente = ``
}



async function adicionarDistrivuicao() {
    const medicamentoId = 1
    const quantidade = modalQuantidade.value
    const saida = new Date()
    const clienteId = 1
    const usuarioId = 1

    await window.projetoAPI.adicionarDistrivuicao(medicamentoId, quantidade, saida, clienteId, usuarioId)
    carregarDistribuicoes()

}

let lista = [];

async function carregarDistribuicoes() {
    lista = await window.projetoAPI.getDistribuicoes();
    console.log(lista); // salva a lista globalmente
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

    const celulaId = document.createElement('td')
    celulaId.textContent = dados.serial
    linha.appendChild(celulaId)

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

    tabelaDistribuicao.appendChild(linha);

    lucide.createIcons();
}
pesquisa()
carregarDistribuicoes()