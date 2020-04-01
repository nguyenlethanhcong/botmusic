const { MessageEmbed } = require("discord.js")
const { Red4 } = require("../../colours.json");

module.exports = {
    config: {
        name: "kick",
        description: "Kick a user from the guild!",
        usage: ">kick",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["k"]
    },
    run: async (bot, message, args) => {

        if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

        let kickMember = message.mentions.members.first()
        if (!kickMember) return message.channel.send("Please provide a user to kick!")

        if (!kickMember.kickable) return message.channel.send("You cant kick member role high than you")

        let reason = args.slice(1).join(" ")
        if (!reason) reason = "No reason given!"

        if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")

        kickMember.user.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() =>
            kickMember.kick()).catch(err => console.log(err))
        message.delete()

        message.channel.send(`**${kickMember.user.tag}** has been kicked`)

        let embed = new MessageEmbed()
            .setColor(Red4)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .addField("Kick User:", kickMember.user.username)
            .addField("By Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
        message.channel.send(embed)
        // let sChannel = message.guild.channels.find(c => c.name === "tut-modlogs")
        // sChannel.send(embed)
    }
}