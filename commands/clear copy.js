const discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Dit commando is alleen voor staff!") //zet bij "MANAGE_MESSAGES" de permission neer die chat mag clearen!

  if(!args[0]) return message.channel.send("Je moet wel een hoeveelheid neerzetten wat moet worden verwijderd!");

message.channel.bulkDelete(args[0]).then(() => {

  message.channel.send("Uw berichten zijn verwijderd!").then(msg => delete(2000));
  message.delete()
});
}

module.exports.help = {
  name: "clear"
}
