const {pokemon}=require('../db/sequelize');
module.exports=(app)=>{
    app.delete('/api/pokemons/:id',(req,res)=>{
        pokemon.findByPk(req.params.id)
        .then(data=>{
            if(data===null){
                const message=`Le pokemon avec id ${data.id} n'existe pas`;
                return res.status(404).json({message})
            }
            const pokemonDeleted=data;
            return pokemon.destroy({
                where:{id:data.id}
            })
            .then(_=>{
                const message=`le pokemon avec l'identifiant ${pokemonDeleted.id} a bien ete supprimer`;
                res.json({message,data:pokemonDeleted})
            })
        })
        .catch(error=>{
            const message=`Le pokemon n'a pas pu etre supprimer, Reessayer dans quelques instants.`;
            res.status(500).json({message,error:error})
        })
    })
}