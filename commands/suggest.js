/**
* Allows you to suggest features for the bot.
* @param {string} s The suggestion.
*/

exports.run = function(message, args) {
  var s = args.join(' ');

  if(!s) return message.channel.createMessage(`Hey, bud, you gotta actually suggest something.`);
  if(s == "command") return message.channel.createMessage(`Please actually suggest something.`);

  try {
    message.channel.createInvite().then(i => {
      client.createMessage(bot.suggestchannel, {embed: {
        color: 0x551A8B,
        fields: [
          { name: "Guild Invite, ID, and Channel ID", value: `https://discord.gg/${i.code}, ${message.channel.guild.id}, ${message.channel.id}`, inline: false },
          { name: "Suggestor and Guild Info", value: `${message.author.username}#${message.author.discriminator}, ${message.author.id}, in ${message.channel.guild.name}, in the channel \`#${message.channel.name}\``, inline: false },
          { name: "Suggestion(s)", value: `\`\`\`${s}\`\`\``, inline: false }
        ],
        footer: {
          text: moment().format('MMM Do YYYY, h:mm:ss a'),
          icon_url: message.author.avatarURL
        }
      }}).then(() => {
        message.channel.createMessage("Suggestion recieved!");
      });
    });
  } catch (e) {
    throw c.red(e.stack);
    message.channel.send(`\`\`\`${e}\`\`\``);
  }
};

exports.info = {
  usage: ")suggest [args]",
  args: "[suggestion; something to suggest]",
  description: "The developer of this bot is butt-fuck out of ideas. So give him some, you fucking cucks."
};
