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
			accessToken = url.match(/access_token=([^&]*)/)[0];
			expiresIn = url.match(/expires_in=([^&]*)/)[0];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
            console.log("access token successfully retrieved.");
			return accessToken;
		} else {
			const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
			window.location.href = authorizeUrl;
			console.log('attempt to retrieve access token');
		}
	}
};

/*const apiKey = 'AIzaSyBAeTWYeoeidXZcdKuK3V4BtSC3TRP2sCc';
export const Auto = async (location) => {
	try {
		const response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&types=geocode&key=${apiKey}&sessiontoken=1`);
		if (response.ok) {
			const jsonResponse = await response.json();
			console.log(jsonResponse);
			if (jsonResponse.status === 'OK') {
				return jsonResponse.predictions[0].description;
			}
		}
	} catch(error) {
		console.log(error);
	}
};*/

export default Spotify;