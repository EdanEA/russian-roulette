exports.run = function(message, args) {
  if(!args[0] || args[0] == "list") {
    return message.channel.createMessage({embed: {
      title: "Edab INC. Goods & More",
      description: "Welcome to Edab INC. Goods & More.\nHere's the items currently avaiable.",
      fields: [
        { name: "[1]: 6-shot .357 Mag Ruger GP100", value: "\tPrice: 1500₽" },
        { name: "[2]: Cool Boi Badge", value: "  Price: 5000₽"},
        { name: "[3]: Succ Badge", value: "\tPrice: 5000₽" }
      ],
      color: 0xff0000,
      footer: { text: "Do \")store buy [item id]\" to buy an item." }
    }});
  } else if(args[0] == "desc" || args[0] == "description") {
    if(!parseInt(args[1])) return message.channel.createMessage(`Gosh diddly dang it, <@${message.author.id}>. Y've gotta give me an item ID.`);
    switch(parseInt(args[1])) {
      case 1:
        message.channel.createMessage("This item allows access to the `shoot` and `suicide` commands. It's just a revolver, y'know.");
      break;

      case 2:
        message.channel.createMessage("Shows a super cool badge on your profile, letting everyone know that you're, in-fact, a cool boi.");
      break;

      case 3:
        message.channel.createMessage("Gives you a succ badge to be shown on your profile.");
      break;

      default:
        message.channel.createMessage(`<@${message.author.id}>, incorrect ID given.`);
    }

    return;
  } else if(args[0] == "buy") {
    if(!parseInt(args[1])) return message.channel.createMessage(`<@${message.author.id}>, to buy a super cool item, I'm-a need its ID.`);
    if(!users[message.author.id]) users[message.author.id] = { ownsGun: false, candy: 0, badges: [], dailyToday: false, dailyAmount: 0, name: "", desc: "", loc: "" };
    sql.get(`SELECT * FROM players WHERE userID='${message.author.id}'`).then(r => {
      switch(parseInt(args[1])) {
          case 1:
            if(users[message.author.id].ownsGun == true) return message.channel.createMessage(`<@${message.author.id}>, smh, you already got a gun, edgy-boi. Get outta here.`);
              if(!r) {
                sql.run('INSERT INTO players (userID, wins, loses, plays, rubles) VALUES (?, ?, ?, ?, ?)', [message.author.id, 0, 0, 0, 200]);
                return message.channel.createMessage(`<@${message.author.id}>, sorry, baby. If y' want that shiny ol' gun, you's gonna need 1300 more rubles.`);
              }

              if(r.rubles - 1500 < 0) {
                return message.channel.createMessage(`<@${message.author.id}>, what do you think this is, the United States of America? We ain't just gonna give you some fuckin' weapon for free. smh`);
              } else {
                sql.run(`UPDATE players SET rubles = ${r.rubles - 1500} WHERE userID = '${message.author.id}'`);
                users[message.author.id].ownsGun = true;
                users[message.author.id].badges.push("gun");

                message.channel.createMessage(`<@${message.author.id}>, whoo-wee! Y' have fun with that gun there, kiddo. But be careful -- y' don't wanna be blowin' your head off or nothin'.`);
              }
          break;

          case 2:
            if(users[message.author.id].badges.includes("coolboi")) return message.channel.createMessage(`<@${message.author.id}>, no, no, no, no, no. No!`);

            if(!r) {
              sql.run('INSERT INTO players (userID, wins, loses, plays, rubles) VALUES (?, ?, ?, ?, ?)', [message.author.id, 0, 0, 0, 200]);
              return message.channel.createMessage(`<@${message.author.id}>, nah, buddy. Only cool bois can afford this badge, and you're obviously not a cool boi, as you cannot afford it.`);
            }

            if(r.rubles - 5000 >= 0) {
              sql.run(`UPDATE players SET rubles = ${r.rubles - 5000} WHERE userID = '${message.author.id}'`);

              users[message.author.id].badges.push("coolboi");
              message.channel.createMessage(`<@${message.author.id}>, damn, you're super fuckin' cool, man. So cool, in-fact, that one might call you a culo.`);
            } else message.channel.createMessage(`<@${message.author.id}>, hahaha! You're no cool boi, you're just a fucking poser! Get outta here, poser!`);
          break;

          case 3:
            if(users[message.author.id].badges.includes("succ")) return message.channel.createMessage(`<@${message.author.id}>, nay, buddy. One can only be so strong in the succ -- thusly, one may not have this badge more than once.`);

            if(!r) {
              sql.run('INSERT INTO players (userID, wins, loses, plays, rubles) VALUES (?, ?, ?, ?, ?)', [message.author.id, 0, 0, 0, 200]);
              return message.channel.createMessage(`<@${message.author.id}>, no succ for you.`);
            }

            if(r.rubles - 5000 >= 0) {
              sql.run(`UPDATE players SET rubles = ${r.rubles - 5000} WHERE userID='${message.author.id}'`);

              users[message.author.id].badges.push("succ");
              return message.channel.createMessage(`<@${message.author.id}>, the succ is strong in thee. So strong that you have a badge for it, which you probably got by succing.`);
            } else return message.channel.createMessage(`<@${message.author.id}>, I'm sorry, my child, but you've yet to master succ. Thus you shan't recieve your badge in it.`);
          break;
      }
   });
  }
};

exports.info = {
  usage: ")store [args]",
  args: "The arguments can go as follows: Nothing for a list of items on the store. \n`buy` followed by the item ID, which is just the number to the left of the item's name.\nOr `desc`/`description`, followed by the item ID for info on an item.",
  description: "A store for the bot."
};
