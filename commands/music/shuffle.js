module.exports = { 
    config: {
        name: "suffle",
        description: "Shuffles the queue",
        usage: ">suffle",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const { voice } = message.member;
        let voiceChannel = voice.channel
        const player = bot.music.player.get(message.guild.id);
        if(!player || !player.queue[0]) return message.channel.send("No song curently playing in this guild.");

        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to shuffle music.")

        player.queue.shuffle();
        return message.channel.send("The queue is now shuffled")
    }
}