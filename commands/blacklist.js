/**
* Blacklists a user from using the bot's commands.
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

  if(!args[0]) return message.channel.createMessage(`<@${message.author.id}>, gotta give me them arguments, padre!`);

  function updateList(id, type, channelID=bot.logs) {
    var user = client.users.get(id);
    var staffMember = client.users.get(message.author.id);
    var reply;

    type == 'add' ? (blacklist[id] = true, reply = `Added \`${user.username}#${user.discriminator} (${user.id})\` to the blacklist. Done by \`${staffMember.username}#${staffMember.discriminator}\``) : (blacklist[id] = false, reply = `Removed \`${user.username}#${user.discriminator} (${user.id})\` from the blacklist. Done by \`${staffMember.username}#${staffMember.discriminator}\``);
    client.createMessage(channelID, reply);
  }

  if(args[0] == 'remove' && client.users.get(args[1])) {
    if(!blacklist[args[1]]) return message.channel.createMessage(`<@${message.author.id}>, good job. You just tried to remove someone from the blacklist that doesn't even have an entry in the list.`);
    if(blacklist[args[1]] == false) return message.channel.createMessage(`<@${message.author.id}>, I just want to applaud you briefly, for trying to unblacklist a boy, that's not even blacklisted.`);

    updateList(args[1], 'remove');
    return message.channel.createMessage(`<@${message.author.id}>, kk, baby boi. I un-blacklisted that faggot.`);
  } else if(client.users.get(args[0])) {
    if(!blacklist[args[0]] || blacklist[args[0]] == false) {
      updateList(args[0], 'add');
      return message.channel.createMessage(`<@${message.author.id}>, alright. I blacklisted that boi-o.`);
    }
    else if(blacklist[args[0]] == true) return message.channel.createMessage(`<@${message.author.id}>, this cuck's already blacklisted, cuck.`);
  } else return message.channel.createMessage(`<@${message.author.id}>, good job, y'fuckin' broke it, you ninny.`);
};

exports.info = {
usage: ")blacklist [args]",
args: "[user id or remove and a user id]",
description: "Lets the owner and/or an admin of the bot blacklist a user from using the bot's commands."
};
