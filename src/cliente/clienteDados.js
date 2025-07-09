lucide.createIcons()

const modalIdcliente = document.getElementById('cliente-id')
const modalNomeCliente = document.getElementById('cliente-nome')
const modalCpfCliente = document.getElementById('cliente-cpf')
const modalTelefoneCliente = document.getElementById('cliente-telefone')
const modalNascimentoCliente = document.getElementById('cliente-nascimento')
const modalEnderecoCliente = document.getElementById('cliente-endereco')
const modalNumeroResidencialCliente = document.getElementById('cliente-numero-residencial')
const modalBairroCliente = document.getElementById('cliente-bairro')
const modalCidadeCliente = document.getElementById('cliente-cidade')
const modalEstadoCliente = document.getElementById('cliente-estado')

const botaoSalvar = document.getElementById('btn-salvar')
const botaoDeletar = document.getElementById('btn-deletar')
const botaoLimpar = document.getElementById('btn-limpar')

botaoLimpar.addEventListener('click', limparCamposCliente);
botaoSalvar.addEventListener('click', salvarCliente);
botaoDeletar.addEventListener('click', deletarCliente);

function limparCamposCliente() {
    modalIdcliente.value = ``
    modalNomeCliente.value = ``
    modalCpfCliente.value = ``
    modalTelefoneCliente.value = ``
    modalNascimentoCliente.value = ``
    modalEnderecoCliente.value = ``
    modalNumeroResidencialCliente.value = ``
    modalBairroCliente.value = ``
    modalCidadeCliente.value = ``
    modalEstadoCliente.value = ``
}

async function salvarCliente() {
    const id = modalIdcliente.value;
    const nome = modalNomeCliente.value;
    const cpf = modalCpfCliente.value;
    const telefone = modalTelefoneCliente.value;
    const nascimento = modalNascimentoCliente.value;
    const endereco = modalEnderecoCliente.value;
    const numero_residencial = modalNumeroResidencialCliente.value;
    const bairro = modalBairroCliente.value;
    const cidade = modalCidadeCliente.value;
    const uf = modalEstadoCliente.value;

    const cpfExiste = await window.projetoAPI.validaCliente(cpf)
    const telefoneExiste = await window.projetoAPI.validaTelefone(telefone)

    if (!nome || !cpf || !telefone || !nascimento || !endereco || !numero_residencial || !bairro || !cidade || !uf) {
        await window.dialogAPI.alertar('Por favor, preencha os campos obrigatórios.');
        limparCamposCliente();
        return;
    }
    if (cpfExiste) {
        await window.dialogAPI.alertar('Cliente com este CPF já cadastrado.')
        return;
    }
    if (telefoneExiste) {
        await window.dialogAPI.alertar('Cliente com este telefone já cadastrado.')
        return;
    }
    if (new Date(nascimento) >= new Date()) {
        await window.dialogAPI.alertar('Data de nascimento deve ser anterior a hoje.');
        return;
    }
    if (id === '') {
        await window.projetoAPI.adicionarCliente(nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf.toUpperCase());
        await window.dialogAPI.alertar('Cliente cadastrado com sucesso')
    } else {
        await window.projetoAPI.atualizarCliente(nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf, id.toUpperCase());
        await window.dialogAPI.alertar('Cliente atualizado com sucesso')
    }
    carregarClientes();
    limparCamposCliente();
}

async function deletarCliente() {
    const id = modalIdcliente.value;
    if (!id) {
        await window.dialogAPI.alertar('Por favor, selecione um cliente.');
        return;
    }
    if (await window.dialogAPI.confirmar('Tem certeza que deseja deletar o cliente?')) {
        await window.projetoAPI.deletarCliente(id);
        await window.dialogAPI.alertar('Cliente deletado com sucesso')
    }
    carregarClientes();
    limparCamposCliente();
}

async function mostrarDetalhes() {
    const id = localStorage.getItem(`clienteId`)

    if (id === '') {
        modalIdcliente.value = ``
        modalNomeCliente.value = ``
        modalCpfCliente.value = ``
        modalTelefoneCliente.value = ``
        modalNascimentoCliente.value = ``
        modalEnderecoCliente.value = ``
        modalNumeroResidencialCliente.value = ``
        modalBairroCliente.value = ``
        modalCidadeCliente.value = ``
        modalEstadoCliente.value = ``
    } else {
        const cliente = await window.projetoAPI.getClienteById(id)

        modalIdcliente.value = cliente.id
        modalNomeCliente.value = cliente.nome
        modalCpfCliente.value = cliente.cpf
        modalTelefoneCliente.value = cliente.telefone
        modalNascimentoCliente.value = cliente.nascimento
        modalEnderecoCliente.value = cliente.endereco
        modalNumeroResidencialCliente.value = cliente.numero_residencial
        modalBairroCliente.value = cliente.bairro
        modalCidadeCliente.value = cliente.cidade
        modalEstadoCliente.value = cliente.uf
    }
}

mostrarDetalhes()