const pokemons = require("./mock-pokemon")

exports.success=(message,data)=>{
    return {message,data}
}
/*le code ci-dessous pouvait etre ecrit comme suit
const success=(message,data)=>{
    return {
        message:message,
        data:data
    }
}
module.exports=success;
*/
/*La generation d'un id unique
Cette fonction permet de comparer les id des pokemon et retourner le plus grand et incrementer de 1 cette id*/
exports.getUniqueId=(pokemons)=>{
    const pokemonsIds=pokemons.map(pokemon => pokemon.id);
    const maxId=pokemonsIds.reduce((a,b) => Math.max(a,b));  
    const uniqueId=maxId + 1;
    return uniqueId;
}