/**
* Gives info on a user.
* @param {string} [u = null] Checks if you want to check a specific user, or yourself.
* @return {string} Return info with a range of information for the user given.
*/
var info;
exports.run = function(message, args) {
  var u = message.mentions;

  function makeEmbed(id=null, name=null) {
    var mod = false;
    var admin = false;
    var roles = "";

    var user;
    !id ? user = client.users.find(u => u.username.toLowerCase() == name.toLowerCase()) : user = client.users.get(id);
    if(!user) return false;

    var creation = moment(user.createdAt).format("MMM Do YYYY, h:mm:ss a");
    var join = moment(message.channel.guild.members.get(user.id).joinedAt).format("MMM Do YYYY, h:mm:ss a");

    if(message.channel.permissionsOf(user.id).has("kickMembers") && !message.channel.permissionsOf(user.id).has("banMembers")) mod = true;
    else if(message.channel.permissionsOf(user.id).has("banMembers") && !message.channel.permissionsOf(user.id).has("kickMembers")) admin = true;
    else if(message.channel.permissionsOf(user.id).has("administrator" || message.channel.guild.ownerID == user.id) || message.channel.guild.ownerID == user.id) admin = true;

    if(!message.channel.guild.members.get(user.id).roles[0]) roles += "`@everyone`";
    for(var i = 0; i < message.channel.guild.members.get(user.id).roles.length; i++) {
      var role = `\`${message.channel.guild.roles.get(message.channel.guild.members.get(user.id).roles[i]).name}\``
      roles += role + "\n"
    }

    if(roles.length > 1024) roles = "There's too many roles, please get rid of some -- too many and you're just making an ass of yourself.";

    var embed = {
      author: { name: `${user.username}#${user.discriminator} (${user.id})`, icon_url: user.avatarURL },
      fields: [
        {
          name: "Account Creation Date",
          value: creation,
          inline: true
        },
        {
          name: "Join Date",
          value: join,
          inline: true
        },
        {
          name: "Staff Status",
          value: `• Moderator: ${mod}\n• Administrator: ${admin}`,
          inline: true
        },
        {
          name: "Roles",
          value: roles,
          inline: true
        }
      ],
      thumbnail: { url: client.users.get(user.id).avatarURL },
      color: 0xff0000
    };

    return embed;
  }

  if(u[0]) {
    var e = makeEmbed(u[0].id);
    if(e == false) return message.channel.createMessage(`Whoopsies! I can't find that boi-o, boi-o.`);
    return message.channel.createMessage({embed: e});
  }

  else if(!u[0] && !args[0]) {
    var e = makeEmbed(message.author.id);
    if(e == false) return message.channel.createMessage(`Whoopsies! I can't find that boi-o, boi-o.`);
    return message.channel.createMessage({embed: e});
  }

  else if(!u[0] && args[0]) {
    var name = args.join(' ');
    var e = makeEmbed(null, name);
    if(e == false) return message.channel.createMessage(`Whoopsies! I can't find that boi-o, boi-o.`)
    return message.channel.createMessage({embed: e});
  }

  else {
    var reply;
    guilds[message.channel.guild.id].censor == true ? reply = "I can't get that user." : reply = "Damn, my guy, what the hell did you do? Somehow you broke this shit command. God fucking damn it--y'know, this is why we can't have nice things, you just gotta fuck up every little shitty thing, don't ya?.";
    return message.channel.createMessage(reply);
  }
};

exports.info = {
  usage: ")info [args]",
  args: "A mention of a user, an ID, or a name."
};
