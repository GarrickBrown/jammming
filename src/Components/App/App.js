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
      latestSearch: [],
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
      loading: false
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.doneLoading = this.doneLoading.bind(this);
  }

  addTrack(track) {
    let newPlaylist = [];
    let newResultList = [];
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      newPlaylist = this.state.playlistTracks.concat([track]);
      newResultList = this.state.searchResults.filter(resultTrack => resultTrack.id !== track.id);
    }
    this.setState({
      playlistTracks: newPlaylist,
      searchResults: newResultList
    });
  }

  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    if (this.state.latestSearch.find(searchedTrack => searchedTrack.id === track.id)) {
      let newResultList = this.state.searchResults;
      newResultList.unshift(track);
      this.setState({
        searchResults: newResultList
      });
    }
    this.setState({
      playlistTracks: newPlaylist,
    });

  }

  updatePlaylistName(playlist) {
    this.setState({
      playlistName: playlist
    });
  }

  savePlaylist() {
    this.isLoading();
    const trackURIs = this.state.playlistTracks.map(playlist => playlist.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      console.log(`New ${this.state.playlistName} of ${trackURIs.length} songs successfully saved.`);
      this.updatePlaylistName('New Playlist');
      this.setState({
        playlistTracks: []
      });
    }).then(() => {
        this.doneLoading();
    });
  }

  search(searchTerm) {
    if (!searchTerm) {
      return;
    }
    Spotify.search(searchTerm).then(tracksArray => {
      this.setState({
        latestSearch: tracksArray
      });
      let newList = [];
      for (let trackIndex = 0; trackIndex < tracksArray.length; trackIndex++) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === tracksArray[trackIndex].id)) {
          // Do nothing, continue with code
        } else {
          newList.push(tracksArray[trackIndex]);
        }
      }
      this.setState({
        searchResults: newList
      });
    });
  }

  accessCheck() {
    Spotify.accessCheck();
  }

  isLoading() {
    this.setState({
      loading: true
    });
  }

  doneLoading() {
    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <div>
        {this.accessCheck()}
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
                      loading={this.state.loading}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default App;