const { Logger } = require('logger');
const { splitToPlayable } = require("common-tags")
const allowOver200 = process.env.ALLOW_OVER_200 || require('../../botconfig.json').allow_more_than_200_chars;
const logger = new Logger();

module.exports = {
    config: {
    name: "speak",
    aliases: ["spk"],
    description: `Send a TTS message in your voice channel${allowOver200 ? '.' : ' (Up to 200 characters).'}`,
    usage: ">speak"
    },
    run: (client, message, args) => {
    const { voice } = message.member;
    let channel = voice.channel
    let options = {};
    const { channel } = message.member.voice;
    const { ttsPlayer, name: guildName, voice } = message.guild;
    const connection = await message.member.voice.channel.join();
    const [atLeastOneWord] = options.args[0];

    if (!channel) {
      message.reply('you need to be in a voice channel first.');
      return;
    }

    if (!channel.joinable) {
      message.reply('I cannot join your voice channel.');
      return;
    }

    if (!atLeastOneWord) {
      message.reply('you need to specify a message.');
      return;
    }

    if (connection) {
      splitToPlayable(options.args)
        .then((phrases) => {
          ttsPlayer.say(phrases);
        })
        .catch((error) => {
          message.reply(error);
        });
    } else {
      channel.join()
        .then(() => {
          logger.info(`Joined ${channel.name} in ${guildName}.`);
          message.channel.send(`Joined ${channel}.`);
          splitToPlayable(options.args)
            .then((phrases) => {
              ttsPlayer.say(phrases);
            })
            .catch((error) => {
              message.reply(error);
            });
        })
        .catch((error) => {
          throw error;
        });
    }
  }
}