const Functions = require('../functions.js');

exports.run = (client, message, args) => {
	var messages = [];

	client.guilds.forEach((guild) => {
		guild.channels.forEach((channel) => {
			if (channel.type == 'text') {
				channel.messages.forEach((message) => messages.push(message));
			}
		})
	})

	if (args[0]) {
		let targetMember = await Functions.resolveGuildMember(message.guild, args[0].toLowerCase());
	}
}