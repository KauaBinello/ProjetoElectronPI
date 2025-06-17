const tabelaMedicamento = document.getElementById('medicamentosTableDados');
const modalIdMedicamento = document.getElementById('medicamento-id');
const modalNomeMedicamento = document.getElementById('medicamento-nome');
const modalEmbalagemMedicamento = document.getElementById('medicamento-embalagem');
const modalSaldoMedicamento = document.getElementById('medicamento-saldo');
const modalValidadeMedicamento = document.getElementById('medicamento-validade');

const botaoSalvar = document.getElementById('btn-salvar');
const botaoDeletar = document.getElementById('btn-deletar');
const botaoLimpar = document.getElementById('btn-limpar');

botaoLimpar.addEventListener('click', limparCamposMedicamento);
botaoSalvar.addEventListener('click', salvarMedicamento);
botaoDeletar.addEventListener('click', deletarMedicamento);

function limparCamposMedicamento() {
    mostrarDetalhes('', '', '', '', '');
}

async function salvarMedicamento() {
    const id = modalIdMedicamento.value;
    const nome = modalNomeMedicamento.value;
    const embalagem = modalEmbalagemMedicamento.value;
    const saldo = modalSaldoMedicamento.value;
    const validade = modalValidadeMedicamento.value;
    if (!nome || !embalagem || !saldo || !validade) {
        alert('Por favor. preencha os campos obrigatórios.');
        return;
    }
    if (id === '') {
        await window.projetoAPI.adicionarMedicamento(nome, embalagem, saldo, validade);
    } else {
        await window.projetoAPI.atualizarMedicamento(nome, embalagem, saldo, validade, id);
    }
    carregarMedicamentos();
    limparCamposMedicamento();
}

async function deletarMedicamento() {
    const id = modalIdMedicamento.value;

    await window.projetoAPI.deletarMedicamento(id);

    carregarMedicamentos();
    limparCamposMedicamento();
}

function mostrarDetalhes(id, nome, embalagem, saldo, validade) {
    modalIdMedicamento.value = id;
    modalNomeMedicamento.value = nome;
    modalEmbalagemMedicamento.value = embalagem;
    modalSaldoMedicamento.value = saldo;
    modalValidadeMedicamento.value = validade
}

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

    const celulaId = document.createElement('td');
    celulaId.textContent = medicamento.id;
    linha.appendChild(celulaId);

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
    botao.addEventListener('click',
        function () { mostrarDetalhes(medicamento.id, medicamento.nome, medicamento.embalagem, medicamento.saldo, medicamento.validade) }
    )

    const icone = document.createElement('i');
    icone.setAttribute('data-lucide', 'edit-2');
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);

    tabelaMedicamento.appendChild(linha);

    lucide.createIcons();

} pesquisa()
carregarMedicamentos();