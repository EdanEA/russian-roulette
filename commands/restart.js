/**
* Restarts the bot's server daemon.
* @param {string} args The reason for exitting.
*/

exports.run = async function(message, args) {
  if(message.author.id !== owner.id) return message.channel.createMessage({content: `if you wanna use this command, I'm gonna need that succy fuccy, <@${message.author.id}>`, tts: true});

  function writeAsync(path, content) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(path, content, 'utf8', (err, result) => {
        if(err) reject(err);
        else {
          resolve(result);
          console.log(`Successfully logged ${Object.keys(prefixes).length} prefixes before exit.`)
        }
      });
    });
  }

  var wp = await writeAsync('./prefixes.json', JSON.stringify(prefixes));
  var wbl = await writeAsync('./blacklist.json', JSON.stringify(blacklist));

  message.channel.createMessage("ok, dad Dx").then(() => {
    process.exit(args.join(' '));
  });
};

exports.info = {
  usage: ")restart",
  args: "[none]",
  description: "Restarts the server, I guess."
};
