const { MessageEmbed } = require("discord.js")
const { Red4 } = require("../../colours.json");
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: ">serverinfo",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["si"]
    },
    run: async (bot, message, args) => {
        // const roles = message.guild.roles.cache.map(r => r.toString()).join(' ')
        // const emoji = message.guild.emojis.cache.map(e => e.toString()).join(' ')
        let sEmbed = new MessageEmbed()
            .setColor(Red4)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .addField("Server Info", stripIndents`
            **❯ Server Owner:** ${message.guild.owner}\n
            **❯ ID:** ${message.guild.id}\n
            **❯ Member Count:** ${message.guild.memberCount}\n
            **❯ Real Member:** ${message.guild.members.cache.filter(member => !member.user.bot).size}\n
            **❯ Bot:** ${message.guild.members.cache.filter(member => member.user.bot).size}\n
            **❯ Channel Count:** ${message.guild.channels.cache.size}\n
            **❯ Text Channel:** ${message.guild.channels.cache.filter(ch => ch.type === 'text').size}\n
            **❯ Voice Channel:** ${message.guild.channels.cache.filter(ch => ch.type === 'voice').size}\n
           
            **❯ Region:** ${message.guild.region}\n
            
            **❯ Create At:** ${message.guild.createdAt.toLocaleString()}`, true)
            // .setDescription(`${message.guild.roles.cache.map(r => r.toString()).join(' ')}`)
            // .setDescription(`**❯ Emojis:** \n${message.guild.emojis.cache.map(e => e.toString()).join(' ')}`)
            .setTimestamp()
            .setFooter(`Sin | Mun`, bot.user.displayAvatarURL())
        message.channel.send(sEmbed);
    }
}