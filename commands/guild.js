exports.run = function(message, args) {
  function makeEmbed(id) {
    var e, roles = "", staffCount = 0, onlineMembers = 0, botCount = 0;

    var i = 0;
    client.guilds.get(id).roles.forEach(r => {
      if((i + 1) !== client.guilds.get(id).roles.size) roles += `\`${r.name}\`, `;
      else roles += `\`${r.name}\``;
      i++;
    });

    client.guilds.get(id).members.forEach(m => {
      if(m.bot == false) {
        if(message.channel.permissionsOf(m.id).has('administrator') || message.channel.permissionsOf(m.id).has('banMembers') || message.channel.permissionsOf(m.id).has('kickMembers') || message.channel.permissionsOf(m.id).has('manageMessages') || message.channel.ownerID == message.author.id) staffCount++;
        if(m.status == 'online') onlineMembers++;
      } else {
        if(m.bot) botCount++;
      }
    });

    var owner = client.guilds.get(id).ownerID;
    var create = moment(client.guilds.get(id).createdAt).format("MMM Do YYYY hh:mm:ss a");
    if(roles.length > 1024) roles = "There's too many roles, please get rid of some--too many and it just becomes cancerous.";
    e = {
      author: { name: `${client.guilds.get(id).name} (${id})`, icon_url: client.guilds.get(id).iconURL },
      fields: [
        { name: "Creation Date", value: create, inline: true },
        { name: "Owner Info", value: `${client.users.get(owner).username}#${client.users.get(owner).discriminator} (${owner})`, inline: true },
        { name: "Guild Region", value: client.guilds.get(id).region, inline: true },
        { name: "Member Info", value: `Total Members: ${client.guilds.get(id).memberCount.toString()}, ${onlineMembers.toString()} online\nBot Count: ${botCount}\nStaff Count: ${staffCount}`, inline: true },
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
  }
};

exports.info = {
  usage: ")guild [args]",
  args: "None, or if you're a staff member a guild ID or name",
  description: "Gives info on the current guild"
};
