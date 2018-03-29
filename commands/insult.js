/**
* Insults someone.
* @param {string} args Either the mention of a user, or the name of someone -- or something.
* @return {string} The insult.
*/

exports.run = function(message, args) {
  if(!args[0]) return message.channel.createMessage(`<@${message.author.id}>, come on, my friend of an African ethnicity, gotta give me those sweet function arguments.`);

  var insults;
  guilds[message.channel.guild.id].censor == true ? insults = require('../secret-spoons.json').censoredInsults : insults = require('../secret-spoons.json').insults;

  var u = message.mentions;
  var insult = insults[Math.floor(Math.random() * insults.length)];

  if(!u[0]) {
    if(!args[0]) u = `<@${message.author.id}>`
    else u = args.join(' ');

    insult = insult.replace("{person}", u)

    if(insult.includes("{author}")) insult = insult.replace("{author}", `<@${message.author.id}>`);
    else null;

    message.channel.createMessage(insult);
  } else {
    insult = insult.replace("{person}", `<@${u[0].id}>`)

    if(insult.includes("{author}")) insult = insult.replace("{author}", `<@${message.author.id}>`);
    else null;

    message.channel.createMessage(insult);
  }
};

exports.info = {
  usage: ")insult [args]",
  args: "Mention a user, or just a name.",
  description: "Have you ever wanted to insult someone, but you just don't have a good insult? Well, here's a command to fix that very specific issue, I guess."
};
