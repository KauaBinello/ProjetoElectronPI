const modalCpfCliente = document.getElementById('distribuicao-cliente');
const modalNomeMedicamento = document.getElementById('distribuicao-medicamento');
const modalQuantidade = document.getElementById('distribuicao-quantidade');
const cadastrarCliente = document.getElementById('cadastrar-novo')

const botaoSalvar = document.getElementById('btn-salvar');
const botaoDeletar = document.getElementById('btn-deletar');
const botaoLimpar = document.getElementById('btn-limpar');

botaoSalvar.addEventListener(`click`, adicionarDistribuicao)
botaoLimpar.addEventListener(`click`, limparCampos)

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

async function mostrarDetalhes() {
    const serial = localStorage.getItem('serial')

    if (serial === '') {
        modalCpfCliente.value = ''
        modalNomeMedicamento.value = ''
        modalQuantidade.value = ''
    } else {
        const dados = await window.projetoAPI.getDistribuicaoById(serial);

        modalCpfCliente.value = dados.cliente_cpf;
        modalNomeMedicamento.value = dados.medicamento_nome;
        modalQuantidade.value = dados.quantidade;
    }
}

mostrarDetalhes()