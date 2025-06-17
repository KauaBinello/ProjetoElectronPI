const tabelaCliente = document.getElementById('clientesTableDados')
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

let listaCompletaDeClientes = []

function limparCamposCliente() {
    mostrarDetalhes('', '', '', '', '', '', '', '', '', '');
}

async function salvarCliente() {
    const id = modalIdcliente.value;
    const nome = modalNomeCliente.value;
    const cpf = modalCpfCliente.value;
    const telefone = modalTelefoneCliente.value;
    const nascimento = modalNascimentoCliente.value;
    const endereco = modalEnderecoCliente.value;
    const numero_residencial = modalNumeroResidencialCliente.value;
    const bairro = modalBairroCliente.value
    const cidade = modalCidadeCliente.value;
    const uf = modalEstadoCliente.value;

    if (!nome || !cpf || !telefone || !nascimento || !endereco || !numero_residencial || !bairro || !cidade || !uf) {
        alert('Por favor, preencha os campos obrigatórios.');
        return;
    }
    if (id === '') {
        await window.projetoAPI.adicionarCliente(nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf.toUpperCase());
    } else {
        await window.projetoAPI.atualizarCliente(nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf, id.toUpperCase());
    }
    carregarClientes();
    limparCamposCliente();
}

async function deletarCliente() {
    const id = modalIdcliente.value;
    if (!id) {
        alert('Por favor, selecione um cliente para deletar.');
        return;
    }
    await window.projetoAPI.deletarCliente(id);
}

function mostrarDetalhes(id, nome, cpf, telefone, nascimento, endereco, numero_residencial, bairro, cidade, uf) {
    modalIdcliente.value = id
    modalNomeCliente.value = nome
    modalCpfCliente.value = cpf
    modalTelefoneCliente.value = telefone
    modalNascimentoCliente.value = nascimento
    modalEnderecoCliente.value = endereco
    modalNumeroResidencialCliente.value = numero_residencial
    modalBairroCliente.value = bairro
    modalCidadeCliente.value = cidade
    modalEstadoCliente.value = uf
}

async function carregarClientes() {
    listaCompletaDeClientes = await window.projetoAPI.getClientes(); // salva a lista globalmente
    mostrarClientesNaTabela(listaCompletaDeClientes); // exibe tudo na tela
}

async function mostrarClientesNaTabela(lista) {
    tabelaCliente.innerHTML = ''; // limpa

    if (lista.length === 0) {
        tabelaCliente.innerHTML = '<tr><td colspan="6">Nenhum cliente encontrado.</td></tr>';
        return;
    }

    lista.forEach(criarLinhaCliente); // já usa a tua função pronta
    lucide.createIcons(); // se estiver usando ícones
}

function pesquisa() {
    const campoPesquisa = document.getElementById('campo-pesquisa');

    campoPesquisa.addEventListener('input', () => {
        const termo = campoPesquisa.value.toLowerCase();

        const filtrados = listaCompletaDeClientes.filter(cliente =>
            cliente.nome.toLowerCase().includes(termo)
        );
        mostrarClientesNaTabela(filtrados);
    });
}

async function criarLinhaCliente(cliente) {

    const linha = document.createElement('tr');

    const celulaId = document.createElement('td');
    celulaId.textContent = cliente.id;
    linha.appendChild(celulaId);

    const celulaNome = document.createElement('td');
    celulaNome.textContent = cliente.nome;
    linha.appendChild(celulaNome);

    const celulaCpf = document.createElement('td');
    celulaCpf.textContent = cliente.cpf;
    linha.appendChild(celulaCpf);

    const celulaTelefone = document.createElement('td');
    celulaTelefone.textContent = cliente.telefone;
    linha.appendChild(celulaTelefone);

    const celulaNascimento = document.createElement('td');
    celulaNascimento.textContent = cliente.nascimento_formatada; // Usando o formato DD/MM/YYYY
    linha.appendChild(celulaNascimento);

    const celulaEndereco = document.createElement('td');
    celulaEndereco.textContent = cliente.endereco;
    linha.appendChild(celulaEndereco);

    const celulaNumero = document.createElement('td');
    celulaNumero.textContent = cliente.numero_residencial;
    linha.appendChild(celulaNumero);

    const celulaBairro = document.createElement('td');
    celulaBairro.textContent = cliente.bairro;
    linha.appendChild(celulaBairro);

    const celulaCidade = document.createElement('td');
    celulaCidade.textContent = cliente.cidade;
    linha.appendChild(celulaCidade);

    const celulaEstado = document.createElement('td');
    celulaEstado.textContent = cliente.uf;
    linha.appendChild(celulaEstado);

    const celulaBotao = document.createElement('td');

    const botao = document.createElement('button');
    botao.addEventListener('click',
        function () { mostrarDetalhes(cliente.id, cliente.nome, cliente.cpf, cliente.telefone, cliente.nascimento, cliente.endereco, cliente.numero_residencial, cliente.bairro, cliente.cidade, cliente.uf) }
    )

    const icone = document.createElement('i');
    icone.setAttribute('data-lucide', 'edit-2');
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaCliente.appendChild(linha);

    lucide.createIcons();

}
pesquisa()
carregarClientes();