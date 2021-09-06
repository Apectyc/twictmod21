module.exports.config = {
    name: "ping",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    message.reply({ content: `Pong! \`${client.ws.ping}ms\`` })
}