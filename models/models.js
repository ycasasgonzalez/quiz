var path = require('path');

//carga modelo ORM
var Sequelize = require('sequelize');

//usar BBDD sqlite
var sequelize = new Sequelize(null, null, null,{
  dialect: "sqlite",
  storage: "quiz.sqlite"
});

//importar la definición de la tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz;

//crea e inicializa la tabla de preguntas
sequelize.sync().success(function(){
  Quiz.count().success(function(count){
    if(count===0){
      Quiz.create({
        pregunta: 'Capital de Italia',
        respuesta: 'Roma'
      });
	  Quiz.create({
        pregunta: 'Capital de Portugal',
        respuesta: 'Lisboa'
      }).then(function(){console.log('Base de datos inicializada')});
    }
  });
});