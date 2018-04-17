<template>
	<div id="Homepage">
		<span class="letters"></span>
		<router-link to="experience" class="button">Change Experience</router-link>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	name: 'Homepage',
	data() {
		return {
			fullname: 'Gregory Bizet',
		}
	},
	mounted() {
		console.log('test');
		const lettersDiv = document.getElementsByClassName('letters')[0];
		const arrName = this.fullname.split('');
		let counter = 0
		let timer = setInterval(function () {
			addLetter(arrName[counter], counter)
			counter++;
			if (counter === arrName.length) {
				clearInterval(timer);
			}
		}, 200);

		function addLetter(letter, index) {
			lettersDiv.insertAdjacentHTML('beforeend', `<span class="letter-${index}">${letter}</span>`);
		}
	}
};
</script>

<style lang="scss">
	@font-face {
		font-family: patchy;
		src: url(../assets/fonts/Patchy-Robots.otf);
	}
	$letter-collection: ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');

	#Homepage {
		align-self: flex-start;
		border: 1px #519cff solid;
		border-radius: 2px;
		box-shadow: 0px 0px 6px -2px #519cff;
		height: calc(100% - 35px);
		margin: 25px 10px 10px 10px;
		position: relative;
		width: 100%;
		.letters {
			background-color: #fff;
			color: #519cff;
			display: block;
			font-family: patchy;
			font-size: 28px;
			height: 32px;
			margin: auto;
			margin-top: -15px;
			padding: 0 5px;
			text-align: left;
			width: 277px;
			@for $i from 0 to length($letter-collection) {
				.letter-#{$i} {
					animation: display#{$i} 1s forwards ease-in-out;
					color: black;
					opacity: 0;
					
					@keyframes display#{$i} {
						from {
							color: black;
							opacity: 0;
						}
						to {
							color: #519cff;
							opacity: 1;
						}
					}
				}
			}
		}
		.button {
			background-color: #519cff;
			bottom: 0;
			color: #fff;
			font-weight: 100;
			padding: 20px 0;
			position: absolute;
			text-align: center;
			text-decoration: none;
			transition: 0.2s;
			width: 100%;
			&:hover {
				background-color: #2b5690;
			}
		}
	}
</style>
