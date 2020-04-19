const { MessageEmbed } = require("discord.js")
const  fs  = require("fs");
var config = require("../../botconfig.json")
var guildConf = require("../../prefixes.json")

module.exports = {
  config: {
    name: "prefix",
    description: "Change prefix in your server",
    usage: ">prefix <new prefix>",
    category: "moderation",
    accessableby: "Members",
    aliases: ["pf"]
  },
  run: async (bot, message, args) => {
//     if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No no no.");

    if(!args[0] || args[0 == "help"]) return message.reply(`${config.prefix}`);

//     // guildConf[message.guild.id].prefix = args[0];
//     // if(!guildConf[message.guild.id].prefix){
//     //   guildConf[message.guild.id].prefix = config.prefix;
//     // }
//     // fs.writeFile("../../prefixes.json", JSON.stringify(guildConf, null, 2), (err) => {
//     //   if(err) console.log(err)
//     // })
// // =========
//       let prefixes = JSON.parse(fs.readFileSync("./prefixes.json"))

//       prefixes[message.guild.id] = {
//         prefixes: args[0]
//       };

//       fs.writeFile("./prefixes.json", JSON.stringify(prefixes, null, 2), (err) => {
//         if (err) console.log(err)
//       });

    let sEmbed = new MessageEmbed()
    .setColor("#FF9900")
    .setTitle("Prefix Set!")
    .setDescription(`Set to ${args[0]}`);

    message.channel.send(sEmbed);

  }
}