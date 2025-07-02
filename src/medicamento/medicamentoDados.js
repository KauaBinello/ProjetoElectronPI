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

async function mostrarDetalhes() {
    const id = localStorage.getItem('medicamentoId');

    const medicamento = await window.projetoAPI.getMedicamentoById(id);

    modalIdMedicamento.value = medicamento.id || '';
    modalNomeMedicamento.value = medicamento.nome || '';
    modalEmbalagemMedicamento.value = medicamento.embalagem || '';
    modalSaldoMedicamento.value = medicamento.saldo || '';
    modalValidadeMedicamento.value = medicamento.validade || '';

    lucide.createIcons();
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
    if (parseInt(saldo) <= 0) {
        await window.dialogAPI.alertar('Saldo deve ser maior que zero.');
        return;
    }
    if (new Date(validade) < new Date()) {
        await window.dialogAPI.alertar('Data de validade deve ser futura.');
        return;
    }
    if (id === '') {
        if (medicamentoExiste) {
            await window.dialogAPI.alertar('Medicamento já cadastrado.');
            return;
        }
        await window.projetoAPI.adicionarMedicamento(nome, embalagem, saldo, validade);
        await window.dialogAPI.alertar('Medicamento cadastrado com sucesso');
    } else {
        await window.projetoAPI.atualizarMedicamento(nome, embalagem, saldo, validade, id);
        await window.dialogAPI.alertar('Medicamento atualizado com sucesso');
    }
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
    limparCamposMedicamento();
}

mostrarDetalhes();