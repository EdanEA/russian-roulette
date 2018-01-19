/**
* Lets you change the prefix for your server.
& @param {string} p The prefix input.
*/

exports.run = function(message, args) {
  var ca = perms.checkAdmin(message);
  if(ca == false) return message.channel.createMessage("nah, my nigga, you can't use this.");

  var p = args[0];
  if(p >= 10) return message.channel.createMessage("that's too long, daddy, I can't fit it all. D`:");
  if(!p) return message.channel.createMessage("gotta leave me something for a new prefix, cuck.");

  var gid = message.channel.id;

  prefixes[message.channel.guild.id] = p;
  message.channel.createMessage({embed: {
    color: 0x4682B4,
    description: `New Prefix in \`${message.channel.guild.name}\``,
    fields: [{ name: "Prefix:", value: `\`\`\`${p}\`\`\`` }]
  }});
};

exports.info = {
  usage: ")prefix [args]",
  args: "[new prefix]",
  description: "Change the prefix to a better prefix, you cuck."
};
