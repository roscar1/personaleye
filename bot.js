const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');

client.on('ready', () => {
	client.commands = new Discord.Collection();

	fs.readdir('./commands/', (err, files) => {
		files.forEach((file) => {
			if (!file.endsWith('.js')) return;
			let command = require(`./commands/${file}`);
			let commandName = file.split('.')[0];
			client.commands.set(commandName, command);
		})
	})

	fs.readdir('./events/', (err, files) => {
		files.forEach((file) => {
			let event = require(`./events/${file}`);
			let eventName = file.split('.')[0];
			client.on(eventName, event.bind(null, client));
		})
	})
})

client.login(config.token)