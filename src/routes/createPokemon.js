const {pokemon}=require('../db/sequelize');
const { ValidationError, UniqueConstraintError,  } = require('sequelize');
module.exports=(app)=>{
    app.post('/api/pokemons',(req,res)=>{
        pokemon.create(req.body)
        .then(data=>{
            let message=`le pokemon creer est ${req.body.name}`;
            res.json({message,data})
        })
        .catch(error=>{
            if(error instanceof ValidationError){
                return res.status(400).json({message:error.message , data:error});
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({ message:error.message , data:error });
            }
            const message=`Le pokemon n'a pas pu etre ajouter, Reessayer dans quelques instants.`;
            res.status(500).json({message,error})
        })  
    })

}
// module.exports=createPokemon;
/*Cette partie du code ci-dessu est fait par moi pour experimenter une syntaxe a enlever par apres*/