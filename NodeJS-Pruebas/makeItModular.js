//El programa debe imprimir el listado de archivos de un directorio filtrando por
//extensión. Nuevamente el primer argumento será la ruta al directorio
//(ej: '/path/dir/') y el segundo la extensión a filtrar, por ejemplo si recibes
//'txt' deberás filtrar todos los archivos que terminen en .txt. Debes usar Async I/O.

//Deberás escribir un archivo modular para hacer la tarea. Dicho módulo debe
//exportar una función que reciba tres parámetros en orden: la ruta del directorio,
//la extensión para filtrar y una función de callback. La idea es encapsular
//toda la lógica dentro del módulo.

var mymodule = require('./makeItModular_mymodule.js');   //el .js no es necesario
var dir = process.argv[2];
var ext = new RegExp('\.' + process.argv[3]);
mymodule(dir,ext,function(error,data){
  data.forEach(function(file){
    console.log(file);
  })
})
