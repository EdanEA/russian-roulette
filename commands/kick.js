/**
* Allows an admin or moderator of a server to kick a guild member.
* @param {string} u Mention of said guild member
& @param {string} [r = null] The reason for the the kick.
*/

exports.run = function(message, args) {
  var replies;

  var baseReplies = {
    noMention: `<@${message.author.id}>, how do you expect me to kick a nigger, if you don't @ said nigger, nigger?`,
    atSelf: `hahahahahahah, fuck off, actually.`,
    botCannotBan: `<@${message.author.id}>, why don't you move me higher in the hierarchy if you wanna boot some niggas, eh?`
  };

  var censoredReplies = {
    noMention: `<@${message.author.id}>, my son. How am I supposed to kick an individual if you do not mention them? Do you want me to suffer?`,
    atSelf: `LOL\nOK\nGET OUT`,
    botCannotBan: `<@${message.author.id}>, nahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh, I can't even kick that freaking nerd, my guy.`
  };

  guilds[message.channel.guild.id].censor == true ? replies = censoredReplies : replies = baseReplies;

  var cm = perms.checkMod(message);
  if(cm === false) return message.channel.createMessage(`<@${message.author.id}>, no >:(((((`);

  var u = message.mentions;
  if(!u[0]) return message.channel.createMessage(replies.noMention);
  if(u[0].id === message.author.id) return message.channel.createMessage(replies.atSelf);

  var c = perms.compare(message.member, message.channel.guild.members.get(u[0].id));
  if(c === false) return message.channel.createMessage(`<@${message.author.id}>, D\`::::`);

  var cb = perms.compare(message.channel.guild.members.get(client.user.id), message.channel.guild.members.get(u[0].id));
  if(cb === false) return message.channel.createMessage(replies.botCannotBan);

  var r = message.content.split(u[0]).slice(1);
  if(!r) r = null;
  else r = `${r} - this user was kicked by ${message.author.username}`;

  try {
    client.kickGuildMember(message.channel.guild.id, u[0].id, 1, r).then(() => {
      client.createMessage(message.channel.id, {embed: {
        description: `${message.author.username}#${message.author.discriminator} kicked ${u[0].username}#${u[0].discriminator}`,
        color: 0xADFF2F,
        fields: [
          {
            name: "Reason:",
            value: `\`\`\`${r}\`\`\``
          }
        ]
      }});
    });
  } catch (e) {
    message.channel.createMessage(`Uh-oh, something went wrong there\`\`\`${r}\`\`\``);
    throw e;
  }
};

exports.info = {
  usage: ")kick [args]",
  args: "[@user]",
  description: "Kick someone if they're being a little annoying bitch."
};
