const {pokemon}=require('../db/sequelize');
module.exports=(app)=>{
    app.get('/api/pokemons',(req,res)=>{
        pokemon.findAll()
        .then(data=>{
            const message='la liste des pokemons';
            res.json({message,data})
        })
        .catch(error=>{
            const message=`La liste des pokemons na pas pu etre recuperer,Veuillez revenir dans quelques instants.`;
            res.status(500).json({message,data:error});
        })
    })
}