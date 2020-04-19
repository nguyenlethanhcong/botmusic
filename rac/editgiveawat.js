const ms = require("ms");

module.exports = {
    config: {
        name: "editgiveaway",
        description: "Edit a giveaway",
        usage: ">editgiveaway <ID giveaway> <time> <winner> <prize>",
        category: "giveaway",
        accessableby: "Members",
        aliases: ["eg"]
    },
    run: async (bot, message, args) => {
        let messageID = args[0];
        bot.giveawaysManager.edit(messageID, {
            newWinnerCount: 3,
            newPrize: "New Prize!",
            addTime: 5000
        }).then(() => {
            message.channel.send("Success! Giveaway will updated in less than " + (manager.updateCountdownEvery / 1000) + " seconds.");
        }).catch((err) => {
            message.channel.send("No giveaway found for " + messageID + ", please check and try again");
        });
    }
}