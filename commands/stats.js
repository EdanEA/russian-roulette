/**
* Gets the statistics from the database, for yourself or another. Maybe even the bot's stats.
* @param {string} [u = null] Mention of a guild member, for their own stats.
*/

exports.run = function(message, args) {
  var u = message.mentions;

  try {
    sql.run('CREATE TABLE IF NOT EXISTS players (userID, wins, loses, plays, rubles)');
    if(!args[0] && !u[0]) {
      sql.get(`SELECT * FROM players WHERE userID = '${message.author.id}'`).then(r => {
        if(!r) {
          sql.run(`INSERT INTO players (userID, wins, loses, plays) VALUES (?, ?, ?, ?)`, [message.author.id, 0, 0, 0, 200]);
          message.channel.createMessage({embed: {
            color: 0xE30B5D,
            footer: { text: `${message.author.username}'s Stats`, icon_url: message.author.avatarURL },
            thumbnail: { url: message.author.avatarURL },
            fields: [
              { name: "Wins", value: '0', inline: true },
              { name: "Loses", value: '0', inline: true },
              { name: "Total Plays", value: '0', inline: true }
            ]
          }});
        }

        message.channel.createMessage({embed: {
          color: 0xE30B5D,
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

    else if(args[0] == "top" || args[0] == "global") {
      sql.all('SELECT plays, wins, loses, userID FROM players ORDER BY plays DESC LIMIT 10').then(rows => {
        var content = "";
        for(var i = 0; i < rows.length; i++) {
          var r = rows[i];
          if(!client.users.get(r.userID)) var user = "Unknown User:"
          else var user = `${client.users.get(r.userID).username}#${client.users.get(r.userID).discriminator}:`;

          content += `[${i + 1}] ${user}\n\tPlays: ${r.plays}\n\tWins: ${r.wins}\n\tLoses: ${r.loses}\n\n`;
        }

        message.channel.createMessage(`\`\`\`css\nTop Player Stats\n================\n\n${content}\`\`\``);
      });
    }

    else if(u[0].id === client.user.id) {
      var time = moment.duration(client.uptime, "milliseconds").format("d[d] hh[h] mm[m] ss[s]");
      var gts = client.shards.map(s => `Shard ${s.id} : ${client.guilds.filter(g => g.shard.id === s.id).length}`).join('\n\t- ');
      client.createMessage(message.channel.id, {embed: {
        color: 0x00B2EE,
        fields: [
          { name: "Bot Info", value: `• Uptime: ${time}\n• Ping: \`${new Date - message.timestamp} ms\`\n• Memory Heap: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBs / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MBs\``, inline: false },
          {
            name: "Shards Info",
            value: `• Amount of Shards: \`${client.shards.size}\`\n• Current Shard: ${message.channel.guild.shard.id + 1}/${client.shards.size}\n• Shard Latency:\n\t- Shard 0 : \`${client.shards.get(0).latency} ms\`\n\t- Shard 1 : \`${client.shards.get(1).latency} ms\`\n\t- Shard 2 : \`${client.shards.get(2).latency} ms\`\n• Guilds on Shards:\n\t- ${gts}`,
            inline: false
          },
          { name: "Servers Info", value: `• Servers: ${client.guilds.size}\n• Total Guild Members: ${client.users.size}`, inline: false },
          { name: "API Lib", value: "[Eris 0.8.5](https://abal.moe/Eris)", inline: false }
        ]
      }});
    }

    else if(u[0]) {
      sql.get(`SELECT * FROM players WHERE userID = '${message.channel.guild.members.get(u[0].id).user.id}'`).then(r => {
        if(!r) {
          sql.run('INSERT INTO players (userID, wins, loses, plays) VALUES (?, ?, ?, ?)', [u[0].id, 0, 0, 0]);
          client.createMessage(message.channel.id, {embed: {
            color: 0xE30B5D,
            footer: { text: `${message.channel.guild.members.get(u[0].id).username}'s Stats`, icon_url: message.channel.guild.members.get(u[0].id).avatarURL },
            thumbnail: { url: message.channel.guild.members.get(u[0].id).avatarURL },
            fields: [
              { name: "Wins", value: "0", inline: true },
              { name: "Loses", value: "0", inline: true },
              { name: "Total Plays", value: "0", inline: true }
            ]
          }});
        }

        client.createMessage(message.channel.id, {embed: {
          color: 0xE30B5D,
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
    message.channel.createMessage(`\`\`\`${e}\`\`\``);
    throw c.red(e.stack);
  }
};

exports.info = {
  usage: ")stats [args]",
  args: "Either nothing, a mention of a user, or 'top' for the top players.",
  description: "Get your stats from when you've played Russian roulette."
};
