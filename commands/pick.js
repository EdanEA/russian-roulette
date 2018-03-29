/**
* Takes a list of "options" and returns a random item from it.
* @param {Array<string>} args The items of the list, seperated by spaces.
* @return {string} A random item from the array.
*/

exports.run = function(message, args) {
  if(!args) return message.channel.createMessage("reee, leave a list, you cuck.");
  message.channel.createMessage(`I pick the, uhhhhhhhhhhhhhhhhhhhhhhh, this one: \`${args[Math.floor(Math.random()*args.length)]}\``);
};

exports.info = {
  usage: ")pick [args]",
  args: "[list of things you want me to pick from, seperates by spaces.]",
  description: "Are you too much of an indecisive bitch to pick for yourself? Well, there's a command for that now, I guess."
};
