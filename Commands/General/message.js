module.exports.config = {
    name: "message",
    aliases: []
  }
  
  module.exports.run = async (client, message, args) => {
  
    message.channel.send({ content: "Type `.bronze` or `.claim` For claiming **Bronze** Role", failIfNotExists: false })
  
  }

  