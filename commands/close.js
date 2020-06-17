const discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    const categoryID = "722191653674287174";

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, maar je hebt geen voldoende rechten!");

    if(message.channel.parentID == categoryID){
        message.channel.delete();
        
        // create embed
    var embedCreateTicket = new discord.MessageEmbed()
    .setTitle("Ticket, " + message.channel.name)
    .setDescription("Ticket gemarkeerd als **afgehandeld**." )
    .setFooter("Ticket geclosed door " + message.author.username);

    // logs
    var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "ticket-logs");
    if(!ticketChannel) return message.reply("Deze kanaal is niet gevonden!");

    ticketChannel.send(embedCreateTicket);
   
    } else {

        message.channel.send("Dit command is alleen te gebruiken bij een ticket.");


    }

    
}

module.exports.help = {
  name: "sluit"
}
