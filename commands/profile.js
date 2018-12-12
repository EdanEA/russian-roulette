exports.run = function(message, args) {
  if(!users[message.author.id]) users[message.author.id] = { ownsGun: false, candy: 0, badges: [], dailyToday: false, dailyAmount: 0, name: "", desc: "", loc: "" };
  function getProfile(id) {
    if(client.users.get(id).bot) return message.channel.createMessage(`<@${message.author.id}>, no! Bad!`)
    if(!client.users.get(id)) return null;
    if(!users[id]) users[id] = { ownsGun: false, candy: 0, badges: [], dailyToday: false, dailyAmount: 0, name: "", desc: "", loc: "" };

    var embed = {color: 0xff0000, thumbnail: { url: client.users.get(id).avatarURL  }};

    var b = ""
    for(var badge of users[id].badges) {
      if(badge == "coolboi") b += "<:coolboi:503492725396733952> ";
      else if(badge == "succ") b += "<:succ:503496826951958536> ";
      else if(badge == "gun") b += "<:gun:503659704950587412>";
    }

    var name = !users[id].name ? client.users.get(id).username : users[id].name;
    var desc = !users[id].desc ? `I'm a ghey boi lmao xd` : users[id].desc;
    var loc = !users[id].loc ? `Unknown` : users[id].loc;
    var rub = 0;
    if(!b) b = "None.";

    sql.get(`SELECT * FROM players WHERE userID ='${id}'`).then(r => {
      if(!r) {
        sql.run(`INSERT INTO players (userID, wins, loses, plays, rubles) VALUES (?, ?, ?, ?, ?)`, [id, 0, 0, 0, 200]);
        rub = 200;
      } else rub = r.rubles;

        embed.fields = [{name: "Name", value: name, inline: true}, {name: "Description", value: desc, inline: true}, {name: "Badges", value: b, inline: true}, {name: "Monies", value: `${rub}₽`, inline: true}, {name: "Current Place of Residence", value: loc, inline: true}];
        return message.channel.createMessage({embed: embed});
    });
  }

  async function setInfo(id, type='all') {
    var desc;
    var name;
    var loc;

    var ahh;
    if(type == "all") ahh = "description";
    else if(type == "desc") ahh = "description";
    else if(type == "loc") ahh = "location";
    else if(type == "name") ahh = "name";

    var d = await message.channel.createMessage(`What shall be your ${ahh}?`).then(async m => {
      if(type == "all" || type == "desc") {
        var info = await message.channel.awaitMessages(msg => id == msg.author.id, {maxMatches: 1, time: 60000});
        if(!info[0]) return message.channel.createMessage(`<@${id}>, c'mon! Y' didn't gimme nothing. reeee`);
        if(info[0].content.length > 1024) return message.channel.createMessage(`That shit's too long, baby boy.`);
        else users[id].desc = info[0].content;
        info[0].delete();

        if(type == "desc") m.edit("k thx bye");
      }

      if(type == "all" || type == "loc") {
        type == "all" ? m.edit("What shall be your location?") : null;
        var info = await message.channel.awaitMessages(msg => id == msg.author.id, {maxMatches: 1, time: 60000});
        if(!info[0]) return message.channel.createMessage(`<@${id}>, ahhhhhhhhhhhhh!`);
        if(info[0].content.length > 1024) return message.channel.createMessage(`That shit's too long, baby boy.`);
        else users[id].loc = info[0].content;
        info[0].delete();

        if(type == "loc") m.edit("k thx bye");
      }

      if(type == "all" || type == "name") {
        type == "all" ? m.edit("What shall be your name?") : null;
        var info = await message.channel.awaitMessages(msg => id == msg.author.id, {maxMatches: 1, time: 60000});
        if(!info[0]) return message.channel.createMessage(`<@${id}>, god fuckin' damn it.`);
        if(info[0].content.length > 1024) return message.channel.createMessage(`That shit's too long, baby boy.`);
        else users[id].name = info[0].content;
        (info[0].delete(), m.edit("k thx xd"));
      }
    });
  }

  if(!args[0]) {
    getProfile(message.author.id);
  } else if(args[0] == "set") {
    if(!args[1] || args[1] == "all") setInfo(message.author.id);
    else if(args[1] == "description" || args[1] == "desc") setInfo(message.author.id, "desc");
    else if(args[1] == "location" || args[1] == "loc") setInfo(message.author.id, "loc");
    else if(args[1] == "name") setInfo(message.author.id, "name");
    else setInfo(message.author.id);
  } else if(client.users.get(args[0])) {
    getProfile(args[0]);
  } else if(message.mentions[0]) {
    getProfile(message.mentions[0].id);
  } else if(!client.users.get(args[0]) && args[0]) {
    var uid = client.users.find(u => u.username.toLowerCase() == args[0].toLowerCase() || u.username.toLowerCase().search(args[0]) == 1 || u.username.toLowerCase().includes(args[0])).id;
    getProfile(uid);
  } else return message.channel.createMessage(`<@${message.author.id}>, why can we not have good things? Why must you insist on ruining everything?`);
};

exports.info = {
  usage: ")profile [args]",
  args: "If you want to set certain information for your profile, you can simply type `set`. This will have you provide answers, as to set information on your profile.\nTo see a certain user's profile, you can mention them, give a user ID, or just a user's name.",
  description: "Shows some user information, badges, etcetera."
};
