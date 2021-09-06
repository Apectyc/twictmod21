const Discord = require ("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"], partials: ["MESSAGE", "GUILD_MEMBER", "CHANNEL"] })
const config = require ("./Utility/config.json")
const fs = require ("fs")

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}. Bot Invite: ${await client.generateInvite({ scopes: ["bot", "applications.commands"], permissions: ["ADMINISTRATOR"] })}`)
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const ascii = require ("ascii-table");
const table = new ascii("Bot Commands")
table.setHeading("Command", "Load Status")

fs.readdirSync("./Commands").forEach(dir => {
    let commands = fs.readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith(".js"));
    for (let file of commands) {
        let pull = require (`./Commands/${dir}/${file}`);
        if (pull.config.name) {
            client.commands.set(pull.config.name, pull)
            table.addRow(file.split(".js")[0], "Ready! ")
        } else {
            table.addRow(file.split(".js")[0], "Error!")
            return;
        }
        if (pull.config.aliases && pull.config.aliases.length > 0) {
            pull.config.aliases.forEach(alis => {
                client.aliases.set(alis, pull.config.name)
            })
        }
    }
})
console.log(table.toString())

client.on("messageCreate", async message => {

    if (message.author.bot || message.channel.type === "DM" || !message.content.startsWith(config.prefix)) return;

    let prefix = config.prefix
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
  
    let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
    if (!commandfile) {return};

    commandfile.run(client, message, args).catch(err => { console.error(err) })
})

client.login(config.token)
