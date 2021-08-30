const util = require("util");
const exec = util.promisify(require("child_process").exec);

const {logToFile, sendDiscordWebhook, executeCommands} = require("./utils.js");

const config = require("./config.json");

let action;

const stealMonitor = async () => {
    const result = await exec(`top -b -n 1 | grep st | awk '{print $16}' | sed '/^[[:space:]]*$/d'`);
    const steal = Number(result.stdout);
    if((steal < config.minToAlert) || (Date.now() < action + 1200000)) return;
    action = Date.now();
    if(config.logging) logToFile(steal);
    if(config.discordWebhook.enabled) sendDiscordWebhook(steal);
    if(config.commandsAfterAlert.length > 0) executeCommands();
}

setInterval(stealMonitor, 5000);