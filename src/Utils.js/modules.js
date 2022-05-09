exports.module10 = (bloco) => {
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