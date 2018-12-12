/**
* Allows an admin or moderator of a server to kick a guild member.
* @param {string} u Mention or user ID of said guild member
* @param {string} [r = null] The reason for the the kick.
*/
var kick;
exports.run = function(message, args) {
  var replies;

  var baseReplies = {
    noMention: `<@${message.author.id}>, how do you expect me to kick a nigger if you don't mention, nor give said nigger's ID, nigger?`,
    atSelf: `hahahahahahah, fuck off, actually.`,
    botCannotBan: `<@${message.author.id}>, why don't you move me higher in the hierarchy if you wanna boot some fuckers, eh?`
  };

  var censoredReplies = {
    noMention: `<@${message.author.id}>, my son. How am I supposed to kick an individual if you do not provide an ID, nor a user mention? Do you want me to suffer?`,
    atSelf: `LOL\nOK\nGET OUT`,
    botCannotBan: `<@${message.author.id}>, nahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh, I can't even kick that freaking nerd, my guy.`
  };

  guilds[message.channel.guild.id].censor == true ? replies = censoredReplies : replies = baseReplies;

  var cm = perms.checkMod(message);
  if(cm === false) return message.channel.createMessage(`<@${message.author.id}>, no >:(((((`);

  var u = message.mentions;
  if(!u[0] && !client.users.get(args[0])) return message.channel.createMessage(replies.noMention);
  !client.users.get(args[0]) ? u = u[0].id : u = args[0];
  if(u == message.author.id) return message.channel.createMessage(replies.atSelf);

  var c = perms.compare(message.member, message.channel.guild.members.get(u));
  if(c === false) return message.channel.createMessage(`<@${message.author.id}>, D\`::::`);

  var cb = perms.compare(message.channel.guild.members.get(client.user.id), message.channel.guild.members.get(u));
  if(cb === false) return message.channel.createMessage(replies.botCannotBan);

  var r = message.content.split(' ').slice(2).join(' ');
  if(!r || r.length <= 1) r = `No reason was given. (kicked by ${client.users.get(message.author.id).username}#${client.users.get(message.author.id).discriminator})`;
  else r = `${r} - (kicked by ${message.author.username}#${message.author.discriminator})`;

  try {
    client.kickGuildMember(message.channel.guild.id, u, r).then(() => {
      client.createMessage(message.channel.id, {embed: {
        description: `${message.author.username}#${message.author.discriminator} kicked ${client.users.get(u).username}#${client.users.get(u).discriminator}`,
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
  args: "A user's ID or mention, followed by the reason for the kicking (reason is optional).",
  description: "Kick someone if they're being a little annoying bitch -- like Johnathan Andrew Wicker."
};
