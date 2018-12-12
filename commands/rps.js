/**
* Just some simple rock paper scissors.
* @param {string} args What you will be using -- ie "rock," "paper," or "scissors."
* @returns {string} The result of the game.
*/
var rps;
exports.run = function(message, args) {
  var replies;

  var baseReplies = {
    draw: `<@${message.author.id}>, damn, y'all both picked the same god damn thing. swmh -- stop being so shit.`,
    rockWin: `<@${message.author.id}>, damn, finally. The bot picked scissors, so you win, I guess.`,
    paperLose: `<@${message.author.id}>, you just got fucked up by a pair of safety scissors--y'know, the ones kindergarteners use becasue they're fucking retarded. Literal garbage.`,
    paperWin: `Damn, <@${message.author.id}>, you sure did show that bitch-ass rock. You straight up just covered him and shit, fucking savage.`,
    scissorsLose: `<@${message.author.id}>, shit, nigga. You just got fucking smashed by a rock, my guy.`,
    scissorsWin: `<@${message.author.id}>, hell yeah. You sliced up that fucking bitch ass paper like it was nothing. Good on ya'.`
  };

  var censoredReplies = {
    draw: `<@${message.author.id}>, the bot reveals its choice--you're jiggered when you see it's exactly the same as yours. The bot may have gotten away this time, but it will not prevail the next.`,
    rockWin: `<@${message.author.id}>, the bot picked scissors, so you've won, wonderful job.`,
    paperLose: `<@${message.author.id}>, oh no, you just got sliced up like the little fu… Hecc, I forgot this was the censored reply. But you lost.`,
    paperWin: `<@${message.author.id}>, good going, you sure did do a good job putting that paper on that rock. I'm proud of you.`,
    scissorsLose: `You picked scissors, thinking nothing more of it--it was but a choice on a poorly designed Rock Paper Scissors game, on a badly developed bot. After you chose your move, the bot chose its own; finally revealing you'd lost. As this was told to, you broke down--the rock which had metaphorically smashed your virtual scissors, in some ways, had smashed you as well. It took all of your hope, all of your dreams--pretty much everything you had, and everything you wanted in one swift motion.`,
    scissorsWin: `Good job, you sliced up my son. How dare you?`
  };

  guilds[message.channel.guild.id].censor == true ? replies = censoredReplies : replies = baseReplies;

  try {
    if(!args[0]) return message.channel.createMessage(`<@${message.author.id}>~otosan, if you wanna play rock paper scissors, you've gotta give me an argument of what you want to play as.`)

    args[0] = args[0].toLowerCase();
    if(args[0] !== "rock" && args[0] !== "r" && args[0] !== "paper" && !args[0] !== "p" && !args[0] !== "scissors" && !args[0] == "s") return message.channel.createMessage(`<@${message.author.id}>, invalid answer.`);

    var answer;
    if(args[0] == "rock" || args[0] == "r") answer = "rock";
    else if(args[0]== "paper" || args[0] == "p") answer = "paper";
    else if(args[0] == "scissors" || args[0] == "s") answer = "scissors";

    var choices = ["rock", "paper", "scissors"];
    var choice = choices[Math.floor(Math.random() * choices.length)];

    if(choice == answer) {
      return message.channel.createMessage(replies.draw);
    } else if(answer == "rock") {
      if(choice == "paper") return message.channel.createMessage(`<@${message.author.id}>, wowoowwoowwowowowowoowowowow\nThe bot won with paper, you garbage.`);
      else if(choice == "scissors") return message.channel.createMessage(replies.rockWin);
    } else if(answer == "paper") {
      if(choice == "scissors") return message.channel.createMessage(replies.paperLose);
      else if(choice == "rock") return message.channel.createMessage(replies.paperWin);
    } else if(answer == "scissors") {
      if(choice == "rock") return message.channel.createMessage(replies.scissorsLose);
      else if(choice == "paper") return message.channel.createMessage(replies.scissorsWin);
    }
  } catch (e) {
    message.channel.createMessage(`Whoopsies!\`\`\`${e}\`\`\``);
    throw e;
  }
};

exports.info = {
  usage: ")rps [args]",
  args: "Either rock, paper, or scissors.",
  description: "It's just some rock paper scissors, my guy."
};
