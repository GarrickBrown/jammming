import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
/*	renderAction() {
		if (isRemoval === true) {
			return <a className="Track-action">-</a>;
		} else if (isRemoval === false) {
			return <a className="Track-action">+</a>;
		} else {
			console.log('Error: isRemoval variable is not set');
		}
	}
*/
	render() {
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>{/* track name will go here */}</h3>
					<p>{/* track artist will go here */} | {/* track album will go here */}</p>
				</div>
				<a className="Track-action" href=".">{/* + or - will go here */}</a>
			</div>
		);
	}
};

export default Track;