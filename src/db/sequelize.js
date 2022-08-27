const {Sequelize,DataTypes}=require('sequelize');
const pokemonModel=require('../models/pokemon');
const pokemons=require('./mock-pokemon');

const sequelize=new Sequelize('pokedex','root','Fooly@1251',{
    host:'localhost',
    dialect:'mariadb',
    dialectOptions:{
        timezone:'Etc/GMT-2'
    },
    logging : false
})

const pokemon=pokemonModel(sequelize,DataTypes);

/*Initialisation de la base de donnees*/
const initDB=()=>{
    return sequelize.sync({force:true}).then(_=>{
        pokemons.map(p=>{
            pokemon.create({
                name:p.name,
                hp:p.hp,
                cp:p.cp,
                picture:p.picture,
                types: p.types
            }).then(data=>console.log(data.toJSON()))
        });
        console.log('la base de donnees a bien ete initialiser');
    })
}
module.exports={
    initDB,pokemon
}
