import WS from 'ws';

const wss = new WS.Server({ port: 8085 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('received: %s', message);
        ws.send(JSON.stringify({ version: '1', content: 'SubscriptionAccepted' }));
    });

    // ws.send('something');
});
