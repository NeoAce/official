const { MessageEmbed } = require('discord.js')
const schema = require('../../Schemas/guildQuarantine')

module.exports = {
    name: "enable-quarantine",
    aliases: [""],
    description: "Configuration Quarantine",
    cooldown: 0,
    usage: "enable-quarantine",
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .addField("To use this command, type:", `${prefix}set-quarantine <guildID>`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0]) {
            schema.findOne({
                guildID: message.guild.id
            }, async(err, data) => {
                if(data) {
                    return message.reply(`${message.author.username}, you already enabled the quarantine system`) 
                } else {
                    new schema({
                        guildID: message.guild.id
                    }).save()

                    const embed = new MessageEmbed()
                    .setDescription("Quarantine Enabled.")
                    .addField("Guild Name:", `${message.guild.username}`)
                    .addField("Enabled by:", `${message.author.username}`)
                    .setColor('RANDOM')
                    .setTimestamp()

                    message.channel.send({embeds: [embed]})
                }
            })
        }
    }
}