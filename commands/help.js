const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    try{

        var text = "**Wsshes Hulp:** \n\n **__Commands:__** \n :help - Hier zie je de commands van de bot \n\n **__Staff Commands:__** \n :ban gebruiker reden(en); dit zal een gebruiker verbannen van de server! \n :kick gebruiker reden(en); zit zal een lid uit de server schoppen \n :bericht onderwerp tekst kleur kanaal; hier kan je een bericht achterlaten! \n :mute gebruiker tijd; dit zal een gebruiker muten. (is nog geen openbare command!) \n :ticket; dit zal een ticket aanmaken. (is nog geen openbare command!)";
    
        message.author.send(text);
    
        message.reply("De commando's zijn in je prive berichten! Geen berichten ontvangen? Je dm staan op friends only.")
    }catch(error){
        message.reply("Er is iets misgegaan, probeer het opnieuw!")
    }
    
    }
    
    module.exports.help = {
        name: "help"
    }