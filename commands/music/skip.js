module.exports = {
    config: {
        name: "skip",
        aliases: ["next"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: ">skip"
    },
    run: (bot, message, args) => {
        const { voice } = message.member;
        let voiceChannel = voice.channel
        const player = bot.music.players.get(message.guild.id);

        if (!player)
            return message.channel.send("No song/s currently playing in this guild.").then(m => m.delete({ timeout: 3000 }));

        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id)
            return message.channel.send("You need to be in a voice channel to use the skip command.").then(m => m.delete({ timeout: 3000 }));

        player.stop();
            return message.channel.send("Skipped the current song!").then(m => m.delete({ timeout: 3000 }));
    }
}