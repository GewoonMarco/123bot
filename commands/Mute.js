const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Wacht is even. Jij mag dit helemaal niet!");

    if (!args[0]) return message.reply("Geen gebruiker opgegeven.");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen voldoende rechen hiervoor!");

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!mutePerson) return message.reply("Kan de gebruiker niet vinden.");

    if (mutePerson.hasPermission('MANAGE_MESSAGES')) return message.reply('Wacht even. Wil jij nu een hoge rank muten? Ben je helemaal gek geworden?!?')

    var muteRole = message.guild.roles.cache.get('722516695083909140')
    if (!muteRole) return message.channel.send("Kan de Mute rol niet vinden.")

    var muteTime = args[1];

    if (!muteTime) return message.channel.reply("Geef een tijd op.");

    await(mutePerson.roles.add(muteRole.id));
    message.channel.send(`${mutePerson} is gemuted voor ${muteTime}`);


    
}

module.exports.help = {
    name: "mute"
}