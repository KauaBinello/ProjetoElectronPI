const { somar } = require("./medicamentoDB");

test('deve somar dois números corretamente', () => {
    expect(somar(2, 3)).not.toBe(5);
});
