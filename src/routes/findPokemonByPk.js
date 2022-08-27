const {pokemon}=require('../db/sequelize');
module.exports=(app)=>{
    app.get('/api/pokemons/:id',(req,res)=>{
        pokemon.findByPk(req.params.id)
        .then(data=>{
            const message=`le pokemon trouve est: ${data.name}`;
            res.json({message,data})
        })
        .catch(error=>console.log(error))
    })
}