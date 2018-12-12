exports.run = function(message, args) {
  if(!users[message.author.id] || !users[message.author.id].ownsGun) return message.channel.createMessage(`<@${message.author.id}>, gotta be a cool boi, with a cool boi gun to use this cool boi command, un-cool boi.`);

  var thing = message.mentions[0] ? `<@${message.mentions[0].id}>` : args.join(' ');

  var ahh = [
    `Suddently a bullet whizzes past ${thing}'s face, leaving them utterly terrified -- trembling out of their pants.`,
    `${message.author.username} was on their last nerve, when ${thing} decided to toy with them. ${message.author.username} pulled out their revolver, and pointed it point blank in their face. Before thinking about what they're doing, they pulled the trigger.`,
    `Quite rashly, ${message.author.username} pulled their gun on ${thing}. Almost in a cinematic way, they were gunned down, ${message.author.username} walking away slowly, seemingly without a care in the world.`,
    `***bang***\n\n${message.author.username} <:gun:503659704950587412> ${thing}`
  ];

  return message.channel.createMessage(ahh[Math.floor(Math.random() * ahh.length)]);
};

exports.info = {
  usage: ")shoot [args]",
  args: "A mention, or just a thing in-general.",
  description: "Pretty much just the insult command, just instead of having like 8 different \"insults\", there's some descriptive sentences. It's pretty great -- truly."
};
