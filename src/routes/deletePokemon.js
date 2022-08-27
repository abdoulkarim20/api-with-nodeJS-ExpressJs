const {pokemon}=require('../db/sequelize');
module.exports=(app)=>{
    app.delete('/api/pokemons/:id',(req,res)=>{
        pokemon.findByPk(req.params.id)
        .then(data=>{
            const pokemonDeleted=data;
            pokemon.destroy({
                where:{id:data.id}
            })
            .then(_=>{
                const message=`le pokemon avec l'identifiant ${pokemonDeleted.id} a bien ete supprimer`;
                res.json({message,data:pokemonDeleted})
            })
            .catch((error)=>{
                console.log(error);
            })
        })
    })
}