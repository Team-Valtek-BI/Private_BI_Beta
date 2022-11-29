var express = require('express');
var emiters = require('events');
var spawn = require('child_process').spawn;

var Busy = false
var error_anterior = false
var error_anterior_text = []
var myEmitter = new emiters.EventEmitter();

myEmitter.on('Busy Now', function(){
    module.exports.busy = true
})

myEmitter.on('Not Busy', function(){
    module.exports.busy =false
})

myEmitter.on('Error State', function(){
  module.exports.error_anterior = error_anterior;
  module.exports.error_anterior_text = error_anterior_text;
})

//La funcion
myEmitter.on('launch_ETL', async function(direccion, debug){
  if(Busy==false){
    myEmitter.emit('Busy Now')
    console.log('Resolviendo...')
    //await new Promise(resolve => setTimeout(resolve, 5000));
    await testFunct(direccion, debug);
  }else{
    console.log('Sorry pal, busy now...')
  }

})

//Usar los bats
testFunct = function(path, debug=true) {
    ls    = spawn('cmd.exe', ['/c', path]);
    ls.stdout.on('data', function (data) {
      if(debug){
        console.log('stdout: ' + data);
        //console.log('Esto es lo que hay en consola...')
      }
      });
      
    ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        console.log('Error...')
        myEmitter.emit('Not Busy')
        error_anterior = true
        error_anterior_text.push(data)
        myEmitter.emit('Error State')
      });
      
    ls.on('exit', function (code) {
      //console.log('child process exited with code ' + code);
      if(code==0){
        error_anterior = false
        error_anterior_text = []
        myEmitter.emit('Error State')
      }
      myEmitter.emit('Not Busy')
      console.log('Terminado con codigo ' + code)
      });
  
  }
  ;

  module.exports.the_emiter = myEmitter;
  module.exports.busy = Busy;
  module.exports.error_anterior = error_anterior;
  module.exports.error_anterior_text = error_anterior_text;