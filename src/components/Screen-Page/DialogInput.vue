
<template>
	<div id="DialogInput">
		<input placeholder="Enter your name" v-model="inputValue" @keyup.enter="checkLength"/>
		<button class="DialogInput__validate btn--disabled" v-on:click="validateName" disabled="disabled">OK</button>
	</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
	name: 'DialogInput',
	props: ['aim'],
	data() {
		return {
			txt: this.$store.getters.dialog,
			inputValue: this.value,
		};
	},
	watch: {
		inputValue(val) {
			const dialogInputButton = document.getElementsByClassName('DialogInput__validate')[0];
			if (this.inputValue.split('')[0] === ' ') {
				this.inputValue = '';
			}
			if (this.inputValue && this.inputValue.length > 3) {
				dialogInputButton.removeAttribute("disabled");
				dialogInputButton.classList.remove('btn--disabled');
			} else {
				dialogInputButton.setAttribute('disabled', 'disabled');
				dialogInputButton.classList.add('btn--disabled');
			}
			this.$emit('input', val);
		}
	},
	methods: {
		checkLength() {
			this.inputValue.length > 3 ? this.validateName() : console.log('NoNonono');
		},
		validateName() {
			let that = this;
			if (this.aim === 'name') {
				axios.get(`https://gender-api.com/get?name=${this.inputValue}&key=CEUzoTuDmNUVzUSbQr`)
					.then(function (response) {
						if ((response.data.gender === 'male' || response.data.gender === 'female') && response.data.accuracy > 70) {
							if (response.data.gender === 'male') {
								that.$store.state.dialog.intro[7] += `Mister ${that.inputValue} !`;
							} else {
								that.$store.state.dialog.intro[3] += `Miss ${that.inputValue} !`;
							}
							that.$emit('validateName');
							that.$emit('genderDefined', response.data.gender);
						} else {
							that.$emit('validateName');
							that.$emit('genderDefined', false);
						}
						console.log(response.data.gender);
					})
					.catch(function (error) {
						console.log(error);
					});
			} else {
				that.$emit('movieSelected', this.inputValue);
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	#DialogInput {
		animation: appear 0.5s ease-out forwards;
		bottom: 0px;
		display: flex;
		justify-content: center;;
		position: absolute;
		z-index: 1;
		input {
			border: none;
			box-shadow: 0px 0px 2px 1px;
			color: #333;
			height: 25px;
			text-align: center;
			z-index: 4;
		}
		@keyframes appear {
			0% {
				height: 0px;
				opacity: 0;
				width: 0px;
			}
			90% {
				height: 0px;
				opacity: 0;
				width: 0px;
			}
			100% {
				height: 20px;
				opacity: 1;
				width: 100%;
			}
		}
		button {
			background-color: #fff;
			border: 1px solid #fff;
			box-shadow: 0px 0px 2px 1px;
			color: #1b9e1b;
			height: 27px;
			margin-top: 0px;
			transition: 0.2s;
			z-index: 4;
			&.btn--disabled {
				border: 1px solid #f00;
				color: red;
				margin-top: 5px;
				z-index: 3;
			}
		}
	}
</style>