const { MessageEmbed } = require("discord.js");
const { Red4 } = require("../../colours.json");

module.exports = {
    config: {
        name: "vote",
        aliases: ["vt"],
        description: "Vote something",
        category: "miscellaneous",
        accessableby: "Members",
        usage: ">vote [title]"
    },
    run: (client, message, args) => {
        const embed = new MessageEmbed()

        .setColor(Red4)
        .setTitle("Vote")

        if(!args[1]){
            message.channel.send(embed)
        }

        let msgArgs = args.slice(1).join(" ");

        // message.channel.send(msgArgs).then(messageReaction => {
        //     messageReaction.react("▶️");
        //     messageReaction.react("⏸️");
        // })
    }
}