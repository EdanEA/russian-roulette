/**
* Allows an admin to force a guild member to play Russian roulette.
* @param {string} u Mention of said guild member
*/

exports.run = function(message, args) {
  var u = message.mentions;
  if(u[0].id === message.author.id) return message.channel.createMessage(`<@${message.author.id}>, hahaha! Fuck off, actually.`);

  var ca = perms.checkAdmin(message);
  if(ca === false) return message.channel.createMessage(`<@${message.author.id}>, nope, can't use this, bud.`);

  var cp = perms.compare(message.member, message.channel.guild.members.get(u[0].id));
  if(cp === false) return message.channel.createMessage(`<@${message.author.id}>, nope, can't use this on _them_, cuck-boi.`)

  try {
    var b = Math.floor(Math.random() * 5);
    var p = Math.floor(Math.random() * 5);

    message.channel.createMessage(`The gun is put to <@${u[0].id}>'s head.`).then((m) => {
      if(b === p) {
        setTimeout(() => {
          m.edit("*bang*").then(() => {
            setTimeout(() => {
              client.banGuildMember(message.channel.guild.id, u[0].id, 0, `${u[0].username}'s was being bitch, and got banned by ${message.author.username}.`);
              m.edit(`${u[0].username}#${u[0].discriminator} is dead, for they have recieved their comeuppance.`);

              setTimeout(() => {
                client.unbanGuildMember(message.channel.guild.id, u[0],id);
                client.getDMChannel(u[0].id).then(channel => {
                  client.guilds.get(message.channel.guild.id).defaultChannel.createInvite().then(i => {
                    return channel.createMessage(`https://discord.gg/${i.code}`);
                  });
                });
              }, 300000);
            }, 3500);
          });
        }, 3500);
      } else {
        setTimeout(() => {
          m.edit("*click*").then(() => {
            setTimeout(() => {
              return m.edit("I guess they get to live >:((((");
            }, 3500);
          });
        }, 3500);
      }
    });
  } catch (e) {
    throw c.red(e.stack);
    message.channel.createMessage(`Uh-oh, there was a fuck up, send this error to the dev, or don't -- I don't care. Check )about for info on how.\`\`\`${e}\`\`\``);
  }
};

exports.info = {
  usage: ")forceplay [args]",
  args: "[@user]",
  description: "It's like the )play command, just instead of you yourself playing, you get to force someone else to. That is if you have the correct permissions."
};
