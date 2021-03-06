const CLIENT_ID = 'enter your client ID here';
const REDIRECT_URI = 'http://jahjammming.surge.sh/';
let accessToken;
let expiresIn;

const Spotify = {
	getAccessToken() {
		if (accessToken) {
			 console.log('using access token');
			return accessToken;
		}
		const authorizeUrlRedirect = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}`;
		window.location.href = authorizeUrlRedirect;
		console.log('attempt to retrieve access token');
	},

	accessCheck() {
		console.log('access check:');
		let url = window.location.href;
		if (!accessToken) {
			console.log('no access token');
		}
		if (accessToken) {
			console.log('already have access token');
		} else if (url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
			accessToken = url.match(/access_token=([^&]*)/)[1];
			expiresIn = url.match(/expires_in=([^&]*)/)[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			console.log('attempt to retrieve access token successful');
			console.log(`access token expires in ${expiresIn} seconds`);
		}
	},

	async search(searchTerm) {
		const token = this.getAccessToken();
		const authorizationHeader = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};
		const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
		try {
			const response = await fetch(searchUrl, authorizationHeader);
			if (response.ok) {
				const jsonResponse = await response.json();
				let tracksArray = [];
				if (!jsonResponse.tracks) {
					return tracksArray;
				}
				tracksArray = jsonResponse.tracks.items.map(track => {
					return {
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name,
						uri: track.uri,
						preview_url: track.preview_url
					};
				});
				return tracksArray;
			}
		} catch(error) {
			console.log(error);
		}
	},

	async savePlaylist(playlistName, playlistTracks) {
		if (!playlistName || !playlistTracks) {
			return;
		}
		const token = this.getAccessToken();
		const authorizationHeader = {
				Authorization: `Bearer ${token}`
		};
		let user_id;
		let playlist_id;
		let snapshot_id;
		const userUrl = 'https://api.spotify.com/v1/me';

		try {
			const response = await fetch(userUrl, {
				headers: authorizationHeader
			});
			if (response.ok) {
				const jsonResponse = await response.json();
				user_id = jsonResponse.id;
				try {
					const createPlaylistUrl = `https://api.spotify.com/v1/users/${user_id}/playlists`;
					const response = await fetch(createPlaylistUrl, {
						method: 'POST',
						headers: authorizationHeader,
						body: JSON.stringify({
							name: playlistName,
							public: false
						})
					});
					if (response.ok) {
						const jsonResponse = await response.json();
						playlist_id = jsonResponse.id;
						try {
							const addPlaylistUrl = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`;
							const response = await fetch(addPlaylistUrl, {
								method: 'POST',
								headers: authorizationHeader,
								body: JSON.stringify({
									uris: playlistTracks
								})
							});
							if (response.ok) {
								const jsonResponse = await response.json();
								snapshot_id = jsonResponse.snapshot_id;
							}
						} catch(error) {
							console.log(error);
						}
					}
				} catch(error) {
					console.log(error);
				}
			}
		} catch(error) {
			console.log(error);
		}


	}
};

export default Spotify;