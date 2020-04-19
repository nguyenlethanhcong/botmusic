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
        
        if (!message.member.hasPermission(["MANAGE_SERVER"]))
            return message.channel.send("Sorry pal, you can't do that.");

        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        if (!rMember) return message.channel.send("Couldn't find that user, yo.");

        let role = args.slice(22).join(" ");
        if (!role) return message.channel.send("Specify a role!");

        let gRole = message.guild.roles.cache.find(r => r.name, role);
        if (!gRole) return message.channel.send("Couldn't find that role.");

        if (rMember.roles.cache.has(gRole.id))
            await (rMember.roles.add(gRole.id));

        try {
            message.channel.send(`Congrats, you have been given the role ${gRole.name}`)
        } catch (e) {
            message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
        }
    }
}