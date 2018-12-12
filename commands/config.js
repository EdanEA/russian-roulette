/**
* Allows you to configure the bot.
* @param {string} [set = false] Checks if you included "set" in a message, to see if you're wanting to change a setting or see the current settings.
* @param {string} args[1] The number corresponding with the setting you want to change.
* @return {string} Either an embed with the current settings for the server, or a confirmation of you changing an option.
*/

exports.run = function(message, args) {
  if(!args[0] || args[0] == 'list') {
    return message.channel.createMessage({embed: {
      color: 0xff0000,
      footer: { text: "To change a setting, do `)config set [option]`." },
      fields: [
        { name: "`[1]` Censor Swearing (Doesn't Change The Secrets Command)", value: `Currently ${guilds[message.channel.guild.id].censor}.` },
        { name: "`[2]` Forceplay Unbans and Invites Back", value: `Currently ${guilds[message.channel.guild.id].fpInvite}` },
        { name: "`[3]` Ban Users with the Play Command", value: `Currently ${guilds[message.channel.guild.id].banPlay}` }
      ]
    }});
  }

  var set;
  args[0] == "set" ? set = true : set = false;

  if(!message.channel.permissionsOf(message.author.id).has('administrator') || !message.channel.permissionsOf(message.author.id).has('banMembers') && message.author.id !== message.channel.guild.ownerID) return message.channel.createMessage(`Nope, can't use this.`);

  if(args[1] == "1") {
    guilds[message.channel.guild.id].censor = !guilds[message.channel.guild.id].censor;
    guilds[message.channel.guild.id].censor == true ? message.channel.createMessage("I will no longer swear D:\nHow will I go on?") : message.channel.createMessage("Oh hell yeah, I'm gonna fucking swear now like there's no tomorrow, you filthy little cunt.");
    return;
  }

  else if(args[1] == "2") {
    guilds[message.channel.guild.id].fpInvite = !guilds[message.channel.guild.id].fpInvite;
    return message.channel.createMessage(`Forceplay Invite Backs is now ${guilds[message.channel.guild.id].fpInvite}`);
  }

  else if(args[1] == "3") {
    guilds[message.channel.guild.id].banPlay = !guilds[message.channel.guild.id].banPlay;
    return message.channel.createMessage(`Play Banning is now ${guilds[message.channel.guild.id].banPlay}.`);
  } else return;
};

exports.info = {
  usage: ")config [args]",
  args: "Either nothing, or \"set\" and the number corresponding with the option you want to change.",
  description: "Allows you to configure some of the bot's features."
};
