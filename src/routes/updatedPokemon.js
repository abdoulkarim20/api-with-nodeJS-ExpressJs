const {pokemon}=require('../db/sequelize');
module.exports=(app)=>{
    app.put('/api/pokemons/:id',(req,res)=>{
        const id=req.params.id;
        pokemon.update(req.body,{
            where:{id:id}
        })
        .then(_=>{
            /*je recupere le pokemon pour lui afficher qu'il est modifier*/
            return pokemon.findByPk(id)
            .then(data=>{
                if(data===null){
                    const message=`Le pokemon avec id ${data.id} n'existe pas`;
                    return res.status(404).json({message})
                }
                const message=`le pokemon ${data.name} a ete modifier`;
                res.json({message,pokemon:data});
            })
            /* puisque nous avons deux catch et que le premier retourne fais un retourn
            si il contient une erreur il va directement etre transferer dans le dernier catch
            .catch(error=>{
                const message=`Le pokemon n'a pas pu etre modifier, Reessayer dans quelques instants.`;
                res.status(500).json({message,error})
            })
            */
        })
        .catch(error=>{
            const message=`Le pokemon n'a pas pu etre modifier, Reessayer dans quelques instants.`;
            res.status(500).json({message,error})
        })
    })
}