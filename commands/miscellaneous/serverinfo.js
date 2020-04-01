const { MessageEmbed } = require("discord.js")
const { Red4 } = require("../../colours.json");

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
            .addField("Server Owner:", `${message.guild.owner}`, true)
            .addField("ID:", `${message.guild.id}`, true)
            .addField("Member Count:", `${message.guild.memberCount}`, true)
            // .addField("Human Count:", `${message.guild.humans}`, true)
            // .addField("Bot Count:", `${message.guild.bots}`, true)
            .addField("Channel Count:", `${message.guild.channels.cache.size}`, true)
            .addField("Role Count:", `${message.guild.roles.cache.size}`, true)
            .addField("Region:", `${message.guild.region}`, true)
            .addField("Emoji:", `${message.guild.emojis.cache.size}`, true)
            .addField("Create At:", `${message.guild.createdAt.toLocaleString()}`, true)
            .setFooter(`Sin | Mun`, bot.user.displayAvatarURL());
        message.channel.send(sEmbed);
    }
}