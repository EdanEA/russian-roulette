/**
* Gives some info on the current guild.
*/
var guild;
exports.run = function(message, args) {
  function makeEmbed(id, type=null) {
    var e, roles = "", staffCount = 0, onlineMembers = 0, botCount = 0, memberCount = 0;

    var i = 0;
    client.guilds.get(id).roles.forEach(r => {
      if((i + 2) == client.guilds.get(id).roles.size)roles += `\`${r.name}\` `;
      else if((i + 1) !== client.guilds.get(id).roles.size) roles += `\`${r.name}\`, `;
      else roles += `and \`${r.name}\``;
      i++;
    });

    client.guilds.get(id).members.forEach(m => {
      if(m.bot == false) {
        if(m.guild.defaultChannel.permissionsOf(m.id).has('administrator') || m.guild.defaultChannel.permissionsOf(m.id).has('manageMessages') || m.id == m.guild.ownerID) staffCount++;
        if(m.status !== 'offline') onlineMembers++;
      } else {
        if(m.bot) botCount++;
      }
    });

    var owner = client.guilds.get(id).ownerID;
    var create = moment(client.guilds.get(id).createdAt).format("MMM Do YYYY hh:mm:ss a");
    memberCount = client.guilds.get(id).memberCount - botCount;
    if(roles.length > 1024 && type !== "staff") roles = "There's too many roles, please get rid of some--too many and it just becomes cancerous.";
    else if(roles.length > 1024 && type == "staff") roles = "There's too many roles in that server, buddy-boi.";

    e = {
      author: { name: `${client.guilds.get(id).name} (${id})`, icon_url: client.guilds.get(id).iconURL },
      fields: [
        { name: "Creation Date", value: `\`${create}\``, inline: true },
        { name: "Guild Region", value: `\`${client.guilds.get(id).region}\``, inline: true },
        { name: "Owner Info", value: `Tag: \`${client.users.get(owner).username}#${client.users.get(owner).discriminator}\`\nID: \`${owner}\``, inline: true },
        { name: "Member Info", value: `Members: \`${memberCount.toString()} (${onlineMembers} online)\`\nBot Count: \`${botCount}\`\nStaff Count: \`${staffCount}\``, inline: true },
        { name: "Roles", value: roles }
      ],
      color: 0xff0000,
      thumbnail: { url: client.guilds.get(id).iconURL }
    }

    return e;
  };

  if(!args[0]) {
    var e = makeEmbed(message.channel.guild.id);
    message.channel.createMessage({embed: e});
  } else if(client.guilds.get(args[0]) || client.guilds.find(g => g.name.toLowerCase() == args.join(' ').toLowerCase() || g.name.toLowerCase().includes(args.join(' ').toLowerCase()))) {
    for(var i = 0; i < Object.keys(admins).length + 1; i++) {
      if(message.author.id === owner.id) break;
      else if(message.author.id === Object.values(admins)[i]) break;
      else if(i === (Object.keys(admins).length + 1) - 1 && message.author.id !== owner.id && message.author.id !== Object.values(admins)[i]) return message.channel.createMessage("eat me");
      else continue;
    }

    if(client.guilds.get(args[0])) {
      var e = makeEmbed(client.guilds.get(args[0]).id, "staff");
      message.channel.createMessage({embed: e});
    } else {
      var e = makeEmbed(client.guilds.find(g => g.name.toLowerCase() === args.join(' ').toLowerCase() || g.name.toLowerCase().includes(args.join(' ').toLowerCase())).id, "staff");
      message.channel.createMessage({embed: e});
    }
  } else {
    return message.channel.createMessage(`<@${message.author.id}>, damn, you broke it. How could you, you filthy degenerate?`);
  }
};

exports.info = {
  usage: ")guild [args]",
  args: "None, or if you're a staff member a guild ID or name",
  description: "Gives info on the current guild"
};
