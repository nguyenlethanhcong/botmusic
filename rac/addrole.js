const Discord = require("discord.js");

module.exports = {
    config: {
        name: "addrole",
        description: "add a role for user",
        usage: ">addrole @mention <role name>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["ar"]
    },
    run: async (bot, message, args) => {
        //!addrole @andrew Dog Person
        if (!message.member.hasPermission(["MANAGE_SERVER", "ADMINISTRATOR"]))
            return message.reply("Sorry pal, you can't do that.");

        if (!message.guild.me.hasPermission(["MANAGE_SERVER", "ADMINISTRATOR"]))
            return message.channel.send("I don't have permission to add roles!")

        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        if (!rMember) return message.reply("Couldn't find that user, yo.");

        let role = args.join(" ").slice(22);
        if (!role) return message.reply("Specify a role!");

        let gRole = message.guild.roles.cache.find(r => r.name, role);
        if (!gRole) return message.reply("Couldn't find that role.");

        if (rMember.roles.cache.has(gRole.id))
            return message.reply("They already have that role.");
        await (rMember.roles.add(gRole.id));

        try {
            await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
        } catch (e) {
            message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
        }
    }
}