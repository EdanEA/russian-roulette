/**
* Allows an admin to ban a guild member.
* @param {string} u The mention of a guild member.
* @param {string} [r = undefined] The reason for the ban.
*/

exports.run = function(message, args) {
  var replies;

  var baseReplies = {
    noAdmin: `<@${message.author.id}>, eat me out, cuck boi.`,
    atSelf: `hey, man, I can ban you on the dl, but I'm gonna need that succy-fuccy first, bitch.`,
    userCannotBan: `<@${message.author.id}>, you can't ban this faggot, faggot.`,
    botCannotBan: `<@${message.author.id}>, why don't you move me higher in the hierarchy if you wanna ban some niggas, eh?`
  };

  var censoredReplies = {
    noAdmin: `<@${message.author.id}>, can't use this one, daddy.`,
    atSelf: `You can just use \`)play\` if you wanna ban yourself, freaking hecker.`,
    userCannotBan: `<@${message.author.id}>, ya' can't ban this nerd, nerd.`,
    botCannotBan: `<@${message.author.id}>, you wanna be able to ban ni:b::b:as with me, eh? Why don't you move my gosh darn role up higher in the hierarchy then, boi-o?`
  };

  guilds[message.channel.guild.id].censor == true ? replies = censoredReplies : replies = baseReplies;

  var ca = perms.checkAdmin(message);
  if(ca === false) return message.channel.createMessage(replies.noAdmin)

  var u = message.mentions;
  if(!u[0]) return message.channel.createMessage(`<@${message.author.id}>, gotta @ someone to ban them, buddy-boi.`);
  if(u[0].id === message.author.id) return message.channel.createMessage(replies.atSelf);

  var c = perms.compare(message.member, message.channel.guild.members.get(u[0].id));
  if(c === false) return message.channel.createMessage(replies.userCannotBan);

  var cb = perms.compare(message.channel.guild.members.get(client.user.id), message.channel.guild.members.get(u[0].id));
  if(cb === false) return message.channel.createMessage(replies.botCannotBan);

  var r = message.content.split(u[0]).slice(1);
  if(!r) var r;
  else r = `${r} - this user was banned by ${message.author.username}`;

  try {
    client.banGuildMember(message.channel.guild.id, u[0].id, 1, r).then(() => {
      client.createMessage(message.channel.id, {embed: {
        description: `${u[0].username}#${u[0].discriminator} was banned by ${message.author.username}#${message.author.discriminator}`,
        color: 0xE30B5D,
        fields: [
          {
            name: "Reason for ban:",
            value: `\`\`\`${r}\`\`\``
          }
        ]
      }});
    });
  } catch (e) {
    message.channel.createMessage(`Uh-oh, something went wrong whilst banning.\`\`\`${e}\`\`\``)
    throw e;
  }
};

exports.info = {
  usage: ")ban [args]",
  args: "[@user]",
  description: "Ban some people, maybe ban John--he's a real bitch like 60% of the time, it'd be better off without him."
};
