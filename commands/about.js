/**
* Gives a bit of information about the bot and it's developer.
*/

exports.run = function(message, args) {
  if(guilds[message.channel.guild.id].censor == false) {
    client.createMessage(message.channel.id, {embed: {
      color: 0xFF8C00,
      fields: [
        {
          name: "What is this shit?",
          value: "Shit bot, created by some NEET.",
          inline: true
        },
        {
          name: "Who made this?",
          value: "That said NEET is named \"Edan,\" real fucking cuck. I hear it took him two days to fix the shitty stats command, lol, actual garbage.",
          inline: false
        },
        {
          name: "Anyway I can help?",
          value: "Use the `)suggest` command, or contribute to the [GitHub](https://github.com/EdanEA/russian-roulette) and maybe he'll add it.",
          inline: true
        },
        {
          name: "How do I report errors?",
          value: "You could go to the [Github issues page](https://github.com/EdanEA/russian-roulette/issues), or be a ghetto lil' bitch and send them via the `)suggest` command."
        },
        {
          name: "Anything else?",
          value: "Check out the new [fancy website](https://edanea.github.io), the [GitHub page](https://github.com/EdanEA/russian-roulette), or the [official server](https://discord.me/xdd), and my dev's new bot, [Cynthia](https://edanea.github.io/cynthia). I mean -- only if you want to. I don't care :'("
        }
      ],
      footer: {
        text: "lil slut",
        icon_url: "https://i.imgur.com/nzOMYGv.png"
      }
    }});
  } else {
    client.createMessage(message.channel.id, {embed: {
      color: 0xFF8C00,
      fields: [
        {
          name: "What is this?",
          value: "Garbage bot, created by some NEET.",
          inline: true
        },
        {
          name: "Who made this?",
          value: "That said NEET is named \"Edan,\" real heccing nerd. I hear it took him two days to fix the poorly made stats command, lol, actual garbage.",
          inline: false
        },
        {
          name: "Anyway I can help?",
          value: "Use the `)suggest` command, or contribute to the [GitHub](https://github.com/EdanEA/russian-roulette) and maybe he'll add it.",
          inline: true
        },
        {
          name: "How do I report errors?",
          value: "You could go to the [Github issues page](https://github.com/EdanEA/russian-roulette/issues), or you could send them via the `)suggest` command."
        },
        {
          name: "Anything else?",
          value: "Check out the new [fancy website](https://edanea.github.io), the [GitHub page](https://github.com/EdanEA/russian-roulette), the [official server](https://discord.me/xdd), or [Cynthia](https://edanea.github.io/cynthia), my dev's new bot. I mean -- only if you want to. I don't care :'("
        }
      ],
      footer: {
        text: "Boiiiiiiiiiiiii.",
        icon_url: "https://i.imgur.com/nzOMYGv.png"
      }
    }});
  }
};

exports.info = {
  usage: ")about",
  args: "[none]",
  description: "Just some info on the bot and its creator."
};
