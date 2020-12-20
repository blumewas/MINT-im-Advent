import io from 'socket.io-client';
import { Player } from './player';
import config from './game';

const Client = {};
Client.socket = io();

Client.players = [];

Client.getPlayer = function(nr) {
    return Client.players.find((player) => player.nr === nr);
};

Client.addPlayer = function(nr, color, name, x, y) {
    Client.players.push(new Player(nr, color, name, config.scene, x, y));
};

Client.removePlayer = function(nr) {
    const player = Client.getPlayer(nr);
    if (player) {
        player.playerObj.destroy();
    }
};

Client.start = function() {
    Client.socket.emit('newplayer');
};

Client.socket.on('newplayer', function(data) {
    Client.addPlayer(data.id, data.color, data.name);
});

Client.socket.on('move', function(data) {
    if (data.player_nr === Client.clientId) {
        return;
    }
    const player = Client.getPlayer(data.player_nr);
    if (player) {
        player.move(data.horizontal, data.vertical);
    }
});

Client.socket.on('remove', function(data) {

});

Client.socket.on('allplayers', function(data) {

});

export { Client };
