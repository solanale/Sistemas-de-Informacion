//Escribe un programa que use operación de sistema de archivos asíncrona para leer un archivo e imprimir en consola
//el número de saltos de línea ('\n') que contiene. Similar a  ejecutar cat file | wc -l.
//
//El programa recibirá la ruta al archivo como único argumento.

var fs = require('fs');
var path = process.argv[2];

fs.readFile(path, 'utf8', function (err, data){
  var lines = data.split('\n');
  console.log(lines.length-1);
});
