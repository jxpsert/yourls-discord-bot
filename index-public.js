// Settings

const yourlsURL = "https://yoursite.com"; // your YOURLS site URL, including subdirectory if it's in one
const yourlsSECRET = "yourSecretCode"; // find this on /admin/tools.php
const discordTOKEN = "yourDisordToken"; // find this on your Discord application's page
const discordSTATUS = "Shortening your URLs"; // the bot's status

// Don't touch this unless you know what to do
const yourls = require("yourls");
const discord = require("discord.js");
const validURL = require("valid-url");
const connection = new yourls(yourlsURL, yourlsSECRET);
const client = new discord.Client();
client.on('ready', () => {
    console.log("Connected to Discord as " + client.user.username);
    client.user.setActivity(discordSTATUS);
});
console.log("Connected to YOURLS on " + connection.config.api_url);
client.on('message', message => {
    if(message.content.startsWith("http")){ 
    if(validURL.isUri(message.content)){ // check if it's a valid URL
        connection.shorten(message.content, function(error, result) {
            if (error) {
                throw error;
            }
            console.log("Made new URL " + result.shorturl); // log to console
           message.channel.send(result.shorturl);  // return the newly made short URL
        });
    }else{
        message.channel.send("Not a valid URL.");
    }
}
    if(message.attachments.first()) { // if the message has a picture
        connection.shorten(message.attachments.first().url, function(error, picresult) {
            if (error) {
                throw error;
            }
            console.log("Made new URL " + picresult.shorturl); // log to console
           message.channel.send(picresult.shorturl);  // return the newly made short URL
        });
    }
});
client.login(discordTOKEN);