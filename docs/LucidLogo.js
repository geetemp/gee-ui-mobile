import React from 'react';
import { Motion, spring } from 'react-motion';

const squareDelta = -60;
const damping = 30;

const styles = {
	primary: {
		fill: '#2abbb0',
	},
};

export default class extends React.Component {
	constructor(...args) {
		super(...args);

		this.state = {
			isCarpeted: false,
		};
		this.toggleCarpet = this.toggleCarpet.bind(this);
	}

	toggleCarpet() {
		this.setState({
			isCarpeted: !this.state.isCarpeted,
		});
	}

	render() {
		const { isCarpeted } = this.state;

		return <div>geetemp</div>;
	}
}
