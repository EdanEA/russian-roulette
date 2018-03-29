/**
* Blcklists a user from using the bot's commands.
* @param {string} args A user's client id
* @return {void} Nothing
*/

exports.run = function(message, args) {
  for(var i = 0; i < Object.keys(admins).length + 1; i++) {
    if(message.author.id === owner.id) break;
    else if(message.author.id === Object.values(admins)[i]) break;
    else if(i === (Object.keys(admins).length + 1) - 1 && message.author.id !== owner.id && message.author.id !== Object.values(admins)[i]) return message.channel.createMessage("eat me");
    else continue;
  }

  if(!args) return;
  if(!client.users.get(args[0]) && args[0] !== "remove") return;

  if(client.users.get(args[0])) {
    if(!users[args[0]]) users[args[0]] = false;
    if(users[args[0]].blacklist === true) return message.channel.createMessage(`<@${message.author.id}>, hey, dad. Sorry to be that guy, but this fag's already blacklisted. So fuck off, you cunt.`);
    else users[args[0]].blacklist = true;
    var u = client.users.get(args[0]);
  } else if(args[0] == "remove" && client.users.get(args[1])) {
    if(!users[args[1]]) users[args[1]] = false;
    if(users[args[1]].blacklist === false) return message.channel.createMessage(`<@${message.author.id}>, this ni:b::b:a's (xd) not blacklisted.`);
    else users[args[1]].blacklist = false;
    var u = client.users.get(args[1]);
  } else return;

  if(args[0] == "remove") {
    message.channel.createMessage(`Successfully removed ${u.username}#${u.discriminator} (${u.id}) from the blacklist.`);
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
