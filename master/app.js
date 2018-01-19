global.Eris = require('eris');
require("eris-additions")(Eris, { disabled: ["Channel.sendMessage", "Channel.sendCode", "Eris.Embed"] })
global.sql = require('sqlite');
global.fs = require('fs');
global.c = require('chalk');
global.moment = require('moment');
global.snek = require('snekfetch');
require('moment-duration-format');

global.k = require('./secretspoops.json');
global.perms = require('./functions/permissions.js');
global.misc = require('./functions/misc.js');
global.prefixes = require('./prefixes.json');
global.blacklist = require('./blacklist.json');
require('./guild.js');

global.client = new Eris.Client(k.alt, { connectionTimeout: 60000, maxShards: 2 });
global.admins = { "josh":"117728104935456770", "hunter":"228963688910946304", "john":"148958241378926593" };
global.owner = { "id":"221740788462256138" };
global.bot = {"id": "305602159741763585", "logs":"382001924251320322", "suggestchannel":"382001960984772609", "testingserver":"312667247808217088", "officialserver":"380310916341956610", "prefix":"("};

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

client.on("ready", () => {
  console.log(c.blue(`Damn Daniel.\nServer Amount: ${client.guilds.size}`));
  misc.randomStatus();
  client.guilds.forEach(g => {
    if(!prefixes[g.id]) prefixes[g.id] = "("
  });

  client.users.forEach(u => {
    if(!blacklist[u.id]) blacklist[u.id] = false;
  });
  new snek('POST', `https://bots.discord.pw/api/bots/${bot.id}/stats`).set('Authorization', k.bdt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to bots.discord.pw successfully.") }).catch(e => { if(e) throw e.stack; return; });
  new snek('POST', `https://discordbots.org/api/bots/${bot.id}/stats`).set('Authorization', k.dblt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to discordbots.org successfully.") }).catch(e => { if(e) throw e.stack; return; });
});

client.on("guildCreate", guild => {
  console.log(c.yellow(`I've joined ${guild.name}. Server amount: ${client.guilds.size}.`));
  guild.defaultChannel.createMessage(`\`\`\`Hey, I'm Russian roulette. ~~I know, it's a shitty name; blame the developer.~~ I'm just a bot, mainly used to play Russian roulette, but I also have some fun commands, and a lot more coming. We're always looking for new feautures, so if you have an idea use the ")suggest" command -- you could also join the discord server and tell the developer himself. Server Invite: https://discord.me/xdd.\`\`\``);
  prefixes[guild.id] = "(";
  try {
    client.guilds.get(bot.officialserver).channels.get(bot.logs).createMessage(`I've joined ${guild.name}. Server amount: ${client.guilds.size}.`);
  } catch (e) {
    console.log(c.bgRed("Invite me back to the test server, you bitch.\n" + e.stack));
  }
  new snek('POST', `https://bots.discord.pw/api/bots/${bot.id}/stats`).set('Authorization', k.bdt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to bots.discord.pw successfully.") }).catch(e => { if(e) throw e.stack; return; });
  new snek('POST', `https://discordbots.org/api/bots/${bot.id}/stats`).set('Authorization', k.dblt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to discordbots.org successfully.") }).catch(e => { if(e) throw e.stack; return; });
});

client.on('guildDelete', guild => {
  console.log(c.gray(`I've left ${guild.name}. Server amount: ${client.guilds.size}`));
  try {
    client.guilds.get(bot.officialserver).channels.get(bot.logs).createMessage(`I've left ${guild.name}. Server amount: ${client.guilds.size}.`);
  } catch (e) {
    console.log(c.bgRed("Invite me back to the test server, you bitch.\n" + e.stack));
  }
  new snek('POST', `https://bots.discord.pw/api/bots/${bot.id}/stats`).set('Authorization', k.bdt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to bots.discord.pw successfully.") }).catch(e => { if(e) throw e.stack; return; });
  new snek('POST', `https://discordbots.org/api/bots/${bot.id}/stats`).set('Authorization', k.dblt).send({ server_count: client.guilds.size }).then(() => { console.log("Sent server amount to discordbots.org successfully.") }).catch(e => { if(e) throw e.stack; return; });
});

client.on('guildMemberAdd', (guild, member) => {
  if(guild.id === bot.officialserver) return;

  if(member.id === owner.id) {
    client.createMessage(guild.defaultChannel.id, `oh shit, it's <@${member.id}>, that's the dev.`)
  } else if(member.id === admins.josh || member.id === admins.john || member.id === admins.hunter) {
    client.createMessage(guild.defaultChannel.id, `oh shit, it's <@${member.id}>, that's a staff member of the bot.`)
  } else return;
});

client.on("messageCreate", (message) => {
  var prefix;
  if(!message.content.startsWith(prefixes[message.channel.guild.id]) && !message.content.startsWith(bot.prefix)) return;
  if(message.author == client.user) return;
  if(!message.channel.guild) return;
  if(!blacklist[message.author.id] === false) return message.channel.createMessage(`<@${message.author.id}>, fuck you, buddy.`);

  if(message.content.startsWith(prefixes[message.channel.guild.id])) var prefix = prefixes[message.channel.guild.id];
  else var prefix = bot.prefix;

  let cmd = message.content.slice(prefix.length).toLowerCase().split(' ')[0];
  let args = message.content.split(' ').slice(1);

  try {
    require(`./commands/${cmd}`).run(message, args);
  } catch (e) {
    if(e.message.includes('Cannot find module') || e.message.includes('ENOENT')) return;
    console.log(c.red(e.stack));

    if(e.length > 1990) return;
    message.channel.createMessage(`\`\`\`${e}\`\`\``);
  }
});

setInterval(misc.randomStatus, 1800000);
setInterval(misc.dailyBackup, 86400000);

client.connect();
// rip my guy stringer
