require('dotenv').config();
const { Client, Collection } = require("discord.js");
const config = require("./botconfig.json")
const fs = require("fs")
const bot = new Client();


["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on("message", async message => {
    // let prefixes = JSON.parse(fs.readFileSync("./prefixes.json"))

    // if(!prefixes[message.guild.id]){
    //     prefixes[message.guild.id] = {
    //         prefixes: config.prefix
    //     }
    // }

    // let prefix = prefixes[message.guild.id]
    // console.log(prefix);
})

bot.login(process.env.BOT_TOKEN);