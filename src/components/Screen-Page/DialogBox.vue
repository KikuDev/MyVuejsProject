
<template>
	<div id="DialogBox" class="hidden">
		<img class="DialogBox__background" src="../../assets/dialogBox.png" alt="dialog" />
		<div class="DialogBox__text"></div>
		<div class="DialogBox__instructions off"></div>
		<DialogInput v-if="displayInput" v-model="name" v-on:genderDefined="check" v-on:validateName="reinitializeDialog"/>
		<DialogCheckbox v-if="displayCheckbox" v-model="gender" v-on:validateName="reinitializeDialog"/>
		<video v-if="videoPlay" id="video" width="100%" height="100%" autoplay preload controls type="video/mp4" src="" style="background:black; position: absolute; z-index: 4;"></video>
	</div>
</template>

<script>
/* eslint-disable */
import Check from './checkResolution.js';
import DialogInput from './DialogInput';
import DialogCheckbox from './DialogCheckbox';
import axios from 'axios';

export default {
	name: 'DialogBox',
	components: {
		DialogInput,
		DialogCheckbox,
	},
	data() {
		return {
			txt: this.$store.getters.dialog,
			instructions: this.$store.getters.instructions,
			judge: this.$store.state.judge,
			step: 0,
			displayInput: false,
			displayCheckbox: false,
			name: '',
			isGenderDefined: false,
			gender: '',
			soldierSelected: '',
			videoPlay: false,
		};
	},
	mounted() {
		let that = this;

		this.getLanguage();

		setTimeout(function() {
			that.displayDialogBox();
			that.displayText();
		}, 11000);
	},
	methods: {
		getLanguage() {
			axios.get(`http://ip-api.com/json`)
				.then(function(response) {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});
			
			console.log(window.navigator.language);
		},
		check(value) {
			if (!value) {
				this.isGenderDefined = false;
				this.gender = 'undetermined';
			} else {
				this.isGenderDefined = true;
				this.gender = value;
				if (value === 'male') {
					this.step = this.step + 4;
				}
			}
		},
		judgeSpeak(isSpeaking) {
			const DialogBox = document.getElementById('DialogBox');
			const judgeNPC = document.getElementById('judge');
			const judgeMove = new Motio(judgeNPC, { fps: 4, frames: 2 });
			console.log(isSpeaking);

			if (isSpeaking) {
				judgeNPC.classList.add('speak');
				judgeMove.play();
			} else {
				judgeNPC.classList.remove('speak');
				judgeMove.toStart();
			}
		},
		displayDialogBox(state = 'on') {
			if (state === 'off') {
				DialogBox.classList.add('hidden');
			} else {
				DialogBox.classList.remove('hidden');
				this.judgeSpeak(true);
			}
		},
		displayText(state = 'on', step = this.step) {
			const DialogBoxTxt = document.getElementsByClassName('DialogBox__text')[0];
			let that = this;
			state === 'off' ? DialogBoxTxt.innerHTML = '' : displaySpeech();

			function displaySpeech() {
				let greetings = '';
				if (that.soldierSelected.length < 2) {
					greetings = that.txt.intro;
				} else {
					greetings = that.txt[that.soldierSelected];
				}
				console.log(greetings);
				console.log(step);
				let greetingHello = greetings[step].split('');
				let counter = 0
				let timer = setInterval(function () {
					addLetter(greetingHello[counter])
					counter++;
					if (counter === greetingHello.length) {
						that.judgeSpeak(false);
						clearInterval(timer);
						if (step === 2) {
							setTimeout(function() {
								that.displayInput = true;
							}, 500);
						} else if (step === 4 & that.isGenderDefined) {
							setTimeout(function() {
								that.$emit('changeCharacter');
								setTimeout(function() {
									that.reinitializeDialog();
								}, 7800);
							}, 500);
						} else if (step === 5 & !that.isGenderDefined) {
							setTimeout(function() {
								that.displayCheckbox = true;
							}, 500);
						} else if (step === 6 || step === 8) {
							that.$emit('introEnded');
							setTimeout(() => {
								that.displayInstructions('select');
							}, 3000);
						} else {
							that.displayInstructions();
						}
					}
				}, 100);

				function addLetter(letter) {
					DialogBoxTxt.innerHTML += letter;
				}
			}
		},
		displayInstructions(state = 'on') {
			if (this.soldierSelected.length > 0) {
				return;
			} else {
				console.log(state);
				const DialogBoxInst = document.getElementsByClassName('DialogBox__instructions')[0];
				let that = this;
				state === 'off' ? DialogBoxInst.classList.add('off'): showInstructions(state);

				function showInstructions(state) {
					console.log(state);
					if (state !== 'select') {
						Check() === 'desktop' ? DialogBoxInst.innerText = that.instructions.input : Check() === 'mobile' ? DialogBoxInst.innerText = that.instructions.tap : DialogBoxInst.innerText = that.instructions.tapOrInput;
						DialogBoxInst.classList.remove('off');
						that.listenUserInput();
					} else {
						DialogBoxInst.innerText = that.instructions.select;
						DialogBoxInst.classList.remove('off');
					}
				}
			}
		},
		listenUserInput() {
			let that = this;
			Check() === 'desktop' ? document.addEventListener('keydown', this.keyPressed) : Check() === 'mobile' ? document.addEventListener('click', this.clicked) : manageBoth();
			
			function manageBoth() {
				document.addEventListener('keydown', this.keyPressed)
				document.addEventListener('click', this.clicked);
			}
		},
		keyPressed(ev) {
			console.log(ev);
			if (ev.keyCode === 13) {
				this.reinitializeDialog();
				document.removeEventListener('keydown', this.keyPressed);
			}
		},
		clicked() {
			this.reinitializeDialog();
			document.removeEventListener('click', this.clicked);
		},
		removeEventsListeners() {
			document.removeEventListener('click', this.clicked);
			document.removeEventListener('keydown', this.keyPressed);
		},
		displaySoldierChoice(soldier) {
			console.log(soldier);
			this.soldierSelected = soldier;
			this.videoPlay = true;

			axios.get('https://yts.am/api/v2/list_movies.json?quality=720p&query_term=revolver')
				.then((res) => {
					let torrent = res.data;
					let infoHash = '';
					for (var i = 0; i < torrent.data.movies[0].torrents.length; ++i) {
						if (torrent.data.movies[0].torrents[i].quality == '720p') {
							infoHash = torrent.data.movies[0].torrents[i].hash;
							console.log(infoHash);
						}
					}
					axios.get('http://localhost:8081/api/add/' + infoHash)
						.then((data) => {
							var video = 'http://localhost:8081/stream/' + infoHash + '.mp4';
							document.getElementById('video').setAttribute('src', video);
						})
						.catch((error) => {
							console.log(error);
						});
				})
				.catch((error) => {
					console.log(error);
				});
			//this.reinitializeDialog();
		},
		reinitializeDialog() {
			let that = this;
			this.displayInput = false;
			this.displayText('off');
			this.displayInstructions('off');
			this.displayDialogBox('off');
			if (this.soldierSelected.length > 0) {
				this.step = 0;
			} else {
				this.step++;
			}

			setTimeout(function() {
				that.nextEvent();
			}, 1000);
		},
		nextEvent() {
			this.displayDialogBox();
			this.displayText();
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	$orange: #ffa600;
	$black: #000;

	video {
		box-shadow: 0px 0px 10px 2px white;
	}
	#DialogBox {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 4;
		opacity: 1;
		position: absolute;
		top: 220px;
		left: 50%;
		transform: translateX(-50%);
		transition: 0.3s;
		width: 300px;
		height: 100px;
		&.hidden {
			opacity: 0;
		}
		.DialogBox{
			&__background {
				height: 100%;
				position: absolute;
				width: 100%;
			}
			&__text {
				color: white;
				font-size: 16px;
				padding: 0 15px;
    			text-align: center;
				z-index: 4;
			}
			&__instructions {
				animation: gradientFlux infinite 1s both ease-in-out;
				bottom: 10px;
				font-style: italic;
				font-size: 14px;
				opacity: 1;
				position: absolute;
				right: 10px;
				transition: 0.3s;
				z-index: 4;
				color: #68da8e; // Fallback solid text colour for un-supported browsers
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				&.off {
					opacity: 0;

				}
				@keyframes gradientFlux {
					from {
						color: #68da8e; // Fallback solid text colour for un-supported browsers
						background: -webkit-linear-gradient(left, #68da8e, #ffffff);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
					to {
						color: #68da8e; // Fallback solid text colour for un-supported browsers
						background: -webkit-linear-gradient(right, #ffffff, #68da8e);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
			}
		}
	}

</style>
