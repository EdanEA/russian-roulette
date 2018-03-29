/**
* Lets you roll a theoretical dice with almost any number of sides you want.
* @param {integer} num The number of sides for the dice.
* @return {string} The result of "rolling" the dice.
*/

exports.run = function(message, args) {
  var num = parseInt(args[0]);
  if(!num && guilds[message.channel.guild.id].censor == false) return message.channel.createMessage(`<@${message.author.id}> reeeeeeeeeeeeeeeeeeeeeeeee, how many sides do ya' fuckin' want you cunnnnnnnnnt?`);
  else if(!num && guilds[message.channel.guild.id].censor == true) return message.channel.createMessage(`<@${message.author.id}>, gotta tell me how many sides you want on this dice, my guy. Gosh darn, this is infuriating.`)

  var sides = [];
  for(var i = 0; i < num; i++) {
    sides.push(i + 1);
  }

  sides = sides[Math.floor(Math.random() * sides.length)];
  sides % 2 == 0 ? message.channel.createMessage(`Yeet. You rolled a ${sides}. Good job, I'm proud of you.`) : message.channel.createMessage(`Yeet. You rolled a ${sides}.`);
  return sides;
};

exports.info = {
  usage: ")roll [args]",
  args: "The number of sides on a theoretical dice.",
  description: "Lets you roll a dice with as many sides as you want."
};
