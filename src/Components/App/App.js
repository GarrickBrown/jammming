import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: 'Breezy',
        artist: 'Breezy',
        album: 'Breezy',
        id: 1
      },
      {
        name: 'Breezy',
        artist: 'Breezy',
        album: 'Breezy',
        id: 2
      },
      {
        name: 'Breezy',
        artist: 'Breezy',
        album: 'Breezy',
        id: 3
      }],
      playlistName: 'Breezy Playlist',
      playlistTracks: [{
        name: 'Play Breezy',
        artist: 'Play Breezy',
        album: 'Play Breezy',
        id: 4
      },
      {
        name: 'Play Breezy',
        artist: 'Play Breezy',
        album: 'Play Breezy',
        id: 5
      },
      {
        name: 'Play Breezy',
        artist: 'Play Breezy',
        album: 'Play Breezy',
        id: 6
      }]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
