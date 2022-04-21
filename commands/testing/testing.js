const { MessageEmbed, Permissions } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "testing",
    aliases: ["test"],
    cooldown: 0,
    description: "To test something",
    async execute(client, message, args, prefix) {
        try {
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
            if(!role) role = message.guild.roles.cache.find(role => role.name == args[0])
            const Members = message.guild.members.cache.filter(member => member.roles.cache.has(role.id)).map(member => member.user.tag).join('\n');
            const embed = new MessageEmbed()
            .setTitle(`Users with role ${role.name}:`)
            .setDescription(`${Members}`)
            .setColor('RANDOM')
            .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
            .setTimestamp()
            message.channel.send({embeds: [embed]});
            } catch(err) {
              console.log(err)
        
              const embed1 = new MessageEmbed()
              .setDescription(`Provide role id only or mention it.`)
              message.channel.send({embeds: [embed1]});
            }
    }
}