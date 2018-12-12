exports.run = async function(message, args) {
  try {
    message.delete();
    var players = [];
    var gameInfo = { winner: null, playersLost: 0, playerCount: 0, rounds: 1 };
    var start = await message.channel.createMessage(`Starting a game…`).then(async m => {
      players.push({id: message.author.id, lost: false});
      m.edit(`Started the game succesfully. Others have 15 seconds to join by typing in \`join\`.`);

      var msgs = await message.channel.awaitMessages(msg => msg.author.id !== message.author.id && msg.content.toLowerCase() == 'join', { maxMatches: 5, time: 15000 });
      for(var msg of msgs) {
        players.push({id: msg.author.id, lost: false});
        msg.delete();
      }

      m.delete();
    });

    if(players.length < 2) return message.channel.createMessage(`<@${message.author.id}>, if you wanna kill yourself on your own, just use \`)play\`.`);

    var p = `Starting game with: `;
    players.forEach(player => {
      gameInfo.playerCount += 1;
      p += `\`${client.users.get(player.id).username}\` `;
    });
    message.channel.createMessage(p);

    var lost = [];
    var fields = [];

    while(true) {
      if(gameInfo.playersLost == (gameInfo.playerCount - 1)) {
        message.channel.createMessage({embed: {
          title: `Game End`,
	  description: `<@${players[0].id}> won`,
          color: 0xff0000,
          footer: {text:`That game took ${gameInfo.rounds} rounds.`}
        }});
        break;
      }

      for(var i = 0; i < gameInfo.playerCount; i++) {
        let b = Math.floor(Math.random() * 5);
        let p = Math.floor(Math.random() * 5);

        if(b === p) {
          lost.push(players[i].id);
          players[i].lost = true;
          gameInfo.playersLost += 1;

          fields.push({ name: `${client.users.get(players[i].id).username}'s Results:`, value: `\`\`\`${client.users.get(players[i].id).username} Lost\`\`\`` });
        } else {
          fields.push({ name: `${client.users.get(players[i].id).username}'s Results:`, value: `\`\`\`${client.users.get(players[i].id).username} Survived\`\`\`` });
        }
        continue;
      }

      if(players.length == lost.length || players.length == 0 || gameInfo.playersLost == gameInfo.playerCount) {
        if(lost.length == 2) return message.channel.createMessage({embed: {
         title: `Game End`,
         description: "Welp, since y'all all lost, I guess no one wins now. I hope you're happy. Just gotta ruin everything, don't y'?",
	 color: 0xff0000,
	 footer: { text:`That game took ${gameInfo.rounds} rounds.` }
        }});

        break;
      } else {
        if(gameInfo.playersLost == (gameInfo.playerCount - 1)) {
	  var winner;
          if(!players.find(p => p.lost == false && !lost.includes(p.id))) winner = `Sadly, no one won.`;
          else winner = `<@${players.find(p => p.lost == false && !lost.includes(p.id)).id}> Won!`;

	  var end = await message.channel.createMessage({embed: {
            title: `Game End`,
            description: winner,
            color: 0xff0000,
            footer: {text:`That game took ${gameInfo.rounds} rounds.`}
          }});
	  break;
        }

        var round = await message.channel.createMessage({embed: {
	  color: 0xff0000,
	  title: `Round ${gameInfo.rounds} End`,
	  fields: fields
         }});
      }

      players.forEach(p => {
        if(p.lost == true) {
          var k = players.indexOf(p);
          delete players[k];
        }
      });

      gameInfo.rounds += 1;
      var fields = [];

      continue;
    }
  } catch (e) {
    throw e;
  }
};

exports.info = {
  usage: ")multiplay",
  args: "None.",
  description: "Allows you to play RR with multiple people. You can throw little parties with it, it'd be great. By the way, you don't get banned if y' lose with this one, 'cause I'm too lazy to program that in... for right now. I guess."
};
