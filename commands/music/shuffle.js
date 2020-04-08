module.exports = {
    config: {
        name: "shuffle",
        description: "Shuffles the queue",
        usage: ">shuffle",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const { voice } = message.member;
        let voiceChannel = voice.channel
        const player = bot.music.players.get(message.guild.id);

        if (!player || !player.queue[0])
            return message.channel.send("No song curently playing in this guild.").then(m => m.delete({ timeout: 3000 }));

        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id)
            return message.channel.send("You need to be in a voice channel to shuffle music.").then(m => m.delete({ timeout: 3000 }))

        player.queue.shuffle();
        return message.channel.send("The queue is now shuffled").then(m => m.delete({ timeout: 3000 }))
    }
}