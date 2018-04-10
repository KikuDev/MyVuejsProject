
<template>
	<div>
		<input type="checkbox" id="switch" checked>
		<label for="switch" class="switch-label">Turn </label>
		<div class="container">
			<DialogBox />
			<div class="hello screen">
				<img src="../assets/background.jpg" alt="background" />
				<canvas id="canvas"></canvas>
				<div id="judge"></div>
				<div id="crono" :class="crono.name"></div>
				<div id="chancellor" :class="chancellor.name"></div>
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
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let that = this;

		canvas.width = 1024;
		canvas.height = 768;

		const cronoNPC = document.getElementById('crono');
		const cronoWalkingLeft = new Motio(cronoNPC, { fps: this.crono.fps, frames: this.crono.frames });
		cronoWalkingLeft.play();
		setTimeout(function() {
			cronoWalkingLeft.toEnd();
			setTimeout(function() {
				that.crono.name += ' halfTurned';
				setTimeout(function() {
					that.crono.name = 'cronoImmobileBack';
				}, 100);
			}, 500);
		}, 7000);

		const judgeNPC = document.getElementById('judge');

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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'Screen/Screen.scss';
@import 'Screen/Crono.scss';
@import 'Screen/Chancellor.scss';
@import 'Screen/Judge.scss';

</style>
