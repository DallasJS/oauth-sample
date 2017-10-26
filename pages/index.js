import { Component } from 'react';
import app from '../lib/app';
import withAuth from '../component/auth';

const Index = class extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			message: ''
		};

		this.setMessage = this.setMessage.bind(this);
		this.postMessage = this.postMessage.bind(this);
	}

	componentDidMount() {
		app.service('messages').find().then(messages => {
			this.setState({ messages });
		});

		app.service('messages').on('created', message => {
			this.setState({
				messages: this.state.messages.concat([message])
			});
		});
	}

	setMessage(ev) {
		this.setState({ message: ev.target.value });
	}

	postMessage(ev) {
		ev.preventDefault();
		app.service('messages').create({ text: this.state.message });
		this.setState({ message: '' });
	}

	render() {
		const messages = this.state.messages.map(message => <li key={message.id}><em>{message.user}</em>: {message.text}</li>);

		return (
			<div>
				<input value={this.state.message} onChange={this.setMessage}/>
				<input type="button" value="Send Message" onClick={this.postMessage}/>

				<ul>
					{messages}
				</ul>
			</div>
		)
	}
};

export default withAuth(Index);
