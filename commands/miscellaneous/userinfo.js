const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { Red4 } = require("../../colours.json");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    config: {
        name: "userinfo",
        aliases: ["ui"],
        description: "Returns user information",
        category: "miscellaneous",
        accessableby: "Members",
        usage: "[username | id | mention]"
    },
    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));
        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        const embed = new MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL())
            .setAuthor(`${member.user.username}`, member.user.displayAvatarURL())
            .setColor(Red4)
            .addField('Information', stripIndents`
            **❯ Username**: ${member.user.username}\n
            **❯ ID:** ${member.user.id}\n
            **❯ Joined at:** ${member.joinedAt.toLocaleString()}\n
            **❯ Roles:** ${roles}\n
            **❯ Tag**: ${member.user.tag}\n
            **❯ Created at**: ${member.user.createdAt.toLocaleString()}`, true)
            .setTimestamp()
            .setFooter(member.user.username, member.user.displayAvatarURL())
        if (member.user.presence.game)
            embed.addField('Currently playing', stripIndents`**❯ Name:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}