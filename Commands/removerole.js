const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You don't have permission to do that");
    let rMember = message.mentions.users.first() || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Couldn't find user");
    let role = message.content.split(" ").slice(22).join(" ");
    if(!role) return message.reply("Specify a role");
    let gRole = message.guild.roles.find(`name`, `${role}`);
    if(!gRole) return message.reply("Couldn't find that role");

    if(rMember.roles.has(gRole.id)) return message.reply("They never had that role");
    await(rMember.addRole(gRole.id));

    try{
        await rMember.send(`You have lost the ${gRole.name} role`)
    }catch(e){
        message.channel.send(`<@${rMember.id}> has lost the role ${gRole.name}`)
    }
}

module.exports.help = {
    name: "removerole"
}