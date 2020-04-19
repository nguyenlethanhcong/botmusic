const ms = require("ms");

module.exports = {
    config: {
        name: "rerollgiveaway",
        description: "Reroll a giveaway",
        usage: ">rerollgiveaway <ID giveaway>",
        category: "giveaway",
        accessableby: "Members",
        aliases: ["rrg"]
    },
    run: async (bot, message, args) => {
        let messageID = args[0];
        bot.giveawaysManager.reroll(messageID).then(() => {
            message.channel.send("Success! Giveaway rerolled!").then(m => m.delete({ timeout: 3000 }));
        }).catch((err) => {
            message.channel.send("No giveaway found for " + messageID + ", please check and try again");
        });
    }
}
