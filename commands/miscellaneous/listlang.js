const gtranslate = require('translate-google');
const { MessageEmbed } = require("discord.js")
module.exports = {
    config: {
        name: "listlang",
        description: "Show all list aliases languages for translate",
        usage: ">listlang",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["lsl"]
    },
    run: async (bot, message, args) => {
        let text = "List aliases Languages:\n"
        let done = false;
        for(key in gtranslate.languages){
            if(key == "zu")
                done = true;
            if(!done)
            text += "`"+key+"`-"+gtranslate.languages[key]+"  ";
        }
        message.channel.send(text)
    }
}