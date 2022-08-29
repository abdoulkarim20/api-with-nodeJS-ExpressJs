const {pokemon}=require('../db/sequelize');
const {Op}=require('sequelize');//definition de la variable pour les operateur de sequelize
module.exports=(app)=>{
    app.get('/api/pokemons',(req,res)=>{
        /*Pour effectuer la recherche*/
        if(req.query.name){
            const name=req.query.name;
            const limit=parseInt(req.query.limit) || 5 //si l'utilisateur choisie un nombre limite pour la recherche sinon on limite a 5

            if(name.length<2){
                const message=`le mot rechercher doit contenir au moins 2 lettres`;
                return res.status(400).json({message});
            }
            return pokemon.findAndCountAll({
                where:{
                    name:{ //est une propriete du model pokemon
                        [Op.like]:`%${name}%` //name est le critere de la recherche qui contient au  moins une lettre pour du pokemon rechercher
                    }
                },
                order:['name'],
                limit:limit//nous permet de limiter le nombre de resultat a 5
            })
            .then(({count,rows})=>{
                const message=`il ya ${count} pokemons coorespondant a la recherche`;
                res.json({message,data:rows});
            })
        }else{
            pokemon.findAll({order:['name']})
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