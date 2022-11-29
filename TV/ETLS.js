var express = require('express');
var router = express.Router();
var emiters = require('events');
const { execFile } = require('child_process');

/* GET users listing. */
router.get('/', function(req, res, next) {
  title = 'Contralodr de ETLs - Business Partners Valtek'
  res.render('ETLS', {Busy});
});

var Busy = false
var myEmitter = new emiters.EventEmitter();

myEmitter.on('Busy Now', function(){
  Busy=true
})

myEmitter.on('Not Busy', function(){
  Busy=false
})

//La funcion
myEmitter.on('Test_ETL', async function(){
  if(Busy==false){
    myEmitter.emit('Busy Now')
    console.log('Resolviendo...')
    //await new Promise(resolve => setTimeout(resolve, 5000));
    await testFunct('C:/ETLs Camilo/Cargas a Solicitud/BSC_Financieros/Cargar BSC Manual.bat'   );
  }else{
    console.log('Sorry pal, busy now...')
  }

})

//ACCION DEL ROUTER
router.get('/test', async function(req, res, next) {
  await myEmitter.emit('Test_ETL')
  res.redirect('./')
});


//Usar los bats
testFunct = function(path) {
  execFile(path, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }   
  if (stderr) {
    console.log(`stderr: ${stderr}`); 
    return;
  }
  //console.log(`stdout: ${stdout}`);
})
console.log('Terminado.')
myEmitter.emit('Not Busy')
}
;


module.exports = router;
