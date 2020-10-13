const Discord = require("discord.js");
const stats = require("./stats.json");

module.exports.cantFindStats = (memberID) => {
    console.log("Novo usuário: " + memberID + " cabou de entrar no sistema de level!");
    stats[memberID] = {
     xp: 300,
     level: 0,
     coins: 0,
   };
   console.log("criado um novo " + memberID)
}
