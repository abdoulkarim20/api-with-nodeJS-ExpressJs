const express=require('express'); //permet de recuperer la dependance express
const morgan=require('morgan');// c'est un middlewere nous permet logger les message avec 
const favicon=require('serve-favicon');//le lien de favicon depuis le chemin
const bodyParser=require('body-parser');//permet de transformer une chaine en json
const {Sequelize,DataTypes}=require('sequelize');//importation de sequelize
let pokemons=require('./mock-pokemon'); //la liste des pokemon
const pokemonModel=require('./src/models/pokemon');
const {success, getUniqueId}=require('./helper.js');
const app=express();
const port=3000;
/*creation d'un middlewere
app.use((req,res,nex)=>{
    console.log(`URL: ${req.url}`);
    nex(); //next signifie que le traitement est terminer
})
peur etre remplacer par 
app.use(morgan('dev'));
*/

const sequelize=new Sequelize(
    'pokedex',
    'root',
    'Fooly@1251',
    {
        host:'localhost',
        dialect:'mariadb',
        dialectOptions:{
            timezone:'Etc/GMT-2'},
        logging : false
    },
)
sequelize.authenticate()
    .then(_=>console.log('la connexion reussi'))
    .catch(error=>console.error('connexion echouer',error))

const pokemon=pokemonModel(sequelize,DataTypes)
sequelize.sync({force:true})
    .then(_=>{
        console.log('la base de donnees a ete syncrhoniser')
        pokemons.map(p=>{
            pokemon.create({
                name:p.name,
                hp:p.hp,
                cp:p.cp,
                picture:p.picture,
                types: p.types.join()
            }).then(data=>console.log(data.toJSON()))//nous avons utilise toJSON car il est recommander par sequelize pour afficher correctement les donnees des instances d'un models
        })
        
    })

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev')) //permet de creer des logger en mode dev
    .use(bodyParser.json()) // nous permet de parser toutes les donnees entrant en sous format json



/*La methode permettant de afficher un message dans le navigateur*/
app.get('/',(req,res)=>res.send('hello, express js'));

/*La methode permettant de retourner tous les pokemon*/
app.get('/api/pokemons',(req,res)=>{
    //const pokemonTotal=pokemons.length
    const message='la liste des pokemons a bien ete retourner';
    res.json(success(message,pokemons));
})
/*La methode permettant de recuperer un pokemon*/
app.get('/api/pokemons/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const pokemon=pokemons.find(pokemon=>pokemon.id===id);
    // res.send(`vous avez demander le pokemon dont le nom est ${pokemon.name}`) //recuperation dans url avec param dynamique
    //recupere le pokemon sous format json
    const message='Le pokemon correspondant est: '
    res.json(success(message,pokemon));
});

/*La methode pour faire le post*/
app.post('/api/pokemons',(req,res)=>{
    const id=getUniqueId(pokemons);
    const pokemonCreated={...req.body,...{id:id,created:new Date()}}
    pokemons.push(pokemonCreated);
    const message=`Le pokemon ${pokemonCreated.name} a ete creer avec success`;
    res.json(success(message,pokemonCreated));
})

/*La methode permettant de modifier un pokemon*/
app.put('/api/pokemons/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const pokemonUpdated = {...req.body,id:id};
    pokemons=pokemons.map(pokemon=>{ //nous permet de mettre la liste globale des pokemon en remplacant dans la liste le pokemon par sa valeur modifier
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message=`le pokemon ${pokemonUpdated.name} a ete modifier avec succees`;
    res.json(success(message,pokemonUpdated));
})

/*La methode permettant de supprimer un pokemon*/
app.delete('/api/pokemons/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    pokemonDeleted=pokemons.find(pokemon => pokemon.id === id);
    pokemons.filter(pokemon => pokemon.id !== id);//on retourne tous les pokemon sauf celui supprimer
    const message=`le pokemon ${pokemonDeleted.name} a ete supprimer avec success`;
    res.json(success(message,pokemonDeleted));
})

app.listen(port,()=>console.log(`notre application node est demarer sur le port: http://localhost:${port}`));