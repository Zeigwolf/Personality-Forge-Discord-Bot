const DiscordJS = require( "discord.js")
const { Intents } = require("discord.js")
const dotenv = require("dotenv")
const fetch = require("node-fetch")

dotenv.config()

const client = new DiscordJS.Client({
    partials: [
        "CHANNEL",
        "MESSAGE",
        "USER"
    ],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

client.on(`ready`, () => {
    console.log(`The bot is ready!`)
})
 
client.login(process.env.TOKEN)

const apiKey = process.env.apikey
const botID = process.env.BotID

client.on("messageCreate", (message) => {
    if (message.author.bot) {
        return
    }
    if (message.channel.type == "DM") {
        (async function forge() {
            try{
                let response = await fetch(`https://www.personalityforge.com/api/chat/?apiKey=${apiKey}&chatBotID=${botID}&message=${message.content}&externalID=${message.author.tag}`)
                let data = await response.json()
                let body = data.message.message
                let reply = `${body}`.replace(/<br>/g,"\n")
                message.channel.send(reply)
            } catch (error) {
                console.error(error)
                message.reply(`There was an error!`)
            }
        })()
    }
})

client.on(`guildMemberAdd`, member => {
    member.send("Welcome to the server! Chat to my bot here!")
})