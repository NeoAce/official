const { MessageEmbed, Permissions } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "testing",
    aliases: ["test"],
    cooldown: 0,
    description: "To test something",
    async execute(client, message, args, prefix) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command.")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply("I can't use this command, enable `MANAGE_ROLES` for me.")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) 
        if (!role) return message.channel.send(`**${message.author.username}**, role not found`)
        message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(role))
        const embed = new MessageEmbed()
        .addField(`Added by:`, `${message.author}`)
        .addField(`Role:`, `${role}`)
        .setDescription("Role added to all members.")
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}