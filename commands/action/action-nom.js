const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "nom",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to nom?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " nom " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/6mvKb4vf0SoAAAAC/wholesome-nom-nom-nom-nom.gif')

        message.channel.send({embeds: [embed]})
    }
}