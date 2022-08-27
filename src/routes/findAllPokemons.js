const {pokemon}=require('../db/sequelize');
module.exports=(app)=>{
    app.get('/api/pokemons',(req,res)=>{
        pokemon.findAll()
        .then(data=>{
            const message='la liste des pokemons';
            res.json({message,data})
        })
        .catch(error=>console.log(error))
    })
}