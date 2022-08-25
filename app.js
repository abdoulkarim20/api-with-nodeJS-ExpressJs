const express=require('express'); //permet de recuperer la dependance express
const morgan=require('morgan');
const favicon=require('serve-favicon');
let pokemons=require('./mock-pokemon');
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
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev')); //permet de creer des logger en mode dev

app.get('/',(req,res)=>res.send('hello, express js'));

app.get('/api/pokemons',(req,res)=>{
    //const pokemonTotal=pokemons.length
    const message='la liste des pokemons a bien ete retourner';
    res.json(success(message,pokemons));
})

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

app.listen(port,()=>console.log(`notre application node est demarer sur le port: http://localhost:${port}`));