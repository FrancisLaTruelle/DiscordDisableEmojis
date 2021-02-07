const Discord = require("discord.js")
const emojiRegex = require('emoji-regex/RGI_Emoji.js');

module.exports = async (client, options) => {

    const disableAll = (options && options.disableAll) || "disable"

    const DMwarnEmojisMessage = (options && options.DMwarnEmojisMessage) || "None"
    if (!DMwarnEmojisMessage) DMwarnEmojisMessage = "None"

    const DMwarnEmojisReaction = (options && options.DMwarnEmojisReaction) || "None"
    if (!DMwarnEmojisReaction) DMwarnEmojisReaction = "None"

    function DMwarnMessage(user) {
        if (!(DMwarnEmojisMessage === "None")) return user.send(DMwarnEmojisMessage).catch(e => {})
    }
    function DMwarnReaction(user) {
        if (!(DMwarnEmojisReaction === "None")) return user.send(DMwarnEmojisReaction).catch(e => {})
    }

    if (disableAll === "disable") {
        const disabledEmojisMessage = (options && options.disabledEmojisMessage) || []
        const disabledEmojisReaction = (options && options.disabledEmojisReaction) || []

        client.on("checkEmojisMessage", async (message) => {
            for (let i = 0; i < disabledEmojisMessage.length; i++) {
                if (message.content.includes(disabledEmojisMessage[i])) {
                    message.delete().catch(e => {})
                    DMwarnMessage(message.author)
                }
            }
        })
    
        client.on("checkEmojisReaction", async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
        
            let message = reaction.message;
            if(!message) return;
            if(user.bot) return;
    
            for (let i = 0; i < disabledEmojisReaction.length; i++) {
                if (reaction.emoji.name === disabledEmojisReaction[i]) {
                    reaction.users.remove(user.id)
                    DMwarnReaction(user)
                }
            }
        })
    } else if (disableAll === "enable") {
        const allowedEmojisMessage = (options && options.allowedEmojisMessage) || []
        const allowedEmojisReaction = (options && options.allowedEmojisReaction) || []

        client.on("checkEmojisMessage", async (message) => {
            if (!allowedEmojisMessage.length) {
                let checked = message.content.match(emojiRegex())
                if(checked && checked.length) {
                    message.delete().catch(e => {})
                    DMwarnMessage(message.author)
                }
            }

            for (let i = 0; i < allowedEmojisMessage.length; i++) {
                if (message.content.includes(allowedEmojisMessage[i])) {
                    return
                }
            }
            message.delete().catch(e => {})
            DMwarnMessage(message.author)
        })

        client.on("checkEmojisReaction", async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
        
            let message = reaction.message;
            if(!message) return;
            if(user.bot) return;
    
            if (!allowedEmojisReaction.length) {
                reaction.users.remove(user.id)
                DMwarnReaction(user)
            }

            for (let i = 0; i < allowedEmojisReaction.length; i++) {
                if (reaction.emoji.name === allowedEmojisReaction[i]) {
                    return
                }
            }
            reaction.users.remove(user.id)
            DMwarnReaction(user)
        })
    } else {
        throw new Error("The disableAll parameter is invalid (enable/disable)")
    }
}