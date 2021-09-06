module.exports.config = {
    name: "claim",
    aliases: []
}

module.exports.run = async (client, message, args) => {

    console.log(message.member.presence.activities)
    if (!message.member.presence.activities) return message.channel.send("no vanity no rewards son.")
    if (message.member.presence.activities.some(r => r.state ? r.state.includes("discord.gg/freefollow") : null)) {
        message.member.roles.add("881406219401695234")
        message.reply({ content: "You've claimed the **Bronze** plan. **PLEASE NOTE:** This role will only stay for as long as you have a vanity invite to the guild in your custom status. The moment it is removed you will lose your role and must reclaim it. ", failIfNotExists: false })
    } else {
    // respond if the users dOhont have status
      message.channel.send("Your custom status doesn't include one of the following options,`discord.gg/freefollow`, in order to claim the **Bronze** role, your status must include one of these. Please update your status and try again.")
    }
}

// ok try now
// i know the error okey try a
// one more time lmfao
// try nowit do