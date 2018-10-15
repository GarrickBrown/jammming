import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist',
      playlistTracks: [{
        name: 'Play Breezy',
        artist: 'Play Breezy',
        album: 'Play Breezy',
        id: 4,
        uri: 4
      },
      {
        name: 'Play Breezy',
        artist: 'Play Breezy',
        album: 'Play Breezy',
        id: 5,
        uri: 5
      },
      {
        name: 'Play Breezy',
        artist: 'Play Breezy',
        album: 'Play Breezy',
        id: 6,
        uri: 6
      }]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let newList = [];
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      newList = this.state.playlistTracks.concat([track]);
    }
    this.setState({
      playlistTracks: newList
    });
  }

  removeTrack(track) {
    let newList = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({
      playlistTracks: newList
    });
  }

  updatePlaylistName(playlist) {
    this.setState({
      playlistName: playlist
    });
  }

  savePlaylist() {
    const trackURIs = [];
    this.state.playlistTracks.map(playlist => trackURIs.push(playlist.uri));
    console.log(trackURIs);
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(tracksArray => {
      this.setState({
        searchResults: tracksArray
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}
            />
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
