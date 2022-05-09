exports.validaCampo = function (c) {
    //Transformando string em array.
    let cArray = c.num.split('');
    let cReverse = cArray.reverse();

    let somatorio = cReverse.reduce((acc, current, index) => {
        //Define se vai multiplicar por 2 ou 1
        let multiplicacao = Number(current) * (((index + 1) % 2) + 1);
        let resultado = 0;
        if (multiplicacao > 9) {
            resultado = Math.trunc(multiplicacao / 10) + (multiplicacao % 10);
        } else {
            resultado = multiplicacao;
        }
        return acc + resultado;
    }, 0);

    return somatorio = ((Math.ceil(somatorio / 10) * 10) - somatorio);
}

exports.validaLinha = function (linha_digitavel) {

    if (!/^[0-9]{47}$/.test(linha_digitavel)) {
        return { "status": "400", "msg": "linha digitavel invalida" };
    }

    const campos = [
        {
            num: linha_digitavel.substring(0, 9),
            DV: linha_digitavel.substring(9, 10),
        },
        {
            num: linha_digitavel.substring(10, 20),
            DV: linha_digitavel.substring(20, 21),
        },
        {
            num: linha_digitavel.substring(21, 31),
            DV: linha_digitavel.substring(31, 32),
        },
    ];

    for (let i = 0; i < campos.length; i++) {
        let dVCalculado = this.validaCampo(campos[i]);
        if (Number(campos[i].DV) != dVCalculado) {
            return { "status": "400", "msg": "dv invalido no campo: " + i };
        }
    }

    let banco = linha_digitavel.substring(0, 3);
    let moeda = linha_digitavel.substring(3, 4);
    let dv = linha_digitavel.substring(32, 33);
    let fatorVencimento = linha_digitavel.substring(33, 37);
    let valorNominal = linha_digitavel.substring(37, 47);
    let campoLivreBlc1 = linha_digitavel.substring(4, 9);
    let campoLivreBlc2 = linha_digitavel.substring(10, 20);
    let campoLivreBlc3 = linha_digitavel.substring(21, 31);
    let codigoBarras = banco + moeda + dv + fatorVencimento + valorNominal + campoLivreBlc1 + campoLivreBlc2 + campoLivreBlc3;

    let valorNominalFormatado = (Number(valorNominal) / 100).toFixed(2);

    let dataInicial = new Date("10/07/1997");
    let dataFinal = new Date(dataInicial);
    dataFinal.setDate(dataFinal.getDate() + Number(fatorVencimento));
    dataFinalFormatada = dataFinal.toISOString().split('T')[0];

    return { "status": "200", "msg": { "barCode": codigoBarras, "amount": valorNominalFormatado, "expirationDate": dataFinalFormatada } };
}