// 1) Install VSCode -- https://code.visualstudio.com/download
// 2) Set up your application in the discord developer portal to create your bot name -- Worn off Keys -- https://discord.com/developers/applications
// 3) Install node.js -- https://nodejs.org/en/download/
// 4) Create a folder for bot, drag folder into vs code to sync
// 5) In VSCode, Terminal, New Terminal
// 6) In the terminal, type "npm init -y", you should now have a Package.json file in your folder
// 7) In the terminal, type "npm install discord.js donenv", you should now have a node_modules folder, and a Package-lock.json file in your folder
// 8) Create a new file called "index.js"
// 9) Create a new file called ".env"
//10) In the .env file, add "TOKEN=123abc"
//11) In the discord developer portal, under "Bot", "Build-A-Bot", click copy to get your Token. Replace "123abc" with this token in your .env file

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
    console.log("Message seen")
    if (message.author.bot) {
        return
    }
    if (message.channel.type == "DM") {
        (async function forge() {
            try{
                console.log("fetching")
                let response = await fetch(`https://www.personalityforge.com/api/chat/?apiKey=${apiKey}&chatBotID=${botID}&message=${message.content}&externalID=${message.author.tag}`)
                let data = await response.json()
                console.log(data)
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

////// Add your bot to your discord server
////// To run your bot, type "node index.js" in the terminal, use Ctrl+c to stop running your bot