//Crea un programa que dado un directorio imprima una lista de archivos filtrados
//por la extensión. El primer argumento será la ruta al directorio
//(ej: '/path/dir/') y el segundo la extensión a filtrar, por ejemplo si recibes
//'txt' deberás filtrar todos los archivos que terminen en .txt.

var fs = require('fs');
var path = process.argv[2];
var ext ='.' + process.argv[3];

fs.readdir(path, function (error,lista){
  for(var i=0; i<lista.length;i++){
    if(lista[i].match(ext)){
      console.log(lista[i]);
    }
  }
})
