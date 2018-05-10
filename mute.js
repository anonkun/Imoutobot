const Discord = require("discord.js")
const ms = require("ms")

module.exports.run = async (bot, message, args) => {

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("```Couldn't find user```")
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("```Not allowed```")
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("```You don't have permission to do that```")
    let muterole = message.guild.roles.find(`name`, "muted")
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#7d00b7",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    let mutetime = args[1];
    if(!mutetime) return message.reply("```No time specified```");

    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));

}

module.exports.help = {
    name: "mute"
}