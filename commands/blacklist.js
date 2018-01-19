/**
* Blacklists a user from using the bot's commands.
* @param {string} args A user's client id
* @return {void} Nothing
*/

exports.run = function(message, args) {
  if(message.author.id !== owner.id && message.author.id !== admins.josh && message.author.id !== admins.john && message.author.id !== admins.hunter) return message.channel.createMessage({content: "Succ me, faggeroni.", tts: true});

  if(!args) return;
  if(!client.users.get(args[0])) return;

  var u = client.users.get(args[0]);

  blacklist[args[0]] = true;

  message.channel.createMessage(`Successfully blacklisted ${u.username}#${u.discriminator} (${u.id}).`);
  client.createMessage("360539644816785430", `Blacklisted ${u.username}#${u.discriminator} (${u.id}), done by ${message.author.username}#${message.author.discriminator}.`);
  return;
};

exports.info = {
  usage: ")blacklist [args]",
  args: "[user id]",
  description: "Lets the owner and/or an admin of the bot blacklist a user from using the bot's commands."
};
