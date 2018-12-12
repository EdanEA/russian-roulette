const DBL = require('dblapi.js');
global.Eris = require('eris');
require("eris-additions")(Eris, { disabled: ["Channel.sendMessage", "Channel.sendCode", "Eris.Embed"] })
global.sql = require('sqlite');
global.fs = require('fs');
global.c = require('chalk');
global.moment = require('moment');
global.snek = require('snekfetch');
require('moment-duration-format');

global.k = require('./storage/secret-spoons.json');
global.perms = require('./util/permissions.js');
global.misc = require('./util/misc.js');
global.guilds = require('./storage/guilds.json');
global.blacklist = require('./storage/blacklist.json');
global.rolesave = require('./storage/rolesave.json');
global.users = require('./storage/users.json');
global.dailyHours = 24;
global.prefixes = require('./storage/prefixes.json');
require('./util/guild.js');

global.client = new Eris.Client(k.bot.token, { connectionTimeout: 60000, maxShards: 3 });
const dbl = new DBL(k.keys.dblt);

global.admins = {};
global.owner = { "id":"221740788462256138" };
global.bot = { "id": "305602159741763585", "logs":"382001924251320322", "suggestchannel":"382001960984772609", "testingserver":"312667247808217088", "officialserver":"380310916341956610", "prefix":")" };

sql.open('./storage/stats.sqlite');

process.on('uncaughtException', e => {
  console.log(`Caught exception: ${e.stack}`);
});

process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled rejection at: ${p} reason: ${reason}`);
});

process.on('exit', (code) => {
  console.log(`Exited with code ${code}`);
});

client.on("error", (e, id) => {
  console.log(`Error at ${id}:\n${e}`);
});

client.on("warn", (e, id) => {
  console.log(`Warning at ${id}:\n${e}`);
});

client.on("ready", async () => {
  console.log(c.blue(`Shit bot's online.\nServer Amount: ${client.guilds.size}`));
  misc.status();

  if(client.user.id == bot.id) {
    client.guilds.get(bot.officialserver).members.forEach(m => {
      if(m.id == owner.id) null;
      else if(m.roles.includes('380311635954499584') || m.roles.includes('380311579289321472') || m.roles.includes('407694807591550977') || m.roles.includes('458083280743301121')) admins[m.username.toLowerCase()] = m.id;
    });
  }

  var g = await client.guilds.forEach(g => {
    if(!guilds[g.id]) guilds[g.id] = { censor: true, fpInvite: true, banPlay: true, roleSaveActive: false, tot: false };
    if(!prefixes[g.id]) prefixes[g.id] = ")";
  });

  sql.run('CREATE TABLE IF NOT EXISTS players (userID, plays, wins, loses, rubles)');

  if(client.user.id !== bot.id) return;
  var db_post = await snek.post(`https://discord.bots.gg/api/v1/bots/${client.user.id}/stats`, {headers: {Authorization: k.keys.dbots}}).send({guildCount: client.guilds.size, shardId: 0, shardCount: client.shards.size}).end(() => { console.log(`Successfully sent server amount to discord.bots.gg.`) });
  var bfd_post = await snek.post(`https://botsfordiscord.com/api/bot/${client.user.id}`).set('Authorization', k.keys.bfd).send({server_count: client.guilds.size}).end(() => { console.log(`Successfully posted server amount to https://botsfordiscord.com`) });
  var dbl_post = await dbl.postStats(client.guilds.size, 0, client.shards.size);
});

client.on("guildCreate", async (g) => {
  var botCount = function() { var bots = 0; g.members.forEach(m => {if(m.bot) bots += 1;}); return bots;};
  console.log(`I've joined ${g.name}, has ${botCount()} bots, ${g.memberCount - botCount()} users.\n${client.guilds.size} servers.`);
  client.createMessage(bot.logs, `I've joined \`${g.name} (${g.id})\`, has ${botCount()} bots, ${g.memberCount-botCount()} members.\n${client.guilds.size} servers.`);
  g.defaultChannel.createMessage(`\`\`\`Hey, I'm Russian roulette. I know, it's a shitty name; blame the developer.\n\nI'm just a bot, mainly used to play Russian roulette, but I also have some other commands that revolve around fun, moderation, and a lot more's coming. Currently, we're having a Halloween event, and if you want to participate, you can do ")tot open," to let random people join your server to Trick or Treat. To see my commands, use ")help."\n\nWe're always looking for new feautures, so if you have an idea use the ")suggest" command, also, if you want to change how I work (to a point), use ")config." You could also join the Discord server: https://discord.me/xdd. I mean... only if you want. D:\`\`\``);

  if(!guilds[g.id]) guilds[g.id] = { censor: true, fpInvite: true, banPlay: true, roleSaveActive: false, tot: false };
  if(!prefixes[g.id]) prefixes[g.id] = ")";

  if(client.user.id !== bot.id) return;
  var db_post = await snek.post(`https://discord.bots.gg/api/v1/bots/${client.user.id}/stats`, {headers: {Authorization: k.keys.dbots}}).send({guildCount: client.guilds.size, shardId: 0, shardCount: client.shards.size}).end(() => { console.log(`Successfully sent server amount to discord.bots.gg.`) });
  var bfd_post = await snek.post(`https://botsfordiscord.com/api/bot/${client.user.id}`).set('Authorization', k.keys.bfd).send({server_count: client.guilds.size}).end(() => { console.log(`Successfully posted server amount to https://botsfordiscord.com`) });
  var dbl_post = await dbl.postStats(client.guilds.size, 0, client.shards.size);
});

client.on('guildDelete', async (guild) => {
  console.log(c.gray(`I've left ${guild.name}. Server amount: ${client.guilds.size}`));
  guilds[guild.id].roleSaveActive = false;
  rolesave[guild.id] = [];
  client.guilds.get(bot.officialserver).channels.get(bot.logs).createMessage(`I've left ${guild.name}. Server amount: ${client.guilds.size}.`);

  if(client.user.id !== bot.id) return;
  var db_post = await snek.post(`https://discord.bots.gg/api/v1/bots/${client.user.id}/stats`, {headers: {Authorization: k.keys.dbots}}).send({guildCount: client.guilds.size, shardId: 0, shardCount: client.shards.size}).end(() => { console.log(`Successfully sent server amount to discord.bots.gg.`) });
  var bfd_post = await snek.post(`https://botsfordiscord.com/api/bot/${client.user.id}`).set('Authorization', k.keys.bfd).send({server_count: client.guilds.size}).end(() => { console.log(`Successfully posted server amount to https://botsfordiscord.com`) });
  var dbl_post = await dbl.postStats(client.guilds.size, 0, client.shards.size);
});

client.on('guildMemberAdd', (guild, member) => {
  if(guilds[guild.id].roleSaveActive == true) {
    rolesave[guild.id].forEach(m => {
      if(member.id == m.id) {
        for(var i = 0; i < m.roles.length; i++) {
          member.addRole(m.roles[i]);
        }
      }
    });
  }
});

client.on("messageCreate", (message) => {
  if(!guilds[message.channel.guild.id]) guilds[message.channel.guild.id] = { censor: true, fpInvite: true, banPlay: true, roleSaveActive: false, tot: false };

  var prefix;
  if(!message.content.startsWith(prefixes[message.channel.guild.id]) && !message.content.startsWith(bot.prefix)) return;

  if(message.author == client.user) return;
  if(!message.channel.guild) return;
  if(message.author.bot) return;
  if(blacklist[message.author.id] && blacklist[message.author.id] == true) return message.channel.createMessage(`<@${message.author.id}>, fuck you, bud`);

  if(message.content.startsWith(prefixes[message.channel.guild.id])) var prefix = prefixes[message.channel.guild.id];
  else var prefix = bot.prefix;

  let cmd = message.content.slice(prefix.length).toLowerCase().split(' ')[0];
  let args = message.content.split(' ').slice(1);

  try {
    require(`./commands/${cmd}`).run(message, args);
  } catch (e) {
    if(e.message.includes('Cannot find module') || e.message.includes('ENOENT')) return;
    console.log(c.red(e.stack));

    if(e.length > 2000) return;
    message.channel.createMessage(`\`\`\`${e}\`\`\``);
  }
});

setInterval(misc.status, 1800000);
setInterval(misc.backup, 86400000);

var users = require('./storage/users.json');
setInterval(async () => {
  if(new Date().getHours == 0 || dailyHours == 0) {
    dailyHours = 24;

    var dx = await Object.values(users).forEach(u => {
      u.dailyToday = false;
    });
  } else {
    dailyHours -= 1;
  }
}, 3600000);

client.connect();
// I don't wanna do this anymore
