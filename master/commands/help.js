/**
* Gives information on the bot's commands.
* @param {string} [args = null] The name of a command, for more info on that specific command.
*/

exports.run = function(message, args) {
  if(!args[0]) {
    client.createMessage(message.channel.id, {embed: {
      color: 0xCD2626,
      fields: [
        {
          name: '`Core Commands`',
          value: '`play`, `forceplay`, `stats`'
        },
        {
          name: '`Admin Commands`',
          value: '`ban`, `kick`, `prefix`'
        },
        {
          name: "`Misc. Commands`",
          value: '`secrets`, `coin`, `pick`, `invite`, `suggest`, `about`'
        }
      ],
      footer: {
        text: `To get \"in depth\" details for commands, do ${prefixes[message.channel.guild.id]}help [command name]`
      }
    }});
  } else {
    try {
      let command = require(`../commands/${args[0]}.js`).info;

      client.createMessage(message.channel.id, {embed: {
        color: 0xCD2626,
        fields: [
          {
            name: `\`${command.usage}\` command info`,
            value: `\`\`\`Arguments:\n${command.args}\n\nDescription:\n${command.description}\`\`\``,
            inline: false
          }
        ]
      }});
    } catch (e) {
      throw c.red(e.stack);
      message.channel.createMessage(`\`\`\`${e}\`\`\``);
    }
  }
};

exports.info = {
  usage: ")help [args]",
  args: "[command name]",
  description: "It's a help command, no arguments for a list of the commands, or the name of a command for more info on it specifically."
}
