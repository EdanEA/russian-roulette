exports.run = function(message, args) {
  if(!users[message.author.id]) users[message.author.id] = {ownsGun: false, candy: 0, badges: [], dailyToday: false,  dailyAmount: 0, name: "", desc: "", loc: ""};
  if(!args[0] || args[0] == "info") {
    sql.get(`SELECT * FROM players WHERE userID='${message.author.id}'`).then(r => {
      return message.channel.createMessage({embed: {
        color: 0xff0000,
        fields: [
          { name: "Rubles (₽)", value: `${r.rubles}₽`, inline: true },
          { name: "Number of Unpaid Loans", value: `${users[message.author.id].dailyAmount} loans to date`, inline: true }
        ],
        author: { icon_url: message.author.avatarURL, name: `${message.author.username}'s Bank Account` }
      }});
    });
  } else if(args[0] == "daily" || args[0] == "loan") {
    if(users[message.author.id].dailyToday == false) {
      sql.get(`SELECT * FROM players WHERE userID='${message.author.id}'`).then(r => {
        sql.run(`UPDATE players SET rubles = ${r.rubles + 200} WHERE userID='${message.author.id}'`);
        message.channel.createMessage(`<@${message.author.id}>, aw yeah, you got 200₽. Y've got ${r.rubles + 200} now.`);
      });

      users[message.author.id].dailyToday = true;
      users[message.author.id].dailyAmount += 1;

      return;
    } else {
      return message.channel.createMessage(`Whoops! You can't get any more 'til later, baby boi. You've got like ${dailyHours} hours, until you can use this again.`);
    }
  }
};

exports.info = {
  usage: ")bank [args]",
  args: "Either nonthing to see the amount of rubles, you've got in the bank.\nOr, `loan`/`daily` to take out a loan to buy useless shit.",
  description: "The bank... oh, what a wonderful place. Like any other bank, Bank of Edab INC. allows you to store money within its locations, as well as take out loans. Though, within this particular banking system, there are loan-shark-esque practices in place; allowing you to take out endless amounts of loans, sending you into immense debt. Do know, that despite their more refined manner, they will come eventually to claim their money."
};
