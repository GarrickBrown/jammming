const CLIENT_ID = '282f432a01c645bc88179e2176769124';
const REDIRECT_URI = 'http://localhost:3000/';
let accessToken;
let expiresIn;

const Spotify = {
	getAccessToken() {
		if (accessToken) {
			console.log('already have access token');
			return accessToken;
		}
		let url = window.location.href;
		if (url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
			accessToken = url.match(/access_token=([^&]*)/)[1];
			expiresIn = url.match(/expires_in=([^&]*)/)[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			console.log('attempt to retrieve access token successful');
			return accessToken;
		} else {
			const authorizeUrlRedirect = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
			window.location.href = authorizeUrlRedirect;
			console.log('attempt to retrieve access token');
		}
	},

	async search(searchTerm) {
		const token = this.getAccessToken();
		const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
		try {
			const response = await fetch(searchUrl, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
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
						uri: track.uri
					};
				});
				return tracksArray;
			}
		} catch(error) {
			console.log(error);
		}
	}
};

export default Spotify;