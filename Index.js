const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true})
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("```Couldn't find commands```");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`)
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("with the Source code", {type: "Playing"});
});

bot.on("message", message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args =  messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

    if(cmd === `${prefix}warn`){

    return;
  }

    if(cmd === `${prefix}addrole`){

      return;
    }

    if(cmd === `${prefix}addrole`){

      return;
    }

    if(cmd === `${prefix}mute`){

    return;
    }
  if(cmd === `${prefix}kick`){

    return;
  }
  if(cmd == `${prefix}ban`){

    return;
  }
  if(cmd === `${prefix}report`){

    return;
  }
  if(cmd === `${prefix}serverinfo`){

    return;
  }
  if(cmd === prefix + "pfp"){

  }
});
bot.login(botconfig.token);