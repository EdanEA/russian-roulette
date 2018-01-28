/**
* Allows an admin or moderator of a server to kick a guild member.
* @param {string} u Mention of said guild member
& @param {string} [r = null] The reason for the the kick.
*/

exports.run = function(message, args) {
  var cm = perms.checkMod(message);
  if(cm === false) return message.channel.createMessage(`<@${message.author.id}>, no >:(((((`);

  var u = message.mentions;
  if(!u[0]) return message.channel.createMessage(`<@${message.author.id}>, how do you expect me to kick a nigger, if you don't @ said nigger, nigger?`);
  if(u[0].id === message.author.id) return message.channel.createMessage("hahahahahahah, fuck off, actually.")

  var c = perms.compare(message.member, message.channel.guild.members.get(u[0].id));
  if(c === false) return message.channel.createMessage(`<@${message.author.id}>, D\`::::`);

  var cb = perms.compare(message.channel.guild.members.get(client.user.id), message.channel.guild.members.get(u[0].id));
  if(cb === false) return message.channel.createMessage(`<@${message.author.id}>, why don't you move me higher in the hierarchy if you wanna boot some niggas, eh?`)

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
    throw e;
    message.channel.createMessage(`Uh-oh, something went wrong there\`\`\`${r}\`\`\``)
  }
};

exports.info = {
  usage: ")kick [args]",
  args: "[@user]",
  description: "Kick someone if they're being a little annoying bitch."
};
