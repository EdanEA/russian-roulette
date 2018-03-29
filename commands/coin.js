
/**
* Shitty coin command - lets you guess what side of a coin will land on.
* @param {string} args Your pick of what side it will land on.
*/

exports.run = function(message, args) {
  try {
    var sides = [ "heads", "tails" ];
    var side = sides[Math.floor(Math.random() * sides.length)];
    var answer = args[0];
    var c = "";


    if(!args[0]) return message.channel.createMessage("gotta leave what you think it will be, dad.");
    if(!args[0].toLowerCase().includes("heads") && !args[0].toLowerCase().includes("tails")) return message.channel.createMessage("gotta leave an answer for which side you think it'll be on, my guy.");
    else var c = answer;

    var replies;

    var baseReplies = {
      win: `wowowowowowowoow, it landed on ${side} and you got it right, you fucking whore.`,
      lose: `damn, bro, you guessed ${c}, but it landed on ${side}, you're actual fucking garbage.`
    };

    var censoredReplies = {
      win: `Wow, great job. It landed on ${side} and you won. This must be the highlight of your day -- winning a virtual coin toss.`,
      lose: `Oh no! You guessed ${c}, but it landed on ${side}. How will you go on?`
    };

    guilds[message.channel.guild.id].censor == true ? replies = censoredReplies : replies = baseReplies;

    message.channel.createMessage(`<@${message.author.id}>, the coin is flipped into the air.`).then(m => {
      if(side === c) {
        setTimeout(() => {
          m.edit(replies.win);
        }, 2000);
      } else {
        setTimeout(() => {
          m.edit(replies.lose);
        }, 2000);
      }
    });
  } catch (e) {
    message.channel.createMessage(`Uh-oh, something went wrong there.\`\`\`${e}\`\`\``);
    throw e;
  }
};

exports.info = {
  usage: ")coin [args]",
  args: "[heads or tails]",
  description: "Too much of pussy to play Russian Roullete? Flip a coin for the hell of it."
};
