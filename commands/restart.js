/**
* Restarts the bot's server daemon.
* @return {string} A confirmation that it's about to restart.
*/
exports.run = async function(message, args) {
  if(message.author.id !== owner.id) return message.channel.createMessage({content: `if you wanna use this command, I'm gonna need that succy fuccy, <@${message.author.id}>`, tts: true});

  var xd = await Object.values(users).forEach(u => {
    u.dailyToday = false;
  });

  async function writeAsync(path, content) {
    var write = await fs.writeFile(path, content, 'utf8', (err, result) => {
      if(err) throw err;
      else console.log(`Successfully logged ${Object.keys(content).length} items in ${path} before exit.`);
    });
  }

  var wp = await writeAsync('./storage/prefixes.json', JSON.stringify(prefixes));
  var wbl = await writeAsync('./storage/blacklist.json', JSON.stringify(blacklist));
  var wg = await writeAsync('./storage/guilds.json', JSON.stringify(guilds));
  var wu = await writeAsync('./storage/users.json', JSON.stringify(users));
  var wrs = await writeAsync('./storage/rolesave.json', JSON.stringify(rolesave));

  message.channel.createMessage("okay, okay, okay, okay").then(() => {
    process.exit(0);
  });
};

exports.info = {
  usage: ")restart",
  args: "[none]",
  description: "Restarts the server, I guess."
};
