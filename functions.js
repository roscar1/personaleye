exports.sendMessage = function(user, data) {
	if (channel.guild) return;

	if (data.type == 'RESPONSE') channel.send(data.sendMessage);
	else if (data.type == 'RESPONSE_MARKED') channel.send(`\`${data.sendMessage}\``);
	else if (data.type == 'RESPONSE_CODE') channel.send(data.sendMessage, { code: true })
	else if (data.type == 'RESPONSE_URL') channel.send(`\`${data.sendMessage}\``);
}

exports.resolveGuildChannel = function(guild, phrase) {
	if (phrase.startsWith('<#') && phrase.endsWith('>')) {
		phrase = phrase.slice(2).slice(0, -1);

		return guild.channels.filter((guildChannel) => guildChannel.type == 'text').find((guildChannel) => guildChannel.id == phrase);
	}

	return guild.channels.filter((guildChannel) => guildChannel.type == 'text').find((guildChannel) => {
		if (guildChannel.name.toLowerCase().includes(phrase)) return true;
		if (guildChannel.id.toString().includes(phrase)) return true;
		return false;
	})
}

exports.resolveGuildMember = function(guild, phrase) {
	if (phrase.startsWith('<@!') && phrase.endsWith('>')) phrase = phrase.slice(3).slice(0, -1);

	return new Promise((resolve, reject) => {
		if (guild.member(phrase)) resolve(guild.member(phrase));

		guild.members.fetch()
		.then((guildMembers) => {
			let filterMember = guildMembers.find((guildMember) => {
				if (guildMember.displayName.toLowerCase().includes(phrase)) return true;
				else if (guildMember.user.tag.toLowerCase().includes(phrase)) return true;
				else if (guildMember.user.username.toLowerCase().includes(phrase)) return true;
				return false;
			})

			resolve(filterMember);
		})
		.catch((err) => {
			reject(err);
		})
	})
}