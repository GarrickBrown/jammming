import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
	render() {
		return (
			<div className="TrackList">
				{/* You will add a map method that renders a set of Track components */}
				<div className="Track">
					<div className="Track-information">
						<h3>Track Name</h3>
						<p>Track Artist | Track Album</p>
					</div>
					<a className="Track-action" href=".">+</a>
				</div>
				<div className="Track">
					<div className="Track-information">
						<h3>Track Name</h3>
						<p>Track Artist | Track Album</p>
					</div>
					<a className="Track-action" href=".">+</a>
				</div>
				<div className="Track">
					<div className="Track-information">
						<h3>Track Name</h3>
						<p>Track Artist | Track Album</p>
					</div>
					<a className="Track-action" href=".">+</a>
				</div>
			</div>
		);
	}
};

export default TrackList;