function notificarAtualizacao(canal, getJanela) {
  const janela = getJanela();
  if (janela) {
    janela.webContents.send(`${canal}-atualizado`);
  }
}

module.exports = {
  notificarAtualizacao,
};