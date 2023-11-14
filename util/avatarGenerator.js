function generateIdenticonAvatar (seed) {
	return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;
}

export {
	generateIdenticonAvatar
}