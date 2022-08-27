const {pokemon}=require('../db/sequelize');
module.exports=(app)=>{
    app.put('/api/pokemons/:id',(req,res)=>{
        const id=req.params.id;
        pokemon.update(req.body,{
            where:{id:id}
        })
        .then(_=>{
            /*je recupere le pokemon pour lui afficher qu'il est modifier*/
            pokemon.findByPk(id)
            .then(data=>{
                const message=`le pokemon ${data.name} a ete modifier`;
                res.json({message,pokemon:data});
            })
            .catch((error)=>{
                console.log(error);
            })
        })
    })
}