/**
* Deletes messages.
* @param {string} [u = null] The mention of a user.
* @param {integer} a The amount of messages to delete.
* @return {string} A message confirming that messages were deleted.
*/

exports.run = async function(message, args) {
  var replies;

  var baseReplies = {
    noMod: `<@${message.author.id}>, fuck you, you can't use this, puss-boi.`
  };

  var censoredReplies = {
    noMod: `<@${message.author.id}>, haha. You can't use this, as you're a lower being than myself. Now, get out of here, degenerate.`
  };

  guilds[message.channel.guild.id].censor == true ? replies = censoredReplies : replies = baseReplies;

  if(!args[0]) return message.channel.createMessage(`<@${message.author.id}>, please, just give me some command arguments. It's real simple, you just add some shit to the end of the message that correlates to the command. C'mon, it's not hard.`);
  if(!perms.checkMod(message)) return message.channel.createMessage(replies.noMod);

  var u = message.mentions;
  var amount;

  message.delete().then(async () => {
    if(!u[0]) {
      amount = parseInt(args[0]);

      var messages = await message.channel.getMessages(amount);

      var ids = [];
      messages.forEach(m => { ids.push(m.id); });

      var del = await message.channel.deleteMessages(ids);
      message.channel.createMessage(`Successfully deleted ${amount} messages in \`#${message.channel.name}\`.`).then(m => { setTimeout(() => { m.delete() }, 10000) });
    } else {
      amount = parseInt(args[1]);

      var messages = await message.channel.getMessages(amount + 1);
      messages = messages.filter(m => m.author.id === u[0].id);

      var ids = [];
      messages.forEach(m => {
        ids.push(m.id);
      });

      var del = await message.channel.deleteMessages(ids);
      message.channel.createMessage(`Successfully deleted ${amount} messages from ${u[0].username}#${u[0].discriminator}, in \`#${message.channel.name}\``).then(m => { setTimeout(() => { m.delete() }, 10000) });
    }
  });
};

exports.info = {
  usage: ")prune [args]",
  args: "Either an amount, or a user mention and an amount.",
  description: "Deletes messages from a user in a channel, or the channel itself."
};
