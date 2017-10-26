import { Component } from 'react';
import app from '../../lib/app';
import router from 'next/router';

export default function withAuth(AuthComponent) {
	return class Authenticated extends Component {
		constructor(props) {
			super(props)

			this.state = {
				authenticated: false
			};
		}

		componentDidMount() {
			app.authenticate().then(() => {
				this.setState({ authenticated: true })
			}).catch(() => {
				router.replace('/login');
			});
		}

		render() {
			return (
				<div>
				{ this.state.authenticated && (
					<AuthComponent {...this.props}/>
				)}
				</div>
			)
		}
	}
};
