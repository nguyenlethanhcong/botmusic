module.exports = {
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "Adjusts the volume of the bot.",
        accessableby: "Member",
        category: "music",
        usage: ">volume"
    },
    run: async (bot, message, args) => {
        const { voice } = message.member;
        let voiceChannel = voice.channel
        const player = bot.music.players.get(message.guild.id);
        if (!player)
            return message.channel.send("No song/s currently playing within this guild.").then(m => m.delete({ timeout: 3000 }));

        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id)
            return message.channel.send("You need to be in a voice channel to adjust the volume.").then(m => m.delete({ timeout: 3000 }));

        if (!args[0]) return message.channel.send(`Current Volume: ${player.volume}`);
        if (Number(args[0]) <= 0 || Number(args[0]) > 100)
            return message.channel.send("You may only set the volume to 1-100").then(m => m.delete({ timeout: 3000 }));

        player.setVolume(Number(args[0]));
        return message.channel.send(`Successfully set the volume to: ${args[0]}`).then(m => m.delete({ timeout: 3000 }))
    }
}