const { PlayerManager } = require("discord.js-lavalink");
const { prefix } = require("../../botconfig.json");
const { ErelaClient, Utils } = require("erela.js");
const { nodes } = require("../../botconfig.json");
const { green_light } = require("../../colours.json");
const { Red4 } = require("../../colours.json");

const { GiveawaysManager } = require("discord-giveaways");

module.exports = bot => {
    console.log(`${bot.user.username} is online`);

    bot.music = new ErelaClient(bot, nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log("Successfully created a new Node."))
        .on("queueEnd", player => {
            player.textChannel.send("Queue has ended.")
            // return bot.music.player.destroy(player.guild.id)
        })
        .on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``).then(m => m.delete({timeout: 5000})));

        bot.levels = new Map()
            .set("none", 0.0)
            .set("low", 0.10)
            .set("medium", 0.15)
            .set("high", 0.25)
        
    let activities = [ `${bot.guilds.cache.size} servers!`, `${bot.channels.cache.size} channels!`], i = 0;
    setInterval(() => bot.user.setActivity(`${prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)

    const manager = new GiveawaysManager(bot, {
        storage: "./giveaways.json",
        updateCountdownEvery: 5000,
        default: {
            botsCanWin: false,
            embedColor: Red4,
            embedColorEnd: green_light,
            reaction: "🎉"
        }
    });
    // We now have a giveawaysManager property to access the manager everywhere!
    bot.giveawaysManager = manager;
};