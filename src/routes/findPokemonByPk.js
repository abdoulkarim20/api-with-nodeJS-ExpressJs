const {pokemon}=require('../db/sequelize');
module.exports=(app)=>{
    app.get('/api/pokemons/:id',(req,res)=>{
        pokemon.findByPk(req.params.id)
        .then(data=>{
            const message=`le pokemon trouve est: ${data.name}`;
            res.json({message,data})
        })
        .catch(error=>{
            const message=`Le pokemon n'a pas pu etre recuperer, Reessayer dans quelques instants.`;
            res.status(500).json({message,error})
        })
    })
}