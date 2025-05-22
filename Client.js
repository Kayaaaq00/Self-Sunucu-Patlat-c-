const Discord = require("discord.js")
const { Client } = require("discord.js-selfbot-v13")
class Botlar extends Client {
constructor(options) {
super({
options,
fetchAllMembers: true,
checkUpdates: true,
});
this.on("rateLimit", (rate) => { console.log("Client Rate Limit'e Uğradı; " + rate) });
this.on("warn", (warn) => { console.log(warn) });
this.on("error", (error) => { console.log(error) });
process.on('unhandledRejection', (reason, promise) => {console.error('Unhandled Rejection at:', promise, 'reason:', reason);});
process.on("warning", (warn) => { console.log(warn) });
}
}

module.exports = { Botlar };