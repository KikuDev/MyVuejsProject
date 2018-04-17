
<template>
	<div>
		<router-link to="/" class="button" v-on:click.native="destroyComponent">BACK</router-link>
		<input type="checkbox" id="switch" checked>
		<label for="switch" class="switch-label">Turn </label>
		<div class="container">
			<DialogBox v-on:introEnded="displayGuards" v-on:changeCharacter="displayFemale"/>
			<div class="hello screen">
				<img src="../../assets/background.jpg" alt="background" />
				<canvas id="canvas"></canvas>
				<div id="flash"></div>
				<div id="judge"></div>
				<div id="crono" :class="crono.name"></div>
				<div id="chancellor" :class="chancellor.name"></div>
				<div id="soldier-blue"></div>
				<div id="soldier-red"></div>
				<div id="soldier-green"></div>
			</div>
			<div class="overlay">AV-1</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import DialogBox from './DialogBox';

export default {
	name: 'Screen',
	components: {
		DialogBox
	},
	data() {
		return {
			msg: '',
			chancellor: this.$store.getters.chancellor.move.walkingFront,
			crono: this.$store.getters.crono.move.walkingLeft,
		};
	},
	mounted() {
		const cronoNPC = document.getElementById('crono');
		const cronoWalkingLeft = new Motio(cronoNPC, { fps: this.crono.fps, frames: this.crono.frames });
		const judgeNPC = document.getElementById('judge');
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let that = this;

		canvas.width = 1024;
		canvas.height = 768;

		cronoWalkingLeft.play();
		setTimeout(function() {
			cronoWalkingLeft.toEnd();
			setTimeout(function() {
				that.crono.name += ' halfTurned';
				setTimeout(function() {
					that.crono.name = 'cronoImmobileBack';
					cronoWalkingLeft.destroy();
				}, 100);
			}, 500);
		}, 7000);


		setTimeout(function() {
			const judgeMove = new Motio(judgeNPC, { fps: 4, frames: 2 });
			judgeNPC.classList.add('gavel');
			judgeMove.play();
			setTimeout(function() {
				judgeMove.toStart();
				judgeNPC.classList.remove('gavel');
			}, 2000);
		}, 8000);
	},
	methods: {
		displayGuards() {
			let that = this;
			const greenSoldier = document.getElementById('soldier-green');
			const blueSoldier = document.getElementById('soldier-blue');
			const redSoldier = document.getElementById('soldier-red');

			this.beginAnimation([greenSoldier, blueSoldier, redSoldier]);

			// Register animation
			const greenSoldierWalkingRight = new Motio(greenSoldier, { fps: 7, frames: 4 });
			const blueSoldierWalkingLeft = new Motio(blueSoldier, { fps: 7, frames: 4 });
			const redSoldierWalkingLeft = new Motio(redSoldier, { fps: 7, frames: 4 });
		
			blueSoldierWalkingLeft.play();
			greenSoldierWalkingRight.play();
			redSoldierWalkingLeft.play();
			setTimeout(function() {
				blueSoldierWalkingLeft.toEnd(false, that.soldierTurnFront(blueSoldierWalkingLeft, blueSoldier));
				redSoldierWalkingLeft.toEnd(false, that.soldierTurnFront(redSoldierWalkingLeft, redSoldier));
				greenSoldierWalkingRight.toEnd(false, that.soldierTurnFront(greenSoldierWalkingRight, greenSoldier));
			}, 2900);
		},
		beginAnimation(soldiers) {
			soldiers.forEach((soldier) => soldier.classList.add('walking'));
		},
		soldierTurnFront(soldierAnimation, soldierHTML) {
			soldierAnimation.destroy();
			soldierHTML.classList.remove('walking');
			soldierHTML.classList.add('front');
		},
		displayFemale() {
			const flash = document.getElementById('flash');
			flash.classList.add('down');

			setTimeout(function() {
				const cronoB = document.getElementById('crono');
				cronoB.classList.remove('cronoImmobileBack');
				cronoB.classList.add('casting-spell');

				const cronoFloat = new Motio(cronoB, { fps: 4, frames: 2 });
				console.log('cast spell');

				cronoFloat.play();
				setTimeout(function() {
					cronoFloat.destroy();
					cronoB.classList.remove('casting-spell');
					cronoB.classList.add('marle-casting');
					const marleFloat = new Motio(cronoB, { fps: 4, frames: 2 });
					marleFloat.play();
					setTimeout(function() {
						flash.classList.remove('down');
						flash.classList.add('up');
						marleFloat.toStart();
						cronoB.classList.remove('marle-casting');
						cronoB.classList.add('marle-back');
						setTimeout(function() {
							cronoB.classList.remove('marle-back');
							cronoB.classList.add('marle-immobile-back');
						}, 50);
					}, 3100);
				}, 2900);
			}, 1500);
		},
		destroyComponent() {
			console.log('destroyyyyy');
			this.$destroy();
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'Screen/Screen.scss';
@import 'Screen/Crono.scss';
@import 'Screen/Chancellor.scss';
@import 'Screen/Judge.scss';
@import 'Screen/Soldier-red.scss';
@import 'Screen/Soldier-blue.scss';
@import 'Screen/Soldier-green.scss';

.button {
	align-items: center;
	background-color: #519cff;
	border-radius: 50%;
	box-shadow: 0px 0px 8px -2px black;
	color: #fff;
	display: flex;
	font-size: 13px;
	height: 50px;
	justify-content: center;
	left: 20px;
	position: fixed;
	text-decoration: none;
	top: 20px;
	width: 50px;
	z-index: 4;
}

#flash {
	background-image: url('../../assets/flash.png');
	background-size: contain;
	width: 46px;
	height: 0px;
	z-index: 5;
	position: absolute;
	left: 488px;
	top: 0;
	opacity: 0;
	&.down {
		animation: goDown 1.4s forwards ease-out;
		opacity: 0.5;
		@keyframes goDown {
			from {
				height: 0px;
			}
			to {
				height: 646px;
			}
		}
	}
	&.up {
		animation: goUp 1.4s forwards ease-out;
		opacity: 0.5;
		@keyframes goUp {
			from {
				height: 646px;
				opacity: 0.5;
				top: 0;
			}
			to {
				height: 0px;
				opacity: 0;
				top: 646px;
			}
		}
	}
}
</style>
