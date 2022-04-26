const { MessageEmbed, Permissions } = require('discord.js')
const warns = require('../../Schemas/warningFileSchema')

module.exports = {
    name: "warning",
    aliases: ["warn"],
    description: "Warn a Person",

    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("You can't use this command")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("I can't use this command!")

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ") || "No Reason"

        if(!target) return message.reply("Who are you going to warn?")

        warns.findOne({
            guildID: message.guild.id,
            memberID: message.author.id, 
            reportedID: target.id
        }, async (err, data) => {
            if(data) {
                const warns = {
                    reason: reason,
                }
                data.reason = [...data.reason, warns]
                await data.save()
            } else {
                new warns({
                    guildID: message.guild.id,
                    memberID: message.author.id, 
                    reportedID: target.id,
                    reason: reason
                }).save()
            }
        })

        if(!target) return message.reply("Who are you going to warn?")
        const embed = new MessageEmbed()
        .setTitle("WARNING")
        .addField(`Warned:`, `${target}`)
        .addField(`Warned by:`, `${message.author}`)
        .addField(`Reason:`, `${reason}`)
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}