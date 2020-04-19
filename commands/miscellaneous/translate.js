const gtranslate = require('translate-google');
const { MessageEmbed } = require("discord.js")
const { Red4 } = require("../../colours.json");
module.exports = {
    config: {
        name: "translate",
        description: "Translate your language",
        usage: ">translate -<aliases language>",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["trs"]
    },
    run: async (bot, message, args) => {
        message.delete();

        // if (!message.guild.me.hasPermission(["MANAGE_MESSAGES"]))
        // return message.channel.send("I don't have permission to delete message").then(m => m.delete({ timeout: 3000 }))

        if (!args[0])
            return message.channel.send("Please include a message to translate!").then(m => m.delete({ timeout: 3000 }))

        //Get language
        let lang = args[args.length-1];
        if (lang.charAt(0) == '-') {
            lang = lang.substring(1);
            args.pop();
        } else {
            lang = "en"
        }

        //Get text
        let text = args.join(" ");
        if (text.length > 700) {
            message.channel.send("The message is too long!!").then(m => m.delete({ timeout: 3000 }))
            return;
        }

        let ptext = text;
        text = text.split(/(?=[?!.])/gi);
        text.push(" ");
        gtranslate(text, { to: lang }).then(res => {
            let embed = new MessageEmbed()
                .setColor(Red4)
                .setThumbnail(bot.user.displayAvatarURL())
                .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL())
                .addField('Input', `\`\`\`css\n${ptext}\`\`\``)
                .addField('Language', `\`\`\`css\n${lang}\`\`\``)
                .addField('Output', `\`\`\`css\n${"" + res.join(" ")}\`\`\``)
                .setTimestamp()
                .setFooter(`Sin | Mun`, bot.user.displayAvatarURL())
            message.channel.send(embed)
        }).catch(err => {
            message.channel.send("Could not find that language! Use `>listlang` to see available languages").then(m => m.delete({ timeout: 3000 }))
        })
    }
}