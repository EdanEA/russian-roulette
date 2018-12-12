/**
* Shitty "secret" commands that didn't fit the bot's shit.
* @param {string} [args = "help"] The name of the supposed secret command.
*/
var secrets;
exports.run = function(message, args) {
  var secrets = k.secrets; // no reason really, I just wanna
  var h;

  try {
    if(!args[0]) args[0] = "help";

    if(args[0] === "help") {
      client.createMessage(message.channel.id, {embed: {
        color: 0xFFFF00,
        description: "Just some secret commands. If you think you know a secret check with this `)secrets [answer]`.",
        fields: [
          {
            name: '`??????`',
            value: 'A word in the form of a noun often used to describe something that\'s terrible. e.g. : "KYS LITERALLY"'
          },
          {
            name: '`????`',
            value: 'http://i.imgur.com/Kub5vQW.jpg'
          },
          {
            name: '`??`',
            value: "A terrible term / icon, constantly used in Minecraft fanbases and similar communities."
          },
          {
            name: '`??????`',
            value: "Hey, I'm a money-hungry whore. Give me your money, bitch."
          },
          {
            name: '`????????`',
            value: "The best game in existence. It is commonly know as a \"battle royale,\" aka that thing that Minecraft servers did before everyone else. smh"
          }
        ],
        footer: {
          text: "Reee, I'm triggered af, fam squadhttps://discord.me/xdd",
          icon_url: "https://i.imgur.com/B0GHYIU.png"
        }
      }});
    }

    if(args[0].toLowerCase() == secrets[2]) {
      message.channel.createMessage(`\`\`\`css\n>succs ${message.author.username}\`\`\``);
    }

    if(args[0].toLowerCase() == secrets[1]) {
      var cancers = [
        "https://www.youtube.com/channel/UCdsE9y553KP7Z7MDXzM1sRg\nPraise be to god.",
        "http://i.imgur.com/5degH7X.png",
        "https://soundcloud.com/jahseh-onfroy/tracks\nplsno",
        "https://www.youtube.com/watch?v=2pSqndUZ18A\nDx rip",
        "https://i.imgur.com/0YRHNID.png",
        "https://i.imgur.com/SFgOQtT.png\ngreat bot, can't use the `<Broadcast>.volume()` function without paying $5 a month.",
        "The worst cancer available currently is this bot xd"
        // John, give me some cancer types, you fucking whore
      ];
      var cancer = cancers[Math.floor(Math.random() * cancers.length)];
      message.channel.createMessage(cancer);
    }

    if(args[0].toLowerCase() == secrets[3]) {
      message.channel.createMessage("http://www.mediafire.com/file/332e2del1jluw3f/reee-xd.zip");
    }

    if(args[0].toLowerCase() == secrets[4]) {
      message.channel.createMessage("Hey, I'm a money-hungry whore, so give me your fucking money, bitch. I need that shit--like, right now. Make sure to give me BTC, PayPal me, Patreon, GoFundMe for my business Edab INC., also check out my KickStarter for my feature length film.\n\nBut actually, please help by donating. I'm dying out here.\nhttps://www.paypal.me/edanea");
    }

    if(args[0].toLowerCase() == secrets[5]) {
      return message.channel.createMessage("Did y'all know that Edab INC. is now partnering YouTube channels? That's right, and our first completely real partner is `mapierce197026`. A great Fortnite YouTuber; the game which the Edab INC. CLO, Joshua Z. C., called `the most amazing gaming experience in the entire length of gaming history.`\n\nHere's the channel: https://www.youtube.com/channel/UC9xZtAEHjMU-uwzGxrSmjdQ\nMake sure to tell 'em Edan sent y'.");
    }
  } catch (e) {
    throw c.red(e.stack);
    message.channel.createMessage(`\`\`\`${e}\`\`\``);
  }
};

exports.info = {
  usage: ")secrets [args]",
  args: "[answer / none]",
  description: "Just some secret commands, y'know."
};
