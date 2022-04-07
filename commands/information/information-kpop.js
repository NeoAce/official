const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
    name: "kpop",
    aliases: [""],
    description: "Information Kpop, <random> || <name>",
    cooldown: 0,
    usage: "kpop",
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            Axios.get('https://apis.beta.duncte123.me/kpop')
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle(`${res.data.data.band || "No band found"}`)
                .setDescription(`${res.data.data.name || "No name found"}`)
                .setImage(`${res.data.data.img}`)
                .setFooter({text: `ID: ${res.data.data.id || "No ID found"}`})

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0]) {
            const kpop = args.slice(0).join(" ")
            Axios.get(`https://apis.beta.duncte123.me/kpop/${kpop}`)
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle(`${res.data.data.band || "No band found"}`)
                .setDescription(`${res.data.data.name || "No name found"}`)
                .setImage(`${res.data.data.img}`)
                .setFooter({text: `ID: ${res.data.data.id || "No ID found"}`})

                message.channel.send({embeds: [embed]})
            })
        }
    }
}