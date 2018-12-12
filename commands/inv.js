exports.run = function(message, args) {
  if(!users[message.author.id]) users[message.author.id] = {ownsGun: false, candy: 0, badges: [], dailyToday: false, dailyAmount: 0, name: "", desc: ""}

  sql.get(`SELECT * FROM players WHERE userID='${message.author.id}'`).then(u => {
    var b = "";
    if(!users[message.author.id].badges[0]) b = "None.";
    else for(var i = 0; i < users[message.author.id].badges.length; i++) {
      if(users[message.author.id].badges[i] == "coolboi") b += "Cool Boi\n";
      else if(users[message.author.id].badges[i] == "succ") b += "Succ\n";
      else if(users[message.author.id].badges[i] == "gun") b += "Gun Owner\n";
    }
    return message.channel.createMessage({embed: {
      color: 0xff0000,
      fields: [
        { name: "Items:", value: `${users[message.author.id].ownsGun ? '6-shot .357 Mag Ruger GP100\n' : ''}Pieces of Candy: ${users[message.author.id].candy.toString()}\n` },
        { name: "Badges:", value: `${b}` }
      ],
      author: { icon_url: message.author.avatarURL, name: `${message.author.username}'s Items` }
    }})
  });
};

exports.info = {
  usage: ")inv",
  args: "None.",
  description: "Shows your inventory -- the items you've bought."
};
