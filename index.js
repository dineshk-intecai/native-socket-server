const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    },
    transports: ["websocket", "polling"],
});

app.get('/', (req, res) => {
    res.send('<h3>Socket Server Running...</h3>');
});

io.on('connection', (socket) => {
    console.log(`User connected : ${socket.id}`);

    socket.on('location_update', ({ lat, lng, partnerId }) => {
        console.log(`Location update : ${lat}, ${lng} - ${partnerId}`);
        io.emit('live_location', { lat, lng, partnerId });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected : ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
