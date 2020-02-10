const config = require('../config.json');

module.exports = (client, message) => {
	let args = message.content.trim().split(/ +/g);

	if (message.content.indexOf(config.prefix) != 0) return;
	if (message.author.id != client.user.id) return;
	args[0] = args[0].slice(config.prefix.length);

	let command = args.shift().toLowerCase();
	let cmd = client.commands.get(command);

	if (!cmd) return;
	cmd.run(client, message, args);
}