const fs = require("fs");
const moment = require("moment");
const fetch = require("node-fetch");

const util = require("util");
const exec = util.promisify(require("child_process").exec);

const config = require("./config.json");

const logToFile = (steal) => {
    const file = fs.readFileSync("steal.log");
    fs.writeFileSync("steal.log", `${file}[${moment().format("YYYY-MM-DD HH:mm:ss")}] Steal ${steal}%\n`);
}

const sendDiscordWebhook = async (steal) => {
    return await fetch(config.discordWebhook.webhook.url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(config.discordWebhook.webhook.message).replaceAll('[STEAL]', steal)
    });
}

const executeCommands = async () => {
    for(const cmd of config.commandsAfterAlert) {
        await exec(cmd);
    }
}

module.exports = {logToFile, sendDiscordWebhook, executeCommands}