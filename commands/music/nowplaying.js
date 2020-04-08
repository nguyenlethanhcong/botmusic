const { Utils } = require("erela.js")
const { MessageEmbed } = require("discord.js")
const { Red4 } = require("../../colours.json");
const { stripIndents } = require("common-tags")

module.exports = { 
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays what the bot is currently playing.",
        usage: ">nowplaying",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const player = bot.music.players.get(message.guild.id);

        if (!player || !player.queue[0]) 
        return message.channel.send("No song/s currently playing within this guild.").then(m => m.delete({timeout: 3000}));

        const { title, author, duration, thumbnail } = player.queue[0];

        const embed = new MessageEmbed()
            .setColor(Red4)
            .setAuthor("Current Song Playing.", message.author.displayAvatarURL())
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **${title}** \`${Utils.formatTime(duration, true)}\` by ${author}
            `);

        return message.channel.send(embed);
    }
}