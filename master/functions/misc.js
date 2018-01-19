module.exports = {
  randomStatus(t) {
    var statuses = [
      { name: "try )secrets",   type: 0 },
      { name: "your screams", type: 2 },
      { name: "use )help", type: 0  },
      { name: "ur mum xd", type: 3  },
      { name: "join shit server: https://discord.me/xdd", type: 1, url: "https://discord.me/xdd" },
      { name: `in ${client.guilds.size} servers | Use )help`},
      { name: "https://github.com/EdanEA/russian-roulette", type: 1, url: "https://github.com/EdanEA/russian-roulette" },
      { name: "Look at the shit website: https://edanea.github.io", type:1, url: "https://edanea.github.io" },
      { name: "eat me out with a bit of mustard", type: 2}
    ];


    if(!t) return client.editStatus("dnd",statuses[Math.floor(Math.random() * statuses.length)]);
    else client.editStatus("dnd", statuses[t]);
    console.log(statuses[t]);
    return;
  },

  dailyBackup() {
    client.getDMChannel(owner.id).then(channel => {
      var t = moment().format("MMM Do YY");
      var data = fs.readFileSync('./stats.sqlite');
      channel.createMessage({content: "ur mom"}, {file: data, name: `Backup: ${t}.sqlite`});
    });
  }
};
