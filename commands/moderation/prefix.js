const { MessageEmbed } = require("discord.js")
const { prefix } = require("../../botconfig.json");
const { fs } = require("fs");

module.exports = {
    config: {
        name: "prefix",
        description: "Change prefix in your server",
        usage: ">prefix <new prefix>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["pf"]
    },
    run : async (bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("No no no.");
  if(!args[0] || args[0 == "help"]) return message.reply(`prefix: ${prefix}`);

//   let prefixs = JSON.parse(fs.readFileSync("../../botconfig.json", "utf8"));

//   prefixs[message.guild.id] = {
//     prefixs: args[0]
//   };

//   fs.writeFile(".../../botconfig.json", JSON.stringify(prefixs), (err) => {
//     if (err) console.log(err)
//   });

  let sEmbed = new MessageEmbed()
  .setColor("#FF9900")
  .setTitle("Prefix Set!")
  .setDescription(`Set to ${args[0]}`);

  message.channel.send(sEmbed);

    }
}