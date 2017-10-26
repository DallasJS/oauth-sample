const next = require('next');
const feathers = require('feathers');

const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const configuration = require('feathers-configuration');
const memory = require('feathers-memory');
const hooks = require('feathers-hooks');

const authentication = require('feathers-authentication');
const { restrictToAuthenticated, associateCurrentUser } = require('feathers-authentication-hooks');
const jwt = require('feathers-authentication-jwt');
const oauth2 = require('feathers-authentication-oauth2');
const Strategy = require('passport-github');

const messages = require('./services/messages');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
	const app = feathers()
		.configure(configuration())
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({ extended: true }))
		.configure(hooks())
		.configure(rest())
		.configure(socketio())

		.get('/login', handle);

	const config = app.get('authentication');
	const options = Object.assign({
		name: 'github',
		Strategy
	}, app.get('authentication').github);

	app.configure(authentication(app.get('authentication')))
		.configure(jwt())
		.configure(oauth2(options))

		.use('/messages', messages)
		.use('/users', memory())
		.get('*', handle)

		.use(errorHandler());

	app.service('messages').hooks({
		before: {
			create: [
				restrictToAuthenticated()
			],
			create: [
				associateCurrentUser({ idField: 'email', as: 'user' })
			]
		}
	});

	app.service('users').hooks({
		before: {
			create: [
				hook => {
					if (hook.data.github) {
						hook.data.email = hook.data.github.profile.emails.find(email => email.primary).value;
					}
				}
			]
		}
	});

	app.service('authentication').hooks({
		before: {
			create: [
				authentication.hooks.authenticate(['jwt'])
			]
		}
	});

	app.listen(app.get('port'));
});

process.on('unhandledRejection', e => console.log(e));
