const REFRESH_RATE = 1000
const GAMES_CATEGORY_NAME = 'GENERAL'
module.exports = {
    config: {
        category: "miscellaneous",
    },
    run: async (bot, message, args) => {
        setInterval(() => {
            const voiceChannels = bot.channels.cache.filter(
                channel =>
                    channel.parent &&
                    channel.parent.name === GAMES_CATEGORY_NAME &&
                    channel.type === 'test'
            )
            const nonEmptyVoiceChannels = voiceChannels.cache.filter(
                channel => channel.members.array().length >= 1
            )
            const emptyVoiceChannels = voiceChannels.cache.filter(
                channel => channel.members.array().length === 0
            )
            if (emptyVoiceChannels.array().length === 0) {
                bot.guilds
                    .first()
                    .createChannel('🔁·', 'voice')
                    .then(createdChannel => {
                        createdChannel
                            .setParent(
                                bot.guilds
                                    .first()
                                    .channels.cache.find(c => c.name === GAMES_CATEGORY_NAME).id
                            )
                            .catch(err => console.log(channel.name))
                    })
                    .catch(err => console.log(channel.name))
            }
            if (
                emptyVoiceChannels.array().length > 1 &&
                voiceChannels.array().length > 1
            ) {
                if (emptyVoiceChannels.last()) emptyVoiceChannels.last().delete()
            }
        }, REFRESH_RATE)
    }
}