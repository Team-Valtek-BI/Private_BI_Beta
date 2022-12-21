var express = require('express');
var router = express.Router();

var launcher = require('../Modules/ETL-launcher')
var Busy = launcher.busy
var myEmitter = launcher.the_emiter

last_launched = ''
Busy = launcher.busy

router.get('/*', function(req, res, next) {
  Busy = launcher.busy
  error_anterior = launcher.error_anterior
  error_anterior_text = launcher.error_anterior_text
  next()
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  title = 'Controlador de ETLs'
  res.render('ETLS', {Busy, last_launched, error_anterior, error_anterior_text});
});

router.get('/cont', function(req, res, next) {
  title = 'Controlador de ETLs'
  res.render('cont', {Busy, last_launched, error_anterior, error_anterior_text});
});

//BSC
router.get('/BSC', function(req, res, next) {
  last_launched = 'BSC'
  myEmitter.emit('launch_ETL', 'C:/ETLs Camilo/Cargas a Solicitud/BSC_Financieros/Cargar BSC Manual.bat')
  res.redirect('../')
});

router.get('/RindeGastos', function(req, res, next) {
  last_launched = 'RindeGastos'
  myEmitter.emit('launch_ETL', 'C:/ETLs Camilo/Cargas a Solicitud/RindeGastos Mensual/cargar_rindegastos_mensual.bat')
  res.redirect('../')
});

router.get('/cxc', function(req, res, next) {
  last_launched = 'Cuentas x Cobrar (Finanzas)'
  myEmitter.emit('launch_ETL', 'C:/ETLs Camilo/Cargas a Solicitud/CXC/Cargar CXC.bat')
  res.redirect('../')
});

router.get('/existencias_historicas', function(req, res, next) {
  last_launched = 'Existencias Históricas (Finanzas)'
  myEmitter.emit('launch_ETL', 'C:/ETLs Camilo/Cargas a Solicitud/Existencias Historicas/ETL carga existencias historicas.bat')
  res.redirect('../')
});

// -----------> Test reportado

router.get('/Test_Reportado/', function(req, res, next) {
  title = 'Controlador de ETLs - Test Reportado'
  res.render('ETLS TR', {Busy, last_launched, error_anterior, error_anterior_text});
});

router.get('/Test_Reportado/existencias_test_reportado', function(req, res, next) {
  last_launched = 'Existencias Test-Reportado (Finanzas)'
  myEmitter.emit('launch_ETL', 'C:/ETLs Camilo/Cargas a Solicitud/Cargas TR/Cargar_TR.bat')
  res.redirect('../')
});

router.get('/Test_Reportado/TR_tipo_costos', function(req, res, next) {
  last_launched = 'Tipos de Costo Test-Reportado (Finanzas)'
  myEmitter.emit('launch_ETL', 'C:/ETLs Camilo/Cargas a Solicitud/Cargas TR/Cargar_TR_Tipo_Costos.bat')
  res.redirect('../')
});


module.exports = router;
