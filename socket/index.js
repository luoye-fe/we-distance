import http from 'http';
import Socket from 'socket.io';

export default function InitSocket(app, server) {

    let io = Socket(server);


    let result = {
        her: {},
        him: {}
    }
    io.on('connection', (socket) => {
        socket.emit('init');
        socket.on('check', (who) => {
            socket.emit('checked');
        })
        socket.on('send-location-to-server', (obj) => {
            result[obj.who].x = obj.location.x;
            result[obj.who].y = obj.location.y;
            if (!Object.keys(result.her) || !Object.keys(result.him)) {
            	io.sockets.emit('other-offline');
            } else {
            	io.sockets.emit('send-location-to-clients', result);
            }
        })
        socket.on('leave', (who) => {
        	result[who] = {};
        })
    });
}
