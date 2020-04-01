const { MessageEmbed } = require("discord.js")
const { Red4 } = require("../../colours.json");

module.exports = {
    config: {
        name: "userinfo",
        description: "Pulls the userinfo of yourself or a user!",
        usage: ">userinfo (@mention)",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["ui"]
    },
    run: async (bot, message, args) => {
    let uEmbed = new MessageEmbed()
        .setColor(Red4)
        .setThumbnail(message.guild.iconURL())
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .addField("**Username:**", `${message.author.username}`, true)
        .addField("**Discriminator:**", `#${message.author.discriminator}`, true)
        .addField("**ID:**", `${message.author.id}`, true)
        .addField("**Status:**", `${message.author.presence.status}`, true)
        .addField("**Created At:**", `${message.author.createdAt.toLocaleString()}`, true)
        .setFooter(`Sin | Mun`, bot.user.displayAvatarURL());

    message.channel.send(uEmbed);
    }
}