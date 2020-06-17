const discord = require("discord.js")

module.exports.run = async(bot, message, args) => {

    // !announcement title | bericht | kleur | kanaal

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij kunt dit niet doen. Je hebt de perm ``KICK_MEMBERS`` nodig.");

    var seperator = ",";

    if(args[0] == null){

        var embed = new discord.MessageEmbed()
        .setTitle("Mededeling")
        .setColor("#00ee00")
        .setDescription(`Maak een bericht door gebruik te maken van: \n :bericht ${seperator} bericht ${seperator} kleur ${seperator} kanaal`);

        return message.reply(embed);

    }

    var argsList = args.join(" ").split(seperator);

    if(argsList[2] === undefined) argsList[2] = "#eeeeee";
    if(argsList[3] === undefined) argsList[3] = "#berichten";

    var options = {

        titel: argsList[0],
        bericht: argsList[1] || "Geen inhoud meegegeven",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()
    }


    var  announceEmbed = new discord.MessageEmbed()
        .setTitle("Bericht")
        .setColor(options.kleur)
        .setDescription(`Bericht van _**${message.author}**_ \n\n **${options.titel}** \n${options.bericht}`)
        .setTimestamp();

    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if(!channel) return message.reply("Dit kanaal is niet gevonden.")

    channel.send(announceEmbed);

}

module.exports.help = {
    name: "bericht"
}