const { getJanelaMedicamento } = require('../janelaModal');

function notificarMedicamentoAtualizado() {
  const janela = getJanelaMedicamento();
  if (janela) {
    janela.webContents.send('medicamento-atualizado');
  }
}

module.exports = {
  notificarMedicamentoAtualizado,
};