const { MessageEmbed } = require("discord.js")
const { create, all } = require("mathjs");
const { Red4 } = require("../../colours.json");
const config = {};
const math = create(all, config);

module.exports = {
    config: {
        name: "math",
        category: "miscellaneous",
        description: "Does your math homework for you!",
        accessableby: "Members",
        usage: "<num1> <operator> <num2>",
        aliases: ["m"]
    },
    run: async (bot, message, args) => {
        if (!args[0])
            return message.channel.send('Please input a calculation').then(m => m.delete({ timeout: 3000 }))
            message.delete();

        let resp;
        try {
            resp = math.evaluate(args.join(' '));
        } catch (e) {
            return message.channel.send('Sorry, please input a valid calculation').then(m => m.delete({ timeout: 3000 }))
        }

        const embed = new MessageEmbed()
            .setColor(Red4)
            .setTitle('Calculation')
            .addField('Input', `\`\`\`css\n${args.join('')}\`\`\``)
            .addField('Output', `\`\`\`css\n${resp}\`\`\``)
        message.channel.send(embed);
    }
}