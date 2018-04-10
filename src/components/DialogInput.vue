
<template>
	<div id="DialogInput">
		<input placeholder="Enter your name" v-model="inputValue"/>
		<button class="DialogInput__validate btn--disabled" v-on:click="validateName" disabled="disabled">OK</button>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	name: 'DialogInput',
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
		validateName() {
			this.$store.state.dialog.intro[3] += `${this.inputValue} !`;
			this.$emit('validateName');
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
			color: #1b9e1b;
			height: 27px;
			margin-top: 0px;
			transition: 0.2s;
			&.btn--disabled {
				border: 1px solid #f00;
				color: red;
				margin-top: 5px;
			}
		}
	}
</style>