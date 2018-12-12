exports.run = async function(message, args) {
  if(!users[message.author.id]) return message.channel.createMessage(`<@${message.author.id}>, get outta here, boi-o. If y' wanna use the go to the store and buy a gun.`);
  if(users[message.author.id].ownsGun == false) return message.channel.createMessage(`<@${message.author.id}>, only the rich bois with nice guns can do this, baby. S' get outta here, poor~y.`);

  var comp = perms.compare(message.member, message.channel.guild.members.get(client.user.id));

  if(comp == false) {
    var ban = await client.banGuildMember(message.channel.guild.id, message.author.id, 0, "S'pose they couldn't bare it all. What a shame.");
    return message.channel.createMessage(`May peace be brought to ${message.author.username}.`);
  } else {
    var edgyshit = [
      `${message.author.username} woke up a few days after trying to commit suicide in the hospital; they questioned if what had occured was reality, or a mere dream. But in the same thought, why would they be in the hospital if it were all fiction?\nShall they ever know if this is real life, or a continuous hell punished upon them? Even if this were so, is it any different from real life?`,
      `As ${message.author.username} pulled the trigger, their eyes were closed -- expecting some change, a flash of light, sudden complete darkness, something. But to no avail.\nTheir eyes are open once again -- again, contemplating pulling the trigger once more, but some part of them knew this would end the same.`,
      `Darn, you're still alive? Guess you're fuckin' immortal, then. Sucks to suck, I suppose.`,
      `In an instance of seething, ${message.author.username} chose to end it all. Little did they know, that they in fact could not die.`,
      `Oh hecc, must've loaded the blanks again! Whoopsies!`
    ];

    return message.channel.createMessage(edgyshit[Math.floor(Math.random() * edgyshit.length)]);
  }
};

exports.info = {
  usage: ")suicide",
  args: "None.",
  description: "Y'know how you can die using the play command? Well, what if you could do that, just you've got an 100% chance of losing?\nTerrible idea you say? I know! But you terrible people want it, so here it is\n\Do note that doing this bans you, and does not automatically unban you."
};
