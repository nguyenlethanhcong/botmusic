const { MessageEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")
const { Red4 } = require("../../colours.json")
const config = require("../../botconfig.json")

module.exports = {
    config: {
        name: "cfsrealtalk",
        aliases: ["cfsrt"],
        usage: ">cfsrealtalk",
        category: "miscellaneous",
        description: "Send your confession in server Real Talk",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (!args[0])
            return message.channel.send("Please include a confession")

            let text = args.slice(0).join(" ")
    
            if (text.length > 1024) 
            return message.reply("Your message content too many characters (1024 Limit) :/")
    
            let embed = new MessageEmbed()
                .setColor(Red4)
                .setThumbnail(bot.user.displayAvatarURL())
                .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL())
                .setDescription(stripIndents`
                **Confession:** \`${message.id}\`\n 
                **❯** ${text}\n`)
                .setFooter(`Dms bot: >cfsrt <cofession>`, bot.user.displayAvatarURL())
                bot.guilds.cache.get(config.server_id1).channels.cache.get(config.channel_id1).send(embed)
        }
}