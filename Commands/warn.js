const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have Permission to do that");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.reply("User not found");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot warn this person");
    let role = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription(" ")
    .setAuthor(message.author.username)
    .setColor("#7d00b7")
    .addField("Warned User", wUser.tag)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

    let warnchannel = message.guild.channels.find(`name`, "reports");
    if (!warnchannel) return message.reply("Couldn't find channel");

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 3){
        let muterole = message.guild.roles.find(`name`, "muted");
        if(!muterole) return message.reply("Punishment not in place");

        let mutetime = "300s";
        await(wUser.addRole(muterole.id));
        message.channel.send(`${wUser.tag} has been muted for 5 minutes`);

        setTimeout(function(){
            wUser.removeRole(muterole.id)
            message.channel.reply(`<@${wUser.tag}> has been unmuted`)
        })
    }
    if(warns[wUser.id].warns == 2){
        message.guild.member(wUser).kick(reason);
        message.channel.send(`${wUser.tag} has been kicked`)

    }

}

module.exports.help = {
    name: "warn"
}