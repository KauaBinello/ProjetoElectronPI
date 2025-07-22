const cadastrarCliente = document.getElementById('cadastrar-novo')
cadastrarCliente.addEventListener('click', cadastrarClienteNovo)

function cadastrarClienteNovo() {
    localStorage.setItem(`clienteId`, '')
    window.janelaAPI.abrirDadosCliente()
}

window.comunicacaoAPI.escutarAtualizacao('cliente', carregarClientes);

const tabelaCliente = document.getElementById('clientesTableDados')

let lista = []

async function carregarClientes() {
    lista = await window.projetoAPI.getClientes(); // salva a lista globalmente
    mostrarClientesNaTabela(lista); // exibe tudo na tela
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

        const filtrados = lista.filter(cliente =>
            cliente.nome.toLowerCase().includes(termo)
        );
        mostrarClientesNaTabela(filtrados);
    });
}

async function criarLinhaCliente(cliente) {

    const linha = document.createElement('tr');

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

    botao.addEventListener('click', () => {
        localStorage.setItem(`clienteId`, cliente.id);
        window.janelaAPI.abrirDadosCliente();
    });

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