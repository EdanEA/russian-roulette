/**
* The base play - Russian Roulette's shitty Russian Roulette simulator.
* @param {number} [a = 1] The amount of "bullets" to be used whilst playing.
*/

const sql = require('sqlite');
sql.open('./stats.sqlite');
sql.run('CREATE TABLE IF NOT EXISTS players (userID, wins, loses, plays)');

exports.run = function(message, args) {
  var id = message.author.id;
  var cid = message.channel.id;
  var gid = message.channel.guild.id;

  var a = parseInt(args[0]);

  var delays = [ 150000, 180000, 60000, 30000, 300000 ];
  var delay = delays[Math.floor(Math.random() * delays.length)];

  var bm = message.channel.guild.members.get(bot.id);
  var pm = message.member;
  var bc = perms.checkBotAdmin(message);
  var rc = perms.compare(bm, pm);

  if(!a) var a = 1;

  var replies;

  var baseReplies = {
    reasons: [
      "Damn, bro, their brains splattered everywhere. It was fuckin' crazy; should've been there.",
      `Lol, ${message.author.username}'s so shit. They lost to like a ${(a * 16).toString()}% percent chance of dying. Literal garbage.`,
      "I WAS CONCEIVED BY MY DISEASE",
      "D:"
    ],
    rrs: [
      `Damn, bro, you beat the ${(a * 16).toString()}% chance that you'd get beaned.`,
      "Yeet, you get to survive, my guy.",
      "Fucking hell! This isn't fair. >:(((\nYou should go again...",
      "John's a nigger, lol. Btw you didn't lose."
    ],
    tooHigh: `<@${id}>, damn, bro, that's too high, man. You don't wanna fucking die, do you?`,
    tooLow: `<@${id}>, you can't put less than one bullet, pussy-boi.`
  }

  var censoredReplies = {
    reasons: [
      "Damn, bro, their brains splattered everywhere. It was crazy; should've been there.",
      `Lol, ${message.author.username}'s so traaaaaaaaaaaaash. They lost to like a ${(a * 16).toString()}% percent chance of dying. Literal garbage.`,
      "I WAS CONCEIVED BY MY DISEASE",
      "D:"
    ],
    rrs: [
      `Aw yeah, you beat the ${(a * 16).toString()}% chance that you'd get beaned.`,
      "Yeet, you get to survive, my guy.",
      "This isn't fair. >>>:'(((\nYou should go again...",
      "John's a person of African decent, lol. Btw you didn't lose."
    ],
    tooHigh: `<@${id}>, that's too high, man. If ya wanna kill yourself, this ain't the way, boi-o.`,
    tooLow: `<@${id}>, c'mon, don't be like that -- trying to put nothing in the virtual gun. swmh (shaking with my hand)`
  }

  guilds[message.channel.guild.id].censor == true ? replies = censoredReplies : replies = baseReplies;

  var rr = replies.rrs[Math.floor(Math.random() * replies.rrs.length)];
  var reason = replies.reasons[Math.floor(Math.random() * replies.reasons.length)];

  function checkBP(bullets) {
    if(bullets.length === 1) return;

    for(var i = 0; i <= bullets.length; i++) {
      if(bullets[i] === bullets[0]) {
        while(bullets[bullet] === bullets[0]) {
          bullets[i] = Math.floor(Math.random() * 5);

          if(bullets[i] === bullets[0]) continue;
          else break;
        }
      }
    }

    return bullets;
  }

  try {
    const p = Math.floor(Math.random() * 5);
    switch(a) {
      case 1:
        var b0 = Math.floor(Math.random() * 5);
        var b = [b0];
        break;
      case 2:
        var b0 = Math.floor(Math.random() * 5), b1 = Math.floor(Math.random() * 5);
        var b = [b0, b1];
        break;
      case 3:
        var b0 = Math.floor(Math.random() * 5), b1 = Math.floor(Math.random() * 5), b2 = Math.floor(Math.random() * 5);
        var b = [b0, b1, b2];
        break;
      case 4:
        var b0 = Math.floor(Math.random() * 5), b1 = Math.floor(Math.random() * 5), b2 = Math.floor(Math.random() * 5), b3 = Math.floor(Math.random() * 5);
        var b = [b0, b1, b2, b3]
        break;
      case 5:
        var b0 = Math.floor(Math.random() * 5), b1 = Math.floor(Math.random() * 5), b2 = Math.floor(Math.random() * 5), b3 = Math.floor(Math.random() * 5), b4 = Math.floor(Math.random() * 5);
        var b = [b0, b1, b2, b3, b4];
        break;
      default:
        if(a > 5)
          return message.channel.createMessage(replies.tooHigh);
        else if(a < 1)
          return message.channel.createMessage(replies.tooLow);
    }

    checkBP(b);

    for(var bullet in b) {
      if(b[bullet] === p) {
        var b = b[bullet];
        break;
      }
    }

    if(b === p) {
      if(guilds[message.channel.guild.id].banPlay == false || bc == false || rc == false || args[0] == 'safe') {
        message.channel.createMessage("Whoops! You totally lost, but I can't ban you. Just pretend it was blanks, I guess.");
        sql.get(`SELECT * FROM players WHERE userID = '${id}'`).then(r => {
          if(!r) return sql.run(`INSERT INTO players (userID, wins, loses, plays) VALUES (?, ?, ?, ?)`, [id, 0, 1, 1]);
          else return sql.run(`UPDATE players SET plays = ${r.plays += 1}, loses = ${r.loses += 1} WHERE userID = '${id}'`);
        });
      } else {
        message.channel.createMessage("*bang*").then(m => {
          setTimeout(() => {
            m.edit(`May God leave ${message.author.username}'s soul at peace.`);

            client.banGuildMember(gid, id, 0, reason).then(() => {
              setTimeout(() => {
                client.unbanGuildMember(gid, id);
                message.channel.createInvite().then(invite => {
                  client.getDMChannel(id).then((channel) => {
                    channel.createMessage(`You were unbanned, I guess. https://discord.gg/${invite.code}`);
                    sql.get(`SELECT * FROM players WHERE userID = '${id}'`).then(r => {
                      if(!r) return sql.run(`INSERT INTO players (userID, wins, loses, plays) VALUES (?, ?, ?, ?)`, [id, 0, 1, 1]);
                      else return sql.run(`UPDATE players SET plays = ${r.plays += 1}, loses = ${r.loses += 1} WHERE userID = '${id}'`);
                    });
                  });
                });
              }, delay);
            });
          }, 3500);
        });
      }
    } else {
      message.channel.createMessage("*click*").then(m => {
        setTimeout(() => {
          m.edit(rr);
          sql.get(`SELECT * FROM players WHERE userID = '${id}'`).then(r => {
            if(!r) return sql.run(`INSERT INTO players (userID, wins, loses, plays) VALUES (?, ?, ?, ?)`, [id, 1, 0, 1]);
            else return sql.run(`UPDATE players SET plays = ${r.plays += 1}, wins = ${r.wins += 1} WHERE userID = '${id}'`);
          });
        }, 3500);
      });
    }
  } catch (e) {
    throw e;
    message.channel.createMessage(`Uh-oh, something went wrong there.\`\`\`${e}\`\`\``);
  }
};

exports.info = {
  usage: ")play [args]",
  args: "The number of bullets to be used, nothing, or safe if you don't wanna get banned.",
  description: "Feeling suicidal? Just want a bit of thrill? Then play some Russian roulette."
};
