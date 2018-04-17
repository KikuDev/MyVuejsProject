import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		chancellor: {
			move: {
				walkingFront: {
					id: 1,
					name: 'chancellorWalkingFront',
					frames: 4,
					fps: 3,
				},
			},
		},
		crono: {
			move: {
				walkingLeft: {
					id: 1,
					name: 'cronoWalkingLeft',
					frames: 6,
					fps: 7,
				},
				immobileBack: {
					id: 2,
					name: 'cronoImmobileBack',
					frames: null,
					fps: null,
				},
			},
		},
		judge: {
			speaking: true,
		},
		dialog: {
			intro: [
				'Hello Visitor!',
				'My name is Gregory, I\'m 31 and I\'m a front-end developper.',
				'What\'s your name?',
				'Nice to meet you ',
				'This appearance doesn\'t suit you... Hmm... Wait!',
				'It\'s better!',
				'So... Who do you want to talk with?',
				'Nice to meet you ',
				'So... Who do you want to talk with?',
			],
		},
		instructions: {
			input: 'Press Enter',
			tap: 'Tap on screen',
			tapOrInput: 'Tap or Press Enter',
		},
	},
	getters: {
		crono: state => state.crono,
		chancellor: state => state.chancellor,
		judge: state => state.judge,
		dialog: state => state.dialog,
		instructions: state => state.instructions,
	},
});
