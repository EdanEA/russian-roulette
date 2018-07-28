exports.run = async function(message, args) {
  message.delete();
  var players = [];
  var gameInfo = { totalPlays: 0, winner: null, playersLost: 0 };
  var start = await message.channel.createMessage(`Starting a game…`).then(async m => {
    players.push({id: message.author.id, lost: false});
    m.edit(`Started the game succesfully. Others have 15 seconds to join by typing in \`join\`.`);

    var msgs = await message.channel.awaitMessages(msg => msg.author.id !== message.author.id && msg.content.toLowerCase() == 'join', { maxMatches: 5, time: 15000 });
    for(var msg of msgs) {
      players.push({id: msg.author.id, lost: false});
      msg.delete();
    }

    if(players.length < 2) return message.channel.createMessage(`<@${message.author.id}>, if you wanna kill yourself on your own, just use \`)play\`.`);

    m.delete();
  });

  var p = `Starting game with: `;
  players.forEach(player => {
    p += `\`${client.users.get(player.id).username}\` `
  });
  message.channel.createMessage(p);

  var lost = [];
  var fields = [];
  var game = {rounds: 1, count: players.length};
  while(players.length > 1) {
    for(var i = 0; i < game.count; i++) {
      let b = Math.floor(Math.random() * 5);
      let p = Math.floor(Math.random() * 5);

      if(b === p) {
        lost.push(players[i].id);
        players[i].lost = true
        fields.push({ name: `${client.users.get(players[i].id).username}'s Results:`, value: `\`\`\`${client.users.get(players[i].id).username} Lost\`\`\`` });
      } else {
        fields.push({ name: `${client.users.get(players[i].id).username}'s Results:`, value: `\`\`\`${client.users.get(players[i].id).username} Survived\`\`\`` });
      }
      continue;
    }

    if(players.length == 2 && lost.length >= 1) {
      var winner;

      if(!players.find(p => p.lost == false && !lost.includes(p.id))) winner = `Sadly, no one won.`;
      else winner = `<@${players.find(p => p.lost == false && !lost.includes(p.id)).id}> Won!`;

      var round = await message.channel.createMessage({embed: {
        title: `Game End`,
        description: winner,
        color: 0xff0000,
        footer: {text:`That game took ${game.rounds} rounds.`}
      }});

      break;
    } else {
      var round = await message.channel.createMessage({embed: {
        title: `Round ${game.rounds} End`,
        fields: fields,
        color: 0xff0000
      }});
    }

    players.forEach(p => {
      if(p.lost == true) {
        var k = players.indexOf(p);
        delete players[k];
        game.count -= 1;
      }
    });

    game.rounds += 1;
    var fields = [];

    continue;
  }
};

exports.info = {
  usage: ")multiplay",
  args: "None.",
  description: "Allows you to play RR with multiple people. You can throw little parties with it, it'd be great. By the way, you don't get banned if y' lose with this one, 'cause I'm too lazy to program that in... for right now. I guess."
};
