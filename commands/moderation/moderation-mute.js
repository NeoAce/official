const { MessageEmbed, Permissions } = require('discord.js')
const ms = require('ms')
module.exports = {
    name: "mute",
    aliases: [""],
    description: "Mute a Person",

    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("You can't use this command")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("I can't use this command!")

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ") || "No Reason"
        let time = ms("7d")
        const date = new Date(time)

        if(!target) return message.reply("Who are you going to mute?")
        if(target !== message.author.id) return message.reply("You can't mute yourself idiot")
        if(!target.moderatable) return message.reply("I can't mute this person!")
        
        const embed = new MessageEmbed()
        .setTitle("SLEEP")
        .addField(`Muted:`, `${target}`, true)
        .addField(`Muted by:`, `${message.author}`, true)
        .addField(`Reason:`, `${reason}`, true)
        .addField(`Duration:`, `**${date.getDate()} days**`)

        target.timeout(time)

        message.channel.send({embeds: [embed]})
    }
}