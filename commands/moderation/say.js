const { MessageEmbed } = require("discord.js")
const { Red4 } = require("../../colours.json")

module.exports = {
    config: {
        name: "say",
        description: "sends a message that was inputted to a channel",
        usage: ">say",
        category: "moderation",
        accessableby: "Staff",
        aliases: ["acc", "announcement"]
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"]))
            return message.channel.send("You can not use this command!")
        let mChannel = message.mentions.channels.first()
        message.delete()
        if (mChannel) {
            const argsresult = new MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(Red4)
            message.channel.send(argsresult)
        } else {
            const argsresult = new MessageEmbed()
                .setDescription(args.join(" "))
                .setColor(Red4)
            message.channel.send(argsresult)
        }
    }
}