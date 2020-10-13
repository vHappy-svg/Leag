const Discord = require('discord.js');
const bot = new Discord.Client(); 
const config = require('./config.json'); 
const fs = require('fs'); //define fs
const low = require('lowdb')
const links = require('./links.json')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('infinite.json')
const discloud = require("discloud-status");
const db = low(adapter)


bot.commands = new Discord.Collection(); //definimos o bot.commands

fs.readdir("./commands/", (err, files) => { //ele irá ler a pasta de comandos
    if(err) console.error(err);//se der erro, este irá mostrar no console.log

    let arquivojs = files.filter(f => f.split(".").pop() == "js"); //definimos arquivojs, com o split "." e que tenha js no final.
    arquivojs.forEach((f, i) => { //cada arquivojs...
        let props = require(`./commands/${f}`); //definimos props, que precisa dos arquivos da pasta comandos.
        console.log(`Comando ${f} carregado com sucesso.`);
        
    });
});
 fs.readdir("./commands/moderation/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/moderation/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Carregado com sucesso: ${commandName}`);
      bot.commands.set(commandName, props);
    });
  });
  fs.readdir("./commands/fun/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/fun/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Carregado com sucesso: ${commandName}`);
      bot.commands.set(commandName, props);
    });
  });
  fs.readdir("./commands/index/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/index/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Carregado com sucesso: ${commandName}`);
      bot.commands.set(commandName, props);
    });
  });
  fs.readdir("./commands/help/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/help/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Cargando con suceso: ${commandName}`);
      bot.commands.set(commandName, props);
    });
  });
bot.on('message', message => {
    responseObject = links;
    if(responseObject[message.content]){
        message.channel.send(responseObject[message.content]);
    }
});
bot.on("guildMemberAdd", async member => {

    let embed = new Discord.RichEmbed()

    .setTitle(`Joined ${member}`)
    .setThumbnail(`${member.user.avatarURL}`)
    .addField(`Joined › ${member.guild}`, `Good Day ${member} Your joined in ${member.guild}`)
    .setFooter(`<-`, `${member.user.avatarURL}`)

    let canalEntrada = bot.channels.get("760901036725633084")
    .send(embed)

});

bot.on("guildMemberRemove", async member => {

    let embed = new Discord.RichEmbed()

    .setTitle(`he left ${member}`)
    .setDescription(`User: **${member}** left the server.`)
    .setFooter(`Message deleted in 5 seconds`, `${member.user.avatarURL}`)

    let canalEntrada = bot.channels.get("760901036725633084").send(embed)
});

bot.on('ready', () => {
 
    console.log(`Tu bot se conecto con ${bot.users.size} jugadores, en ${bot.channels.size} canales, y ${bot.guilds.size} servidores (Para Leag) .`)
     
    let status = [
        {name: 'Dm for support', type: 'Watching', url: 'https://www.twitch.tv/ultimateboat'},
       
    ]
        function setStatus() {
            let altStatus = status[Math.floor(Math.random()*status.length)]
            bot.user.setPresence({game: altStatus})
        }
        setStatus();
        setInterval(() => setStatus(), 10000)
});

bot.on("guildCreate", guild =>{
    console.log(`Tu bot entro en: ${guild.name} ID: ${guild.id} usuarios: ${guild.memberCount}`)
})
bot.on("guilDelete", guild =>{
    console.log(`O bot saiu do servidor: ${guild.name} ID: ${guild.id}`)
})

bot.on('message', message => { 
  
    if(message.author.bot) return; 
    if(message.channel.type === "dm") return message.channel.send(`¡Ops! | You can't talk to me, but you can add me here: https://discord.com/oauth2/authorize?client_id=759554575752757258&permissions=388160&scope=bot / or join in support server: wait.`) 
    let prefix = config.prefix; 
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
    let arquivocmd = bot.commands.get(command.slice(prefix.length));
    if(arquivocmd) arquivocmd.run(bot,message,args);
    
    if(message.content.startsWith(config.prefix + 'emoji')){ 
        message.guild.emojis.map(em => message.channel.send(`${em} | ${em.name} | ${em.id}`)).join('\n')
    }
    
});

bot.login(config.token)
