const discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    const categoryID = "722191653674287174";

    var userName = message.author.username;
    var userDiscrimator = message.author.Discrimator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if(channel.name == userName.toLowerCase() + "-" + userDiscrimator){
            ticketBestaat = true;

            message.reply("Je hebt al een ticket open staan!");

            return
        }
        
    });

    if(ticketBestaat) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Hallo " + message.author.username)
        .setDescription("Je ticket is aangemaakt")
        .setFooter("Stel je vragen/klachten daar in!");

    message.channel.send(embed);

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscrimator, {type: "text"}).then(
       (createdChannel) => {
           createdChannel.setParent(categoryID).then(
               (settedParent) => {
                   
                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'),{
                        SEND_MASSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id,{
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MASSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGES_HISTORY: true
                        
                    });

                    var embedParent = new discord.MessageEmbed()
                    .setTitle(`Hallo ${message.author.username}`)
                    .setDescription("Welkom bij jou ticket, stel hier je vragen of meld een klacht!")
                    .setFooter(`Welkom bij je ticket ${message.author.username}!`);

                settedParent.send(embedParent);


               }
           ).catch(err =>{
               message.channel.send("Er is iets fouts gegaan, probeer het opnieuw!");
           });
       }
    ).catch(err =>{
        message.channel.send("Er is iets fouts gegaan, probeer het opnieuw!");
    });  
}

module.exports.help = {
  name: "ticket"
}