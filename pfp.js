const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
    let pUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!pUser) return message.channel.send("```Couldn't find user```");

    let user = message.mentions.users.first();
    let botembed = new Discord.RichEmbed()
    .setDescription(" ")
    .setColor("#7d00b7")
    .setThumbnail(`${user.displayAvatarURL}`)
    .addField("User", `${message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))}`);

    message.channel.send(botembed);
}

module.exports.help = {
    name: "pfp"
}