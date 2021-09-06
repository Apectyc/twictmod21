module.exports.config = {
    name: "bronze",
    aliases: []
}

module.exports.run = async (client, message, args) => {

    message.reply({ content: "You need to put `discord.gg/freefollow` in your discord custom status , Type `.status` for video link how to change custom status and then do `.claim`", failIfNotExists: false })

}