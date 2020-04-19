const { MessageEmbed } = require("discord.js");
const { Red4 } = require("../../colours.json");
const { stripIndents } = require("common-tags")

module.exports = {
    config: {
        name: "invite",
        aliases: ["i", "inv"],
        usage: ">invite",
        category: "miscellaneous",
        description: "Invite bot to your server",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        message.delete()
        let embed = new MessageEmbed()
        .setColor(Red4)
        .setThumbnail(bot.user.displayAvatarURL())
        .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL())
        .addField("Some useful links", stripIndents`
            ❯ **[Invite bot to your server](https://discordapp.com/api/oauth2/authorize?client_id=623358061549191168&permissions=8&scope=bot)**\n
            ❯ **[Our server](https://discord.gg/p2UjEg3)**`)
        .setTimestamp()
        .setFooter(`Sin | Mun`, bot.user.displayAvatarURL())
        message.channel.send(embed)//.then(m => m.delete({ timeout: 10000 }));
    }
}