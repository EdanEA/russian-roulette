/**
* Gives information on the bot's commands.
* @param {string} [args = null] The name of a command, for more info on that specific command.
*/
var help;
exports.run = function(message, args) {
  if(!args[0]) {
    client.createMessage(message.channel.id, {embed: {
      color: 0xCD2626,
      fields: [
        {
          name: '**Core Commands**',
          value: '`play`, `forceplay`, `multiplay`, `stats`'
        },
        {
          name: '**Admin Commands**',
          value: '`ban`, `kick`, `prune`, `prefix`, `rolesave`, `config`'
        },
		    {
		      name: '**Fun Commands**',
		      value: '`secrets`, `insult`, `rps`, `coin`, `roll`'
		    },
        {
          name: "**Misc. Commands**",
          value: '`coin`, `pick`, `invite`, `suggest`, `about`, `info`, `guild`'
        },
        {
          name: "**Staff Commands**",
          value: '`cinv`, `eval`, `blacklist`'
        }
      ],
      footer: {
        text: `To get \"in depth\" details for commands, do ${prefixes[message.channel.guild.id]}help [command name]`
      }
    }});
  } else {
    try {
      let command = require(`../commands/${args[0]}.js`).info;
      command.usage = command.usage.replace(")", prefixes[message.channel.guild.id]);

      client.createMessage(message.channel.id, {embed: {
        color: 0xCD2626,
        title: `${command.usage} command info`,
        description: "To use command arguments, simply replace `[args]` with the argument(s) you choose to use.",
        fields: [
          { name: "Arguments", value: command.args },
          { name: "Description", value: command.description }
        ]
      }});
    } catch (e) {
      return message.channel.createMessage(`<@${message.author.id}>, that is not a command.`);
    }
  }
};

exports.info = {
  usage: ")help [args]",
  args: "[command name]",
  description: "It's a help command, no arguments for a list of the commands, or the name of a command for more info on it specifically."
}
