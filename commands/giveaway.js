const discord = require("discord.js");
const ms = require("ms");


module.exports.run = async(client, message, args) => {

    if (!message.member.hasPermission(`KICK_MEMBERS`)) return message.reply('je hebt niet de goeie permissie om dit te doen. Je hebt de ``KICK_MEMBERS`` permissie nodig.');

    if (!args[0]) return message.channel.send(`Je hebt geen tijd ingevoerd!`);
    if (!args[0].endsWith("d") &&
        !args[0].endsWith("h") &&
        !args[0].endsWith("m")
    )
        return message.channel.send(
            `Je hebt voor die tijd niet de juiste opmaak gebruikt!`
        );
    if (isNaN(args[0][0])) return message.channel.send(`Dat is geen nummer!`);
    let channel = message.mentions.channels.first();
    if (!channel)
        return message.channel.send(
            `Ik heb het kanaal niet gevonden!`
        );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`Geen prijs neergezet.`);
    message.channel.send(`*Giveaway gemaakt in ${channel}*`);
    let Embed = new discord.MessageEmbed()
        .setTitle(`Nieuwe giveaway!`)
        .setDescription(
            ` ${message.author} heeft een giveaway gestart, met als prijs: **${prize}**`
        )
        .setTimestamp(Date.now() + ms(args[0]))
        .setColor(`BLUE`);
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
        if (m.reactions.cache.get("🎉").count <= 1) {
            message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
            return message.channel.send(
                `Er reageerden niet genoeg mensen om een winnaar te trekken!`
            );
        }

        let winner = m.reactions.cache
            .get("🎉")
            .users.cache.filter((u) => !u.bot)
            .random();
        channel.send(
            `De winnaar van de giveaway  **${prize}** is... ${winner}`
        );
    }, ms(args[0]));

}

module.exports.help = {
    name: "giveaway"
}