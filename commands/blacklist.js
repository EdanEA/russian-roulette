/**
* Blcklists a user from using the bot's commands.
* @param {string} args A user's client id
* @return {void} Nothing
*/

exports.run = function(message, args) {
  if(message.author.id !== owner.id && message.author.id !== admins.josh && message.author.id !== admins.john && message.author.id !== admins.hunter) return message.channel.createMessage({content: "Succ me, faggeroni.", tts: true});

  if(!args) return;
  if(!client.users.get(args[0]) && args[0] !== "remove") return;

  if(client.users.get(args[0])) {
    blacklist[args[0]] = true;
    var u = client.users.get(args[0]);
  } else if(args[0] == "remove" && client.users.get(args[1])) {
    blacklist[args[1]] = false;
    var u = client.users.get(args[1]);
  } else return;

  if(args[0] == "remove") {
    message.channel.createMessage(`Successfully removed ${u.username}#${u.discriminator} (${u.id}) from the blacklist.`)
    client.createMessage(bot.logs, `Removed ${u.username}#${u.discriminator} (${u.id}) from the blacklist, done by ${message.author.username}#${message.author.discriminator}.`);
  } else {
    message.channel.createMessage(`Successfully blacklisted ${u.username}#${u.discriminator} (${u.id}).`);
    client.createMessage(bot.logs, `Blacklisted ${u.username}#${u.discriminator} (${u.id}), done by ${message.author.username}#${message.author.discriminator}.`);
  }
  return;
};

exports.info = {
  usage: ")blacklist [args]",
  args: "[user id or remove and a user id]",
  description: "Lets the owner and/or an admin of the bot blacklist a user from using the bot's commands."
};
