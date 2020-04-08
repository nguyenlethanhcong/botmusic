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

        if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
            return message.channel.send("You dont have permission to perform this command!").then(m => m.delete({ timeout: 3000 }))

        let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!kickMember)
            return message.channel.send("Please provide a user to kick!").then(m => m.delete({ timeout: 3000 }))

        if (!kickMember.kickable)
            return message.channel.send("You cant kick member role high than you").then(m => m.delete({ timeout: 3000 }))

        let reason = args.slice(1).join(" ")
        if (!reason) reason = "No reason given!"

        if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
            return message.channel.send("I dont have permission to do this!").then(m => m.delete({ timeout: 3000 }))

        kickMember.user.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() =>
            kickMember.kick()).catch(err => console.log(err))
        message.delete()

        message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete({ timeout: 3000 }))

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