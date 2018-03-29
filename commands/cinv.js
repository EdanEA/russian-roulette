/**
* Creates an invite to any server the bot is in remotely.
* @param {string} args The guild's id, or the guild's name
* @return {string} The invite to the given guild
*/

exports.run = function(message, args) {
  for(var i = 0; i < Object.keys(admins).length + 1; i++) {
    if(message.author.id === owner.id) break;
    else if(message.author.id === Object.values(admins)[i]) break;
    else if(i === (Object.keys(admins).length + 1) - 1 && message.author.id !== owner.id && message.author.id !== Object.values(admins)[i]) return message.channel.createMessage("eat me");
    else continue;
  }

  if(!args[0]) return message.channel.createMessage(`<@${message.author.id}>, gotta give me a guild id or a guild name, my guy.`);

  var g;
  var gid = client.guilds.get(args[0]);

  if(!gid) args = args.join(' ');
  var gname = client.guilds.find(g => g.name == args);

  if(!gid && !gname) return message.channel.createMessage(`<@${message.author.id}>, I cannot find that guild.`);
  gid ? g = gid : g = gname;

  if(!g.defaultChannel.permissionsOf(client.user.id).has("createInstantInvite")) return message.channel.createMessage(`<@${message.author.id}>, I cannot make invites for that guild.`);

  g.defaultChannel.createInvite({maxAge : 0}).then(i => {
    return message.channel.createMessage(`https://discord.gg/${i.code}`);
  });
};

exports.info = {
  usage: ")cinv [args]",
  args: "A guild's id, or the name of a guild",
  description: "Lets the bot's staff create an invite to a guild remotely."
};
