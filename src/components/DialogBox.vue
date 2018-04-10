
<template>
	<div id="DialogBox" class="hidden">
		<img class="DialogBox__background" src="../assets/dialogBox.png" alt="dialog" />
		<div class="DialogBox__text"></div>
		<div class="DialogBox__instructions off"></div>
		<DialogInput v-if="displayInput" v-model="name" v-on:validateName="reinitializeDialog"/>
	</div>
</template>

<script>
/* eslint-disable */
import Check from './checkResolution.js';
import DialogInput from './DialogInput';

export default {
	name: 'DialogBox',
	components: {
		DialogInput
	},
	data() {
		return {
			txt: this.$store.getters.dialog,
			instructions: this.$store.getters.instructions,
			judge: this.$store.state.judge,
			step: 0,
			displayInput: false,
			name: '',
		};
	},
	mounted() {
		let that = this;

		setTimeout(function() {
			that.displayDialogBox();
			that.displayText();
		}, 11000);
	},
	methods: {
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
			console.log(state);
			const DialogBoxTxt = document.getElementsByClassName('DialogBox__text')[0];
			let that = this;
			state === 'off' ? DialogBoxTxt.innerHTML = '' : displaySpeech();

			function displaySpeech() {
				let greetings = that.txt.intro;
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
			console.log(state);
			const DialogBoxInst = document.getElementsByClassName('DialogBox__instructions')[0];
			let that = this;
			state === 'off' ? DialogBoxInst.classList.add('off'): showInstructions();

			function showInstructions(state) {
				Check() === 'desktop' ? DialogBoxInst.innerText = that.instructions.input : DialogBoxInst.innerText = that.instructions.tap;
				DialogBoxInst.classList.remove('off');
				that.listenUserInput();
			}
		},
		listenUserInput() {
			let that = this;
			Check() === 'desktop' ? manageKey() : manageClick();
			
			function manageKey() {
				let keyPressed = function (event) {
					if (event.keyCode === 13) {
						console.log('enter pressed!');
						that.reinitializeDialog();
						document.removeEventListener('keydown', keyPressed);
					}
				}
				document.addEventListener('keydown', keyPressed);
			}
			function manageClick() {
				let clicked = function (event) {
					that.reinitializeDialog();
					document.removeEventListener('click', clicked);
				}
				document.addEventListener('click', clicked);
			}
		},
		reinitializeDialog() {
			let that = this;
			this.displayInput = false;
			this.displayText('off');
			this.displayInstructions('off');
			this.displayDialogBox('off');
			this.step++;

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
