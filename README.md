# Discord Disable Emojis
Very simple module that allows you to disable emojis (in reactions or in messages) with Discord v12

# Installation
To install this module type the following command in your console:
```
npm i discord-disable-emojis
```

# Warning
Be careful to respect these things for the module to work correctly:

  - For the list of banned emojis, you must use 🙂 and not :slight_smile: for example
  - Go to the configuration of your bot on your control panel of your Discord applications. You must activate the "Privileged Gateway Intents": activate "Presence Intent" and "Server Members Intent"
  - Don't forget to put the partial configuration in your client's definition in your code

# Example
Full example using disable All to disable (as on older versions of the module): 
```js

const Discord = require("discord.js")
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION'] // Remember to include this line otherwise the reactions are not detected
});

const disableEmojis = require("discord-disable-emojis")

client.on('ready', async () => {
    disableEmojis(client, {
        disableAll: disable, // All emojis are allowed, you must forbid them (default: disable)
        // WARNING: For the you must use 🙂 and not :slight_smile: for example
        disabledEmojisMessage: [ // Add as many emoji you want banned in messages
            "💩",
            "🖕"
        ],
        disabledEmojisReaction: [ // Add as many emoji you want banned in reactions
            "💩",
            "🖕"
        ],
        DMwarnEmojisMessage: ":shield: **|** You are not allowed to use this emoji in your message !", // The message that the bot will send in DM to the user who uses a forbidden emoji in a message. Delete this line or enter "None" for any message sent
        DMwarnEmojisReaction: ":shield: **|** You are not allowed to use this emoji in reaction !" // The message that the bot will send in DM to the user who reacts with a forbidden emoji. Remove this line or enter "None" for any message sent
    })

    // Rest of your code
})

client.on('message', message => client.emit('checkEmojisMessage', message)) // This line is used to send the module the necessary information when a message is sent
client.on('messageReactionAdd', (messageReaction, user) => client.emit('checkEmojisReaction', messageReaction, user)) // This line is used to send the module the necessary information when a reaction is added

client.login("YOUR_SUPER_SECRET_TOKEN")
```

Small part of an example to show how disableAll to enable: 

```js
client.on('ready', async () => {
    disableEmojis(client, {
        disableAll: enable, // All emojis are disabled, some must be authorized (default: disable)
        // WARNING: For the you must use 🙂 and not :slight_smile: for example
        allowedEmojisMessage: [ // Add as many emoji you want allowed in messages
            "❤️",
            "🍪"
        ],
        allowedEmojisReaction: [], // Add as many emoji as you want allowed in reactions (nothing: forbid everything, in this case the reactions are disabled)
        DMwarnEmojisMessage: ":shield: **|** You are not allowed to use this emoji in your message !", // The message that the bot will send in DM to the user who uses a forbidden emoji in a message. Delete this line or enter "None" for any message sent
        DMwarnEmojisReaction: ":shield: **|** You are not allowed to use this emoji in reaction !" // The message that the bot will send in DM to the user who reacts with a forbidden emoji. Remove this line or enter "None" for any message sent
    })

    // Rest of your code
})
```

# Patch note
Note: The DisableAll is by default disabled, this will not break old bots that update this module.
__Versions :__
- 1.1.2 :
    - Fix message parsing for DisableAll enable
    - Adding comments to better find your way around the code 
- 1.1.1 :
    - Fix default allowed emojis message & reaction
- 1.1.0 : 
    - Added DisableAll option (suggestion from Nokocchii)
    - Added allowedEmojisMessage option (obvious)
    - Added allowedEmojisReaction option (obvious again)
    - Code optimization 
    - Improvement of README
- 1.0.0 :
    - Creation of the module with its basic options 