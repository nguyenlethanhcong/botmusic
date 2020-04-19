module.exports = {
    config: {
        name: "join",
        description: "Join a voice channel",
        usage: ">join",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["j"]
    },
    run: async (bot, message, args) => {
        message.delete();

        const { voice } = message.member;
        let voiceChannel = voice.channel

        if (voiceChannel){
            if(!message.member.voiceConnection){
                voiceChannel.join().then(c => {message.channel.send("Successfully Joined")})
            }
        }else{
            message.channel.send("You need to be in a voice channel.").then(m => m.delete({ timeout: 3000 }));
        }
    }
}