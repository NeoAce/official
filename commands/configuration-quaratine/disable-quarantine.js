const { MessageEmbed } = require('discord.js')
const schema = require('../../Schemas/guildQuarantine')

module.exports = {
    name: "disable-quarantine",
    aliases: [""],
    description: "Configuration Quaratine",
    cooldown: 0,
    usage: "disable-quarantine",
    async execute(client, message, args) {
        const exist = await schema.findOne({
            guildID: message.guild.id
        })

        if(!exist) return message.reply(`You didn't allow quarantine system.`)

        schema.findOneAndRemove({
            guildID: message.guild.id
        })

        const embed = new MessageEmbed()
        .setDescription('Quarantine Disabled')
        .addField(`Disabled by:`, `${message.author.username}`)
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed]})

    }
}