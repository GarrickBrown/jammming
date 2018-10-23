import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}

	render() {
		return (
			<div className="Playlist">
				<input value={this.props.playlistName} onChange={this.handleNameChange} />
				<TrackList tracks={this.props.playlistTracks}
						   onRemove={this.props.onRemove}
						   isRemoval={true}
				/>
				{ this.props.loading && <img src="http://ajaxloadingimages.net/gif/image?imageId=cloud-upload&foreColor=00bfff&backColor=ffffff&size=64x64&transparent=true&rnd=1540293405926" /> }
				<a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
				
			</div>
		);
	}
};

export default Playlist;