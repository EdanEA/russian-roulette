/**
* Invite urls for the bot, and its official server.
*/

exports.run = function(message, args) {
  client.createMessage(message.channel.id, {embed: {
    color: 0x00FFC1,
    fields: [
      {
        name: "Bot Invite",
        value: "https://discordapp.com/oauth2/authorize?client_id=305602159741763585&scope=bot&permissions=8"
      },
      {
        name: "Server Invite",
        value: "https://discord.me/xdd"
      }
    ],
    footer: {
      text: "end me"
    }
  }});
};

exports.info = {
  usage: ")invite",
  args: "[none]",
  description: "Get the invite to add the bot to more servers and the invite to the official server."
};
