const tabelaDistribuicao = document.getElementById('distribuicoesTableDados');
const modalCpfCliente = document.getElementById('distribuicao-cliente');
const modalNomeMedicamento = document.getElementById('distribuicao-medicamento');
const modalQuantidade = document.getElementById('distribuicao-quantidade');

const botaoSalvar = document.getElementById('btn-salvar');
const botaoDeletar = document.getElementById('btn-deletar');
const botaoLimpar = document.getElementById('btn-limpar');

botaoSalvar.addEventListener(`click`, adicionarDistribuicao)
botaoLimpar.addEventListener(`click`, limparCampos)

const idLocalUser = localStorage.getItem('id')
const perfilLocalUser = localStorage.getItem('perfil')

function limparCampos() {
    modalNomeMedicamento.value = ``
    modalQuantidade.value = ``
    modalCpfCliente.value = ``
}

async function adicionarDistribuicao() {
    const cpfCliente = modalCpfCliente.value
    const cliente = await window.projetoAPI.validaCliente(cpfCliente)
    if (!cliente) {
        await window.dialogAPI.alertar('Cliente não encontrado. Verifique o CPF e tente novamente.');
        return;
    }
    const clienteId = cliente.id

    const nomeMedicamento = modalNomeMedicamento.value
    const medicamento = await window.projetoAPI.validaMedicamento(nomeMedicamento)

    if (!medicamento) {
        await window.dialogAPI.alertar('Medicamento não encontrado. Verifique o nome e tente novamente.');
        return;
    }

    const quantidade = parseInt(modalQuantidade.value)
    const saldo = parseInt(medicamento.saldo)

    console.log(saldo, quantidade)

    if (isNaN(quantidade) || quantidade <= 0) {
        await window.dialogAPI.alertar('Quantidade deve ser maior que zero.');
        return;
    }
    if (saldo <= 0) {
        await window.dialogAPI.alertar('Medicamento sem estoque disponível.');
        return;
    }
    if (quantidade > saldo) {
        await window.dialogAPI.alertar(`Quantidade solicitada (${quantidade}) é maior que o estoque disponível (${saldo}).`);
        return;
    }

    const medicamentoId = medicamento.id
    const saida = new Date()

    const usuarioId = idLocalUser

    await window.projetoAPI.adicionarDistribuicao(medicamentoId, quantidade, saida, usuarioId, clienteId)
    carregarDistribuicoes()
    limparCampos()
}

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

    tabelaDistribuicao.appendChild(linha);

    lucide.createIcons();
}
pesquisa()
carregarDistribuicoes()
