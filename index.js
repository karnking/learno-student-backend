const cors = require('cors');
const app = require('express')();
app.use(cors());
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
io.on('connection', (client) => {
    client.on('notification', (msg) => {
        console.log('Message Received: ', msg);
        io.emit('notification', msg);
    });
});
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.get('/send-notification', (req, res) => {
    io.emit('notification', 'Notification from server');
    res.send('Notification sent');
});
server.listen(8080);