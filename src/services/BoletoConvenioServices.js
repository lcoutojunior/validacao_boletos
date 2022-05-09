const BoletoBancarioService = require("./BoletoBancarioServices");

function modulo10(bloco) {
    const codigo = bloco.split('').reverse();

    let somatorio = codigo.reduce((acc, current, index) => {
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

function modulo11Arrecadacao(c) {
    const codigo = c.split('').reverse();
    let multiplicador = 2;
    const somatorio = codigo.reduce((acc, current) => {
        const soma = Number(current) * multiplicador;
        multiplicador = (multiplicador === 9 ? 2 : (multiplicador + 1));
        return acc + soma;
    }, 0);
    const restoDivisao = somatorio % 11;

    if (restoDivisao === 0 || restoDivisao === 1) {
        return 0;
    }
    if (restoDivisao === 10) {
        return 1;
    }
    const DV = 11 - restoDivisao;
    return DV;
}

exports.validaLinha = function (linha_digitavel) {

    if (!/^[0-9]{48}$/.test(linha_digitavel) || Number(linha_digitavel[0]) !== 8) {
        return { "status": "400", "msg": "linha digitavel invalida" };
    }

    let codigoBarras = '';
    for (let index = 0; index < 4; index++) {
        const start = (11 * (index)) + index;
        const end = (11 * (index + 1)) + index;
        codigoBarras += linha_digitavel.substring(start, end);
    }

    let validDv;
    if (!/^[0-9]{44}$/.test(codigoBarras) || Number(codigoBarras[0]) !== 8) {
        validDv = false;
    }
    const codigoMoeda2 = Number(codigoBarras[2]);
    const DV = Number(codigoBarras[3]);
    const bloco = codigoBarras.substring(0, 3) + codigoBarras.substring(4);
    let modulo2;
    if (codigoMoeda2 === 6 || codigoMoeda2 === 7) {
        modulo2 = modulo10;
    } else if (codigoMoeda2 === 8 || codigoMoeda2 === 9) {
        modulo2 = modulo11Arrecadacao;
    } else {
        validDV = false;
    }

    validDV = (modulo2(bloco) === DV);

    const codigoMoeda = Number(linha_digitavel[2]);
    let modulo;
    if (codigoMoeda === 6 || codigoMoeda === 7) {
        modulo = modulo10;
    } else if (codigoMoeda === 8 || codigoMoeda === 9) {
        modulo = modulo11Arrecadacao;
    } else {
        return false;
    }
    const blocos = Array.from({ length: 4 }, (v, index) => {
        const start = (11 * (index)) + index;
        const end = (11 * (index + 1)) + index;
        return {
            num: linha_digitavel.substring(start, end),
            DV: linha_digitavel.substring(end, end + 1),
        };
    });
    const validBlocos = blocos.every(e => modulo(e.num) === Number(e.DV));
    
    let valor = (Number(codigoBarras.substring(19, 8)) / 1000000).toFixed(2);
    if (validBlocos && validDV) {
        return { "status": "200", "msg": { "barCode": codigoBarras, "amount": valor } };
    }else{
        return { "status": "400", "msg": "linha digitavel invalida"};
    }

}