/**
* Gets the statistics from the database, for yourself or another. Maybe even the bot's stats.
* @param {string} [u = null] Mention of a guild member, for their own stats.
*/

exports.run = function(message, args) {
  var u = message.mentions;
  try {
    if(u[0].id === client.user.id) {
      var time = moment.duration(client.uptime, "milliseconds").format("d[d] hh[h] mm[m] ss[s]");
      return client.createMessage(message.channel.id, {embed: {
        color: 0x00B2EE,
        fields: [
          { name: "Bot Info", value: `• Uptime: ${time}\n• Ping: \`${new Date - message.timestamp} ms\`\n• Memory Heap: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBs / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MBs\``, inline: false },
          { name: "Shards Info", value: `• Amount of Shards: \`${client.shards.size}\`\n• Current Shard: ${message.channel.guild.shard.id + 1}/${client.shards.size}`, inline: false},
          { name: "Servers Info", value: `• Servers: ${client.guilds.size}\n• Total Guild Members: ${client.users.size}`, inline: false },
          { name: "API Lib", value: "[Eris 0.8.2](https://abal.moe/Eris)", inline: false }
        ]
      }});
    }

    else if(!u[0]) {
      sql.get(`SELECT * FROM players WHERE playerID = '${message.author.id}'`).then(r => {
        if(!r) {
          sql.run('INSERT INTO players (playerID, wins, loses, plays, playerName, playerDiscriminator) VALUES (?, ?, ?, ?, ?, ?)', [message.author.id, 0, 0, 0, message.author.username, message.author.discriminator]);
          return message.channel.createMessage({embed: {
            color: 0xff0000,
            footer: { text: `${message.author.username}'s Stats`, icon_url: message.author.avatarURL },
            thumbnail: { url: message.author.avatarURL },
            fields: [
              { name: "Wins", value: '0', inline: true },
              { name: "Loses", value: '0', inline: true },
              { name: "Total Plays", value: '0', inline: true }
            ]
          }});
        }

        return message.channel.createMessage({embed: {
        color: 0xff0000,
          footer: { text: `${message.author.username}'s Stats`, icon_url: message.author.avatarURL },
          thumbnail: { url: message.author.avatarURL },
          fields: [
            { name: "Wins", value: r.wins, inline: true },
            { name: "Loses", value: r.loses, inline: true },
            { name: "Total Plays", value: r.plays, inline: true }
          ]
        }});
      });
    }


    else if(u[0] && u[0].id !== bot.id) {
      sql.get(`SELECT * FROM players WHERE playerID = '${message.channel.guild.members.get(u[0].id).user.id}'`).then(r => {
        if(!r) {
          sql.run('INSERT INTO players (playerID, wins, loses, plays, playerName, playerDiscriminator) VALUES (?, ?, ?, ?, ?, ?)', [message.channel.guild.members.get(u[0].id).user.id, 0, 0, 0, message.channel.guild.members.get(u[0].id).user.username, message.channel.guild.members.get(u[0].id).user.discriminator])
          return client.createMessage(message.channel.id, {embed: {
            color: 0xff0000,
            footer: { text: `${message.channel.guild.members.get(u[0].id).username}'s Stats`, icon_url: message.channel.guild.members.get(u[0].id).avatarURL },
            thumbnail: { url: message.channel.guild.members.get(u[0].id).avatarURL
            },
            fields: [
              { name: "Wins", value: "0", inline: true },
              { name: "Loses", value: "0", inline: true },
              { name: "Total Plays", value: "0", inline: true }
            ]
          }});
        }

        return client.createMessage(message.channel.id, {embed: {
          color: 0xff0000,
          footer: { text: `${message.channel.guild.members.get(u[0].id).username}'s Stats`, icon_url: message.channel.guild.members.get(u[0].id).avatarURL },
          thumbnail: { url: message.channel.guild.members.get(u[0].id).avatarURL
          },
          fields: [
            { name: "Wins", value: r.wins.toString(), inline: true },
            { name: "Loses", value: r.loses.toString(), inline: true },
            { name: "Total Plays", value: r.plays.toString(), inline: true }
          ]
        }});
      });
    }
  } catch (e) {
    throw c.red(e.stack);
    message.channel.createMessage(`\`\`\`${e}\`\`\``);
  }
};

exports.info = {
  usage: ")stats [args]",
  args: "[@ a member, or nothing]",
  description: "Get your stats from when you've played Russian roulette."
};
