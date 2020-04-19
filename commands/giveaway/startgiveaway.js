const ms = require("ms"); // npm install ms
const Discord = require("discord.js")
const { GiveawaysManager } = require("discord-giveaways");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    config: {
        name: "startgiveaway",
        description: "Create a giveaway",
        usage: ">startgiveaway <time> <winner> <prize>",
        category: "giveaway",
        accessableby: "Members",
        aliases: ["sg"]
    },
    run: async (bot, message, args) => {
        message.delete();
        const member = getMember(message, args.join(" "));
        bot.giveawaysManager.start(message.channel, {
            hostedBy: '<@'+`${ member.user.id }`+'>',
            time: ms(args[0]),
            prize: '🎁 ' + `${args.slice(2).join(" ")}`,
            winnerCount: parseInt(args[1]),
            messages: {
                giveaway: "🎉 **GIVEAWAY** 🎉",
                giveawayEnded: "🎉 **GIVEAWAY ENDED** 🎉",
                hostedBy: 'Hotsted By: {user}',
                timeRemaining: "Countdown: **{duration}**!",
                inviteToParticipate: "React with 🎉 to get rewards!",
                winMessage: "Congratulations, {winners} `You won {prize}`",
                noWinner: "Giveaway cancelled, no winner",
                winners: "winner(s)",
                startAt: "Start at",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });
    }
}