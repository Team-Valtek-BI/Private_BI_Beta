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
  title = 'Controlador de ETLs - Adquisiciones'
  res.render('ETLS Adquisiciones', {Busy, last_launched, error_anterior, error_anterior_text});
});

router.get('/Ciclos-Equipos', function(req, res, next) {
  last_launched = 'GS Ciclos-Equipos'
  myEmitter.emit('launch_ETL', 'C:/ETLs Camilo/Cargas a Solicitud/Ciclos Mantencion Equipos/Ejectuar Carga Ciclos Mantencion.bat', true)
  res.redirect('../')
});

router.get('/Cargar-Zonas-ProactivaNet', function(req, res, next) {
  last_launched = 'Zonas ProactivaNet'
  myEmitter.emit('launch_ETL', 'C:/ETLs Camilo/Cargas Periodicas/Carga Zonas ProactivaNet/0 - Cargar Zonas PN.bat', true)
  res.redirect('../')
});

router.get('/Clasificacion-por-PM', function(req, res, next) {
  last_launched = 'GS Clasificacion por PM'
  myEmitter.emit('launch_ETL', 'C:/ETLs Camilo/Cargas Periodicas/Cargar GS_CLASIFICACION_POR_PM/Cargar GS Clasificación por PM.bat', true)
  res.redirect('../')
});

router.get('/base-calendario', function(req, res, next) {
  last_launched = 'SP de Base Calendario Reúestos'
  myEmitter.emit('launch_ETL', 'C:/ETLs Camilo/Cargas Periodicas/Cargar Base Calendario/SP Calendario.bat', true)
  res.redirect('../')
});


router.get('/pm', function(req, res, next) {
  last_launched = 'pm'
  res.redirect('../')
});



module.exports = router;
