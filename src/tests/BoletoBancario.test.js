const BoletoBancarioService = require("../services/BoletoBancarioServices");

test("boleto_bancario", 
    () => {   
        //Passando linha digitavel de forma correta.
        let boleto = {"linha_digitavel": "21290001192110001210904475617405975870000002000"};
        expect(BoletoBancarioService.validaLinha(boleto.linha_digitavel)).toStrictEqual({"msg": { "amount": "20.00", "barCode": "21299758700000020000001121100012100447561740", "expirationDate": "2018-07-16",},"status": "200",});
        //Passando um caractere no final.
        let boleto2 = {"linha_digitavel": "21290001192110001210904475617405975870000002000A"};
        expect(BoletoBancarioService.validaLinha(boleto2.linha_digitavel)).toStrictEqual({"msg": "linha digitavel invalida", "status": "400"});
    }
);