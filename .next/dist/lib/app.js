'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _client = require('feathers/client');

var _client2 = _interopRequireDefault(_client);

var _client3 = require('feathers-socketio/client');

var _client4 = _interopRequireDefault(_client3);

var _feathersAuthenticationClient = require('feathers-authentication-client');

var _feathersAuthenticationClient2 = _interopRequireDefault(_feathersAuthenticationClient);

var _feathersHooks = require('feathers-hooks');

var _feathersHooks2 = _interopRequireDefault(_feathersHooks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = require('socket.io-client');

var socket = io('http://localhost:9001');

var app = (0, _client2.default)();
app.configure((0, _client4.default)(socket)).configure((0, _feathersHooks2.default)()).configure((0, _feathersAuthenticationClient2.default)({
	cookie: 'feathers-jwt'
}));

exports.default = app;