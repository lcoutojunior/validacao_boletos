const express = require('express');
const routes = express.Router();
const BoletoController = require("./controllers/BoletoController");
const HealthCheckController = require("./controllers/HealthCheckController");

routes.get('/healthCheck', async (req, res) => {
    await HealthCheckController.healthCheck(req, res);
});

routes.get('/boleto/:linha_digitavel', async (req, res) => {
    await BoletoController.validaCodigo(req, res);
});

module.exports = routes;