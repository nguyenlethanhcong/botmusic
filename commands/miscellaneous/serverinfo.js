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
        let sEmbed = new MessageEmbed()
            .setColor(Red4)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .addField("Server Info", stripIndents`
            **❯ Server Owner:** ${message.guild.owner}\n
            **❯ ID:** ${message.guild.id}\n
            **❯ Member Count:** ${message.guild.memberCount}\n
            **❯ Channel Count:** ${message.guild.channels.cache.size}\n
            **❯ Role Count:** ${message.guild.roles.cache.size}\n
            **❯ Region:** ${message.guild.region}\n
            **❯ Emoji:** ${message.guild.emojis.cache.size}\n
            **❯ Create At:** ${message.guild.createdAt.toLocaleString()}`, true)
            .setFooter(`Sin | Mun`, bot.user.displayAvatarURL());
        message.channel.send(sEmbed);
    }
}