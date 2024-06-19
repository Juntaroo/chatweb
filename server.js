import express from "express"
import http from "http";
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static('public'));


//Detecta si el cliente esta conectado o no y manda un mensaje en ambos casos
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    //Recibe el mensaje del cliente y lo envia
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});