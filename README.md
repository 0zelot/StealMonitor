# StealMonitor
Simple app that allows you to control Steal CPU on the Linux server.

Sometimes some VPS delivers practice overselling. If the level of steal is high, your server may run out of the CPU power so it will work with reduced efficiency. This app will notify you with a high level of Steal CPU. 

## Instalation

All you need to do is place files in any directory on your server, you will configure the application and run it. 

Upload files on your server or use `git clone https://github.com/0zelot/StealMonitor.git`.

Next, install all dependencies using `npm install` command. You must be in the catalog where you placed app files.

## Configuration

To configure, modify the `config.json` file.

* `minToAlert` - minimum steal value to send alert (Number)

* `logging` - saving logs to file (Boolean)

* `commandsAfterAlert` - execute SSH commands when Steal exceeds the previously determined value (Array)

* Discord Webhook
    * `enabled` - enable or disable Discord Webhook alerts (Boolean)

    * `url` - Discord Webhook URL (String)

    * `message` - object of Discord Webhook message (Object)

## Running

To make application work all time, run it through [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) or [screen](https://www.geeksforgeeks.org/screen-command-in-linux-with-examples/).

For example: `screen -dmS stealmonitor node index.js`.