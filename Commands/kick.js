const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("```Couldn't find user```");
    let kreason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("```You don't have permission to do that```");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("```Not Allowed```")

    let kickembed = new Discord.RichEmbed()
    .setColor("#7d00b7")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kreason);

    let kickchannel = message.guild.channels.find(`name`, "kicks-bans");
    if(!kickchannel) return message.channel.send("```Couldn't find kick channel```");

    message.guild.member(kUser).kick(kreason)
    kickbanchannel.send(kickembed)
}

module.exports.help = {
    name: "kick"
}