/**
* This command allows the bot to store role information, so whenever someone leaves and joins back they get their role back instantly. That is if this command is enabled.
* @param {string} args[0] This can either be "help" for some very in-depth information on what the command does, "start" to have the bot start storing roles, or "update" for it to update its stored roles.
* @param {string} check If you choose "start" for the first parameter, the bot will ask if you for sure want to enable it, and then you can decline or confirm.
* @return {string} A help embed, or a confirmation of it storing roles.
*/

exports.run = async function(message, args) {
  if(!args[0]) return message.channel.createMessage(`${guilds[message.channel.id].censor == true ? `<@${message.author.id}>, rawr, daddy, you gotta give me 'em arguments, bud.` : `<@${message.author.id}>, god damn you. I've been doing this for almost a year, and I just can't get any god damned arguments, can I?`}`);
  if(perms.checkAdmin(message) == false) return message.channel.createMessage(`<@${message.author.id}>, oh no, the baby boi can't use the big boi command! Get outta here, y'loser. smh`);

  async function getUserRoles(guild) {
    if(!guild) return null;

    var users = [];
    guild.members.forEach(m => {
      if(!m.roles[0]) null;
      else {
        var roles = [];
        for(var i = 0; i < m.roles.length; i++) {
          roles.push(m.roles[i]);
        }

        users.push({id: m.id, roles: roles});
      }
    });

    rolesave[guild.id] = users;
    guilds[guild.id].roleSaveActive = true;
    return true;
  }

  switch(args[0].toLowerCase()) {
    case "help":
      message.channel.createMessage({embed: {
        color: 0xff0000,
        fields: [
          { name: "`start` argument", value: "```)rolesave start```Doing this command will ask you to confirm you want to enable this, and if you confirm will store the data of all user's roles in the guild. Do mind this is static, meaning it will not change unless done manually." },
          { name: "`stop` argument", value: "```)rolesave stop```This, as well, will prompt for input to confirm you want to stop. If you do confirm, it will stop storing the data and no longer save the roles." },
          { name: "`update` argument", value: "```)rolesave update```If you have rolesave active, and you want to update the storage, you can just use this and it will do so." }
        ],
        title: "RoleSave Info",
        description: "The `rolesave` command is used to save the roles which users have in this guild--by default this is not enabled. Below is help on using it. By the way, I need to be higher than the roles I'll be storing if you want them to be added back when a member joins back.\nDisclaimer: By enabling the `rolesave` command, you hereby grant the bot to store data for your guild; if disabled it will no longer hold this data.",
      }});
    return;

    case "start":
      if(guilds[message.channel.guild.id].roleSaveActive == true) return message.channel.createMessage(`<@${message.author.id}>, y'already have this enabled, boi-o.`);

      message.channel.createMessage(`<@${message.author.id}>, are you sure you want to enable this? Type \`yes\` to confirm, \`no\` to decline.`);
      var check = await message.channel.awaitMessages(m => m.author.id == message.author.id && m.content.toLowerCase() == "yes" || m.content.toLowerCase() == 'no', { maxMatches: 1, time: 10000 });
      if(!check) return message.channel.createMessage(`<@${message.author.id}>, nothing or an invalid input was given.`);

      var run = await getUserRoles(message.channel.guild);
      return message.channel.createMessage(`<@${message.author.id}>, successfully saved the current roles of the server, and will now add them back to a user if they leave and join back.`);
    break;

    case "stop":
      if(guilds[message.channel.guild.id].roleSaveActive !== true) return message.channel.createMessage(`<@${message.author.id}>, you can only use this if ya already have this garbage enabled, cuckoo-boi.`)

      message.channel.createMessage(`<@${message.author.id}>, are you sure you want to disable this? Type \`yes\` to confirm, \`no\` to decline.`);
      var check = await message.channel.awaitMessages(m => m.author.id == message.author.id && m.content.toLowerCase() == "yes" || m.content.toLowerCase() == 'no', { maxMatches: 1, time: 10000 });
      if(!check) return message.channel.createMessage(`<@${message.author.id}>, nothing or an invalid input was given.`);

      guilds[message.channel.guild.id].roleSaveActive = false;
      rolesave[message.channel.guild.id] = [];
      return message.channel.createMessage(`<@${message.author.id}>, I've now stopped storing the roles of this server.`);
    break;

    case "update":
      if(guilds[message.channel.guild.id].roleSaveActive !== true) return message.channel.createMessage(`<@${message.author.id}>, nah, can't do this if you ain't got it enabled, buddd.`);

      var update = await getUserRoles(message.channel.guild);
      return message.channel.createMessage(`<@${message.author.id}>, alright, I updated them roles, boi-o.`);
    break;

    default:
      return message.channel.createMessage(`<@${message.author.id}>, smh, you don't even know the acceptable arguments for this command. Very good job, I applaud you.`);
  }
};

exports.info = {
  usage: ")rolesave [args]",
  args: "Either \"start\" or \"stop\".",
  description: "Hey, have you ever seen one of those bots that have a command that saves all the roles users have in the guild? If so, you know that they're often very confusing, and badly designed--we're trying to do that, but make it not shit. Most likely will not occur."
};
