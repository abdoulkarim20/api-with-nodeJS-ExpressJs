const {pokemon}=require('../db/sequelize');
module.exports=(app)=>{
    app.post('/api/pokemons',(req,res)=>{
        pokemon.create(req.body)
        .then(data=>{
            let message=`le pokemon creer est ${req.body.name}`;
            res.json({message,data})
        })
        .catch(error=>console.log(error))
    })

}
// module.exports=createPokemon;
/*Cette partie du code ci-dessu est fait par moi pour experimenter une syntaxe a enlever par apres*/