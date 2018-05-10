const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("```Couldn't find user```");
    let breason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("```You don't have permission to do that```");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("```Not Allowed```")

    let banembed = new Discord.RichEmbed()
    .setColor("#7d00b7")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", breason);

    let banchannel = message.guild.channels.find(`name`, "kicks-bans");
    if(!banchannel) return message.channel.send("```Couldn't find kick channel```");

    message.guild.member(bUser).ban(breason)
    banchannel.send(banembed)
}

module.exports.help = {
    name: "ban"
}