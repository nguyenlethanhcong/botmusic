module.exports = {
    config: {
        name: "loop",
        description: "Loop the queue",
        usage: ">loop",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const { voice } = message.member;
        let voiceChannel = voice.channel
        if (!voiceChannel) return message.channel.send(`You must be in **${player.voiceChannel.name}** to loop the queue`);

        const player = bot.music.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.channel.send("No song curently playing in this guild.");

        if (!player) return message.channel.send('Not playing anything right now');
        // player.loop = !player.loop;
        // bot.queue.set(message.guild.id, player);
        if(!player.loop) return message.channel.send('**🔁 Repeated current queue!**');
        return message.channel.send('**🔁 Unrepeated current queue!**');
    }
}  