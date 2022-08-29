const {pokemon}=require('../db/sequelize');
module.exports=(app)=>{
    app.get('/api/pokemons',(req,res)=>{
        /*Pour effectuer la recherche*/
        if(req.query.name){
            const name=req.query.name;
            return pokemon.findAll({where:{name:name}})
            .then(pokemons=>{
                const message=`il ya ${pokemons.length} pokemons coorespondant a la recherche`;
                res.json({message,data:pokemons});
            })
        }else{
            pokemon.findAll()
            .then(data=>{
                const message='la liste des pokemons';
                res.json({message,data})
            })
            .catch(error=>{
                const message=`La liste des pokemons na pas pu etre recuperer,Veuillez revenir dans quelques instants.`;
                res.status(500).json({message,data:error});
            })
        }
    })
}