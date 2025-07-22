const cadastrarMedicamento = document.getElementById('cadastrar-novo')
cadastrarMedicamento.addEventListener('click', cadastrarMedicamentoNovo)

function cadastrarMedicamentoNovo() {
    localStorage.setItem('medicamentoId', '' )
    window.janelaAPI.abrirDadosMedicamento()
}

window.comunicacaoAPI.escutarAtualizacao('medicamento', carregarMedicamentos);

const tabelaMedicamento = document.getElementById('medicamentosTableDados');

let lista = [];

async function carregarMedicamentos() {
    lista = await window.projetoAPI.getMedicamentos(); // salva a lista globalmente
    mostrarMedicamentosNaTabela(lista); // exibe tudo na tela
}

function mostrarMedicamentosNaTabela(lista) {
    tabelaMedicamento.innerHTML = ''; // limpa

    if (lista.length === 0) {
        tabelaMedicamento.innerHTML = '<tr><td colspan="6">Nenhum medicamento encontrado.</td></tr>';
        return;
    }

    lista.forEach(criarLinhaMedicamento); // já usa a tua função pronta
    lucide.createIcons(); // se estiver usando ícones
}

function pesquisa() {
    const campoPesquisa = document.getElementById('campo-pesquisa');

    campoPesquisa.addEventListener('input', () => {
        const termo = campoPesquisa.value.toLowerCase();

        const filtrados = lista.filter(med =>
            med.nome.toLowerCase().includes(termo)
        );

        mostrarMedicamentosNaTabela(filtrados);
    });
}

async function criarLinhaMedicamento(medicamento) {
    const linha = document.createElement('tr');

    const celulaNome = document.createElement('td');
    celulaNome.textContent = medicamento.nome;
    linha.appendChild(celulaNome);

    const celulaEmbalagem = document.createElement('td');
    celulaEmbalagem.textContent = medicamento.embalagem;
    linha.appendChild(celulaEmbalagem);

    const celulaSaldo = document.createElement('td');
    celulaSaldo.textContent = medicamento.saldo;
    linha.appendChild(celulaSaldo);

    const celulaValidade = document.createElement('td');
    celulaValidade.textContent = medicamento.validade_formatada; // Usando o formato DD/MM/YYYY
    linha.appendChild(celulaValidade);

    const celulaBotao = document.createElement('td');

    const botao = document.createElement('button');

    botao.addEventListener('click', () => {
        localStorage.setItem('medicamentoId', medicamento.id);
        window.janelaAPI.abrirDadosMedicamento();
    });

    const icone = document.createElement('i');
    icone.setAttribute('data-lucide', 'edit-2');
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaMedicamento.appendChild(linha);

    lucide.createIcons();

}
carregarMedicamentos();
pesquisa()