const { MessageEmbed } = require("discord.js")
const { Red4 } = require("../../colours.json");

module.exports = {
    config: {
        name: "queue",
        aliases: ["q", "now"],
        description: "Displays what the current queue is.",
        usage: ">queue",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);
        if (!player || !player.queue[0])
            return message.channel.send("No song currently playing in this guild.").then(m => m.delete({ timeout: 3000 }));

        let index = 1;
        let string = "";

        if (player.queue[0]) string += `__**Currently Playing**__\n ${player.queue[0].title} - **Requested by ${player.queue[0].requester.username}**. \n`;
        if (player.queue[1]) string += `__**Rest of queue:**__\n ${player.queue.slice(1, 10).map(x => `**${index++})** ${x.title} - **Requested by ${x.requester.username}**.`).join("\n")}`;

        const embed = new MessageEmbed()
            .setColor(Red4)
            .setAuthor(`Current Queue for ${message.guild.name}`, message.guild.iconURL())
            .setThumbnail(player.queue[0].thumbnail)
            .setDescription(string);

        return message.channel.send(embed);
    }
}