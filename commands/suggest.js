/**
* Allows you to suggest features for the bot.
* @param {string} s The suggestion.
*/
var suggest;
exports.run = async function(message, args) {
  var s = args.join(' ');

  if(!s) return message.channel.createMessage(`Hey, bud, you gotta actually suggest something.`);

  try {
    message.channel.createInvite().then(i => {
      client.createMessage(bot.suggestchannel, {embed: {
        color: 0x551A8B,
        fields: [
          { name: "Guild Info", value: `Guild Name: ${message.channel.guild.name}\nGuild Invite: https://discord.gg/${i.code}\nGuild ID: ${message.channel.guild.id}\nChannel Name: ${message.channel.name}\nChannel ID:${message.channel.id}`, inline: false },
          { name: "User Info", value: `User Tag: ${message.author.username}#${message.author.discriminator}\nUser ID: ${message.author.id}`, inline: false },
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
    message.channel.send(`\`\`\`${e}\`\`\``);
    throw c.red(e.stack);
  }
};

exports.info = {
  usage: ")suggest [args]",
  args: "[suggestion; something to suggest]",
  description: "The developer of this bot is butt-fuck out of ideas. So give him some, you fucking cucks."
};
