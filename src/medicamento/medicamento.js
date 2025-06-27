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

    const medicamentoExiste = await window.projetoAPI.validaMedicamento(nome);

    if (!nome || !embalagem || !saldo || !validade) {
        await window.dialogAPI.alertar('Por favor. preencha os campos.');
        return;
    }
    if (medicamentoExiste) {
        await window.dialogAPI.alertar('Medicamento já cadastrado.');
        return;
    }
    if (parseInt(saldo) <= 0) {
        await window.dialogAPI.alertar('Saldo deve ser maior que zero.');
        return;
    }
    if (new Date(validade) < new Date()) {
        await window.dialogAPI.alertar('Data de validade deve ser futura.');
        return;
    }
    if (id === '') {
        await window.projetoAPI.adicionarMedicamento(nome, embalagem, saldo, validade);
        await window.dialogAPI.alertar('Medicamento cadastrado com sucesso');
    } else {
        await window.projetoAPI.atualizarMedicamento(nome, embalagem, saldo, validade, id);
        await window.dialogAPI.alertar('Medicamento atualizado com sucesso');
    }
    carregarMedicamentos();
    limparCamposMedicamento();
}

async function deletarMedicamento() {
    const id = modalIdMedicamento.value;
    if (id === '') {
        await window.dialogAPI.alertar('Selecione um medicamento para excluir.');
        return;
    }
    if (await window.dialogAPI.confirmar('Tem certeza que deseja excluir o medicamento?')) {
        await window.projetoAPI.deletarMedicamento(id);
        await window.dialogAPI.alertar('Medicamento excluído com sucesso');
    }
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

}
carregarMedicamentos();
pesquisa()