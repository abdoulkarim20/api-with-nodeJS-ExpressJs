const express=require('express'); //permet de recuperer la dependance express
const morgan=require('morgan');// c'est un middlewere nous permet logger les message avec 
const favicon=require('serve-favicon');//le lien de favicon depuis le chemin
const bodyParser=require('body-parser');//permet de transformer une chaine en json
const sequelize=require('./src/db/sequelize');
const app=express();
const port=3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev')) //permet de creer des logger en mode dev
    .use(bodyParser.json()) // nous permet de parser toutes les donnees entrant en sous format json

sequelize.initDB();

/*Ici nous allons definir les points de terminasion */
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatedPokemon')(app);
require('./src/routes/deletePokemon')(app);

app.listen(port,()=>console.log(`notre application node est demarer sur le port: http://localhost:${port}`));