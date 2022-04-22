const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: "add-role-all",
    aliases: [""],
    description: "Moderation Add role to all",
    cooldown: 0,
    usage: "add-role-all",
    async execute(client, message, args) {
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