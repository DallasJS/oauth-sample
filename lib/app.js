import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';
const io = require('socket.io-client');

const socket = io();

const app = feathers();
app.configure(socketio(socket))
	.configure(hooks())
	.configure(auth({
		cookie: 'feathers-jwt'
	}));

export default app;
