const helpers = require('./helpers');
const messagingApi = require('./messaging-api');
const readline = require('readline'); // a library for handling text inputs from the terminal

// Store message ids and use this as a lookup table to know which messages have been displayed
const displayedMessages = {};

const terminal = readline.createInterface({
	input: process.stdin,
});

function handleTextInput(text) {
	const username = process.env.NAME;
	const messageId = helpers.getRandomInt(100000);
	displayedMessages[messageId] = true;

	const message = { id: messageId, text, username };
	messagingApi.sendMessage(message);
}
module.exports.handleTextInput = handleTextInput;

// Whenever you type text something in the terminal, the callback is gonna run
terminal.on('line', handleTextInput);

function displayMessage(message) {
	console.log(`> ${message.username}: ${message.text}`);
	displayedMessages[message.id] = true;
}

async function getAndDisplayMessages() {
	const messages = await messagingApi.getMessages();

	for (const message of messages) {
		const messageAlreadyDisplayed = message.id in displayedMessages;
		if (!messageAlreadyDisplayed) {
			displayMessage(message);
		}
	}
}

function pollMessages() {
	// Poll every 3s
	setInterval(getAndDisplayMessages, 3000);
}

function streamMessages() {
	const messagingSocket = messagingApi.createMessagingSocket();

	messagingSocket.on('message', (data) => {
		// We parse because remember we from the messaging api, we stringified the object
		const message = JSON.parse(data);
		const messageAlreadyDisplayed = message.id in displayedMessages;
		if (!messageAlreadyDisplayed) {
			displayMessage(message);
		}
	});
}

switch (process.env.MODE) {
	case 'poll':
		getAndDisplayMessages();
		pollMessages();
		break;
	case 'stream':
		getAndDisplayMessages();
		streamMessages();
		break;
	default:
		console.warn('MODE environment variable is not set.');
}
