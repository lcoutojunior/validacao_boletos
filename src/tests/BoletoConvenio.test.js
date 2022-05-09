const BoletoConvenioService = require("../services/BoletoConvenioServices");

test("boleto_convenio", 
    () => {   
        //Passando linha digitavel de forma correta.
        let boleto = {"linha_digitavel": "846500000001499901090112004661546541400633093986"};
        expect(BoletoConvenioService.validaLinha(boleto.linha_digitavel)).toStrictEqual({"msg": {"amount": "49.99","barCode": "84650000000499901090110046615465440063309398",},"status": "200",});
        //Passando um caractere no final.
        let boleto2 = {"linha_digitavel": "8465000000014999010901120046615465414006330939A"};
        expect(BoletoConvenioService.validaLinha(boleto2.linha_digitavel)).toStrictEqual({"msg": "linha digitavel invalida", "status": "400"});
    }
);