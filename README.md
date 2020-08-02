# polling-and-streaming-experiment

Experimenting with the concept of polling vs streaming

## Get Started

Install dependencies

```terminal
npm install
```

Prepare 4 terminals for the:

1. Server
1. Stream Client
1. Poll Client
1. Bot Client

Run Server

```terminal
npm run start:server
```

Run Stream Client

```terminal
npm run start:stream-client
```

Run Poll Client

```terminal
npm run start:poll-client
```

After running both the _Stream Client_ and _Poll Client_, you can start sending messages. Observe how each client display the messages. You'll notice it's almost instantaneous for the messages to appear in the _Stream Client_ if you send messages from the _Poll Client_. However, you'll notice there's a delay before the messages appear in the _Poll Client_ when you send messages from the _Stream Client_. This will be more obvious when you run a client that sends a message in regular intervals. Run the bot client to observe how both the _Poll_ and _Stream_ clients display the messages.

Run Bot Client

```terminal
npm run start:bot-client
```
