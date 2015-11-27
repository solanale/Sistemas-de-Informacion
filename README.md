# Sistemas de Información (En Progreso)
### Curso 2015-2016

### Objetivos
Se ha de desarrollar un Sistema Web completo, Front-End y Back-End cumpliendo los réquisitos de prácticas 

### Tecnologías
Posiblemente se usara [MEAN](http://mean.io/#!/) Full-stack 
####Front-End:
 * HTML5
 * CSS3
 * Bootstrap
 * Skel
 * Java Script
 * Angular
 
####Back-end
* Node JS + Express

####DataBase
* Mongo DB


### Manual de Instalacion(Linux)

#### NodeJS + NPM
Primero hay que instalar el "node package manager", [npm](https://www.npmjs.com) que se encuentra asociado con NodeJS,
con lo que al instalar Node, también añadimos npm.

$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs

Para compilar e instar addons nativos de npm, podria necesitarse las "build tools"

$ sudo apt-get install -y build-essential

#### MongoDB

$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

$ echo "deb http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

$ sudo apt-get install -y mongodb-org

#### Modulos + Bower

Instalar bower en el sistema:
$ npm install -g bower


Descargar modulos y dependencias(En la ruta del repositorio)
$ npm install  

$ cd public && bower install










