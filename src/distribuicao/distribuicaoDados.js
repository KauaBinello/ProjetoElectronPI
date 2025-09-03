const modalSerial = document.getElementById('distribuicao-id');
const modalCpfCliente = document.getElementById('distribuicao-cliente');
const modalNomeMedicamento = document.getElementById('distribuicao-medicamento');
const modalQuantidade = document.getElementById('distribuicao-quantidade');
const cadastrarCliente = document.getElementById('cadastrar-novo')

const botaoSalvar = document.getElementById('btn-salvar');
const botaoDeletar = document.getElementById('btn-deletar');
const botaoLimpar = document.getElementById('btn-limpar');

botaoSalvar.addEventListener(`click`, adicionarDistribuicao)
botaoLimpar.addEventListener(`click`, limparCampos)
botaoDeletar.addEventListener(`click`, deletarDistribuicao)

const idLocalUser = localStorage.getItem('id')

function limparCampos() {
    modalSerial.value = ``
    modalNomeMedicamento.value = ``
    modalQuantidade.value = ``
    modalCpfCliente.value = ``
}

async function adicionarDistribuicao() {
    const cpfCliente = modalCpfCliente.value
    const nomeMedicamento = modalNomeMedicamento.value
    const quantidade = parseInt(modalQuantidade.value)

    if (!cpfCliente || !nomeMedicamento || !quantidade) {
        await window.dialogAPI.alertar('Por favor, preencha todos os campos.');
        return;
    }

    const cliente = await window.projetoAPI.validaCliente(cpfCliente)
    if (!cliente) {
        await window.dialogAPI.alertar('Cliente não encontrado. Verifique o CPF e tente novamente.');
        return;
    }
    const clienteId = cliente.id

    const medicamento = await window.projetoAPI.validaMedicamento(nomeMedicamento)

    if (!medicamento) {
        await window.dialogAPI.alertar('Medicamento não encontrado. Verifique o nome e tente novamente.');
        return;
    }

    const saldo = parseInt(medicamento.saldo)

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
    const serial = modalSerial.value


    if (!serial) {
        await window.projetoAPI.adicionarDistribuicao(medicamentoId, quantidade, saida, usuarioId, clienteId)
        await window.dialogAPI.alertar('Distribuição cadastrada com sucesso.');
        limparCampos()
    } else {
        await window.projetoAPI.atualizarDistribuicao(clienteId, medicamentoId, quantidade, serial)
        await window.dialogAPI.alertar('Distribuição atualizada com sucesso.');
        limparCampos()
    }
}

async function deletarDistribuicao() {
    const serial = modalSerial.value;

    if (!serial) {
        await window.dialogAPI.alertar('Por favor, selecione uma distribuição.');
        return;
    } if (await window.dialogAPI.confirmar('Tem certeza que deseja deletar esta distribuição?')) {
        await window.projetoAPI.deletarDistribuicao(serial);
        await window.dialogAPI.alertar('Distribuição deletada com sucesso.');
        limparCampos();
    }
}

async function mostrarDetalhes() {

    lucide.createIcons()
    const serial = localStorage.getItem('serial')

    if (serial === '') {
        modalSerial.value = ''
        modalCpfCliente.value = ''
        modalNomeMedicamento.value = ''
        modalQuantidade.value = ''
    } else {
        const dados = await window.projetoAPI.getDistribuicaoById(serial);

        modalSerial.value = dados.serial;
        modalCpfCliente.value = dados.cliente_cpf;
        modalNomeMedicamento.value = dados.medicamento_nome;
        modalQuantidade.value = dados.quantidade;
    }
}

mostrarDetalhes()