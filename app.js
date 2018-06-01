const DBL = require('dblapi.js');
global.Eris = require('eris');
require("eris-additions")(Eris, { disabled: ["Channel.sendMessage", "Channel.sendCode", "Eris.Embed"] });
global.sql = require('sqlite');
global.fs = require('fs');
global.c = require('chalk');
global.moment = require('moment');
global.snek = require('snekfetch');
require('moment-duration-format');

global.k = require('./secret-spoons.json');
global.perms = require('./functions/permissions.js');
global.misc = require('./functions/misc.js');
global.guilds = require('./guilds.json');
global.users = require('./users.json');
global.prefixes = require('./prefixes.json');
require('./guild.js');

global.client = new Eris.Client(k.bot.token, { connectionTimeout: 60000, maxShards: 1 });
const dbl = new DBL(k.keys.dblt);
global.admins = { "josh":"117728104935456770", "john":"148958241378926593" };
global.owner = { "id":"221740788462256138" };
global.bot = { "id": "305602159741763585", "logs":"382001924251320322", "suggestchannel":"382001960984772609", "testingserver":"312667247808217088", "officialserver":"380310916341956610", "prefix":")" };

sql.open('./stats.sqlite');

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

  var g = await client.guilds.forEach(g => {
    if(!guilds[g.id]) guilds[g.id] = { censor: true, fpInvite: true, banPlay: true, roleSaveActive: false, roleSave: [] };
    if(!prefixes[g.id]) prefixes[g.id] = ")";
  });

  var us = await client.users.forEach(u => {
    if(u.bot) null;
    else users[u.id] = { blacklist: false };
  });

  sql.run('CREATE TABLE IF NOT EXISTS players (userID, plays, wins, loses, rubles)');

 var db_post = await snek.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`, {headers: {Authorization: k.keys.dbots}}).send({server_count: client.guilds.size, shard_id: 0, shards: 2}).end(() => { console.log(`Successfully sent server amount to bots.discord.pw`) });
 var dbl_post = await dbl.postStats(client.guilds.size, 0, client.shards.size);
});

client.on("guildCreate", async (guild) => {
  console.log(c.yellow(`I've joined ${guild.name}, has ${guild.memberCount} users.\nServer amount: ${client.guilds.size}.`));
  client.guilds.get(bot.officialserver).channels.get(bot.logs).createMessage(`I've joined ${guild.name}, has ${guild.memberCount} members.\nServer amount: ${client.guilds.size}.`);
  guild.defaultChannel.createMessage(`\`\`\`Hey, I'm Russian roulette. I know, it's a shitty name; blame the developer.\n\nI'm just a bot, mainly used to play Russian roulette, but I also have some other commands that revolve around fun, and a lot more coming. To see my commands, use ")help."\n\nWe're always looking for new feautures, so if you have an idea use the ")suggest" command -- you could also join the discord server and tell the developer himself. Server Invite: https://discord.me/xdd.\`\`\``);

  if(!guilds[guild.id]) guilds[guild.id] = { censor: true, fpInvite: true, banPlay: true, roleSaveActive: false, roleSave: [] };
  if(!prefixes[guild.id]) prefixes[guild.id] = ")";

  guild.members.forEach(m => {
    if(!users[m.id]) users[m.id] = { blacklist: false };
  });

 var db_post = await snek.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`, {headers: {Authorization: k.keys.dbots}}).send({server_count: client.guilds.size, shard_count: 2}).end(() => { console.log(`Successfully sent server amount to bots.discord.pw`) });
 var dbl_post = await dbl.postStats(client.guilds.size, 0, client.shards.size);
});

client.on('guildDelete', async (guild) => {
  console.log(c.gray(`I've left ${guild.name}. Server amount: ${client.guilds.size}`));
  guilds[guild.id].roleSaveActive = false;
  guilds[guild.id].roleSave = [];
  client.guilds.get(bot.officialserver).channels.get(bot.logs).createMessage(`I've left ${guild.name}. Server amount: ${client.guilds.size}.`);

 var db_post = await snek.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`, {headers: {Authorization: k.keys.dbots}}).send({server_count: client.guilds.size, shard_id: 0, shards: 2}).end(() => { console.log(`Successfully sent server amount to bots.discord.pw`) });
 var dbl_post = await dbl.postStats(client.guilds.size, 0, client.shards.size);
});

client.on('guildMemberAdd', (guild, member) => {
  if(guilds[guild.id].roleSaveActive == true) {
    guilds[guild.id].roleSave.forEach(m => {
      if(member.id == m.id) {
        for(var i = 0; i < m.roles.length; i++) {
          member.addRole(m.roles[i]);
        }
      }
    });
  }
});

client.on("messageCreate", (message) => {
  if(!users[message.author.id]) users[message.author.id] = { blacklist: false };
  if(!guilds[message.channel.guild.id]) guilds[message.channel.guild.id] = { censor: true, banPlay: true, fpInvite: true, roleSaveActive: false, roleSave: [] };

  var prefix;
  if(!message.content.startsWith(prefixes[message.channel.guild.id]) && !message.content.startsWith(bot.prefix)) return;
  if(message.author == client.user) return;
  if(!message.channel.guild) return;
  if(users[message.author.id].blacklist !== false) return message.channel.createMessage(`<@${message.author.id}>, fuck you, buddy.`);

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

client.connect();
// I don't wanna do this anymore
