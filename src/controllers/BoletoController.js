const BoletoBancarioService = require("../services/BoletoBancarioServices");
const BoletoConvenioService = require("../services/BoletoConvenioServices");

exports.validaCodigo = function(req, res){
    try{
        let linhaDigitavel = req.params.linha_digitavel;
        let resultado;
        
        //Identificação do Produto Constante “8” para identificar arrecadação.
        if(linhaDigitavel[0] == 8){
            resultado = BoletoConvenioService.validaLinha(linhaDigitavel);
        }else{
            resultado = BoletoBancarioService.validaLinha(linhaDigitavel);
        }
        
        res.status(resultado.status).json(resultado.msg);
    }catch(e){
        res.status(500).json(e.stack);
    }
}