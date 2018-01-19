module.exports = {
  checkAdmin(message) {
    try {
      if(message.member.id === message.member.guild.ownerID) return true;
      else if(!message.member.roles[0]) return false;
      else if(!message.channel.memberHasPermission(message.author.id, "Administrator") && !message.channel.memberHasPermission(message.author.id, "banMembers")) return false;
      else return true;
    } catch (e) {
      throw e;
    }
  },

  compare(m1, m2) {
    if(m1.id === m1.guild.ownerID) return true;
    else if(m2.id === m2.guild.ownerID) return false;
    else if(!m1.roles[0]) return false;
    else if(!m2.roles[0]) return true;
    else return true;
  },

  checkMod(message) {
    try {
      if(message.member.id === message.member.guild.ownerID) return true;
      else if(!message.member.roles[0]) return false;
      else if(!message.channel.memberHasPermission(message.author.id, "Administrator") && !message.channel.memberHasPermission(message.author.id, "kickMembers") && !message.channel.memberHasPermissions(message.author.id, "manageMessages")) return false;
      else return true;
    } catch(e) {
      throw e;
    }
  },

  checkBotAdmin(message) {
    if(!message.channel.memberHasPermission(client.user.id, "Administrator") && !message.channel.memberHasPermission(client.user.id, "banMembers")) return false;
    else return true;
  }
};
