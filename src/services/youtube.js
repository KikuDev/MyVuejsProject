import axios from 'axios';
/* eslint-disable */

export default() => {
	axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=revolver+trailer&key=AIzaSyB6ozqzSJ0edQHWO4OH1AX5Rl4yCNomOaY')
		.then((response) => {
			this.data = response;
		})
		.catch((error) => {
			return error;
		});
};
