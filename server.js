const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

// Store all messages in-memory of our server
const messages = [{ id: 0, text: 'Welcome!', username: 'Chat Room' }];
const sockets = [];

app.use(express.json());

app.listen(3001, () => {
	console.info('Listening on port 3001!');
});

// For polling | Getting messages
app.get('/messages', (req, res) => {
	res.json(messages);
});

// For polling and streaming | Receiving messages
app.post('/messages', (req, res) => {
	const message = req.body;
	messages.push(message);

	for (const socket of sockets) {
		socket.send(JSON.stringify(message));
	}
});

// For streaming
app.ws('/messages', (socket) => {
	// Register listeners
	sockets.push(socket);

	// Remove them on our list of listeners if one of the involved parties decides to close it.
	// Could be due to a network partition or the client closes the connection.
	socket.on('close', () => {
		sockets.splice(sockets.indexOf(socket), 1);
	});
});
