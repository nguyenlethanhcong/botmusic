const { MessageEmbed } = require("discord.js")
const { Red4 } = require("../../colours.json");

module.exports = {
    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: ">ban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["b"]
    },
    run: async (bot, message, args) => {

        if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

        let banMember = message.mentions.members.first()
        if (!banMember) return message.channel.send("Please provide a user to ban!")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given!"

        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

        banMember.user.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
        banMember.ban(banMember, { days: 1, reason: reason })).catch(err => console.log(err))
        message.delete()

        message.channel.send(`**${banMember.user.tag}** has been banned`)

        let embed = new MessageEmbed()
            .setColor(Red4)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .addField("Ban User:", banMember.user.username)
            .addField("By Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        message.channel.send(embed)
    }
}