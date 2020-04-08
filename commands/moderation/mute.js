const { MessageEmbed } = require("discord.js")
const { Red4 } = require("../../colours.json");

module.exports = {
    config: {
        name: "mute",
        description: "Mutes a member in the discord!",
        usage: ">mute <user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["mt", "nospeak"]
    },
    run: async (bot, message, args) => {
        // check if the command caller has permission to use the command
        if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
            return message.channel.send("You dont have permission to use this command.").then(m => m.delete({ timeout: 3000 }));

        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
            return message.channel.send("I don't have permission to add roles!").then(m => m.delete({ timeout: 3000 }))

        //define the reason and mutee
        let mutee = message.mentions.members.first()

        if (!mutee)
            return message.channel.send("Please supply a user to be muted!").then(m => m.delete({ timeout: 3000 }));

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given"

        //define mute role and if the mute role doesnt exist then create one
        let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: "#514f48",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                })
            } catch (e) {
                console.log(e.stack);
            }
        }

        //add role to the mentioned user and also send the user a dm explaing where and why they were muted
        mutee.roles.add(muterole.id).then(() => {
            message.delete()
            mutee.send(`Hello, you have been muted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
            message.channel.send(`${mutee.user.username} was successfully muted.`).then(m => m.delete({ timeout: 3000 }))
        })

        //send an embed to the modlogs channel
        let embed = new MessageEmbed()
            .setColor(Red4)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .addField("Mute User:", mutee.user.username)
            .addField("By Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
        message.channel.send(embed)
    }
}