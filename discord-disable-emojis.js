const Discord = require("discord.js")

module.exports = async (client, options) => {

    const disabledEmojisMessage = (options && options.disabledEmojisMessage) || []
    const disabledEmojisReaction = (options && options.disabledEmojisReaction) || []

    const DMwarnEmojisMessage = (options && options.DMwarnEmojisMessage) || "None"
    if (!DMwarnEmojisMessage) DMwarnEmojisMessage = "None"

    const DMwarnEmojisReaction = (options && options.DMwarnEmojisReaction) || "None"
    if (!DMwarnEmojisReaction) DMwarnEmojisReaction = "None"

    client.on("checkEmojisMessage", async (message) => {
        for (let i = 0; i < disabledEmojisMessage.length; i++) {
            if (message.content.includes(disabledEmojisMessage[i])) {
                message.delete().catch(e => {})
                if (!(DMwarnEmojisMessage === "None")) return message.author.send(DMwarnEmojisMessage)
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
                if (!(DMwarnEmojisReaction === "None")) return message.author.send(DMwarnEmojisReaction)
            }
        }
    })
}