
<template>
	<div id="DialogCheckbox">
		<input class="hidden" type="checkbox" id="checkbox" v-model="checked" />
		<div class="checkbox-man">
			<div id="man-checkbox" class="checkbox" v-on:click="checked = 'man'"></div>
		</div>
		<div class="checkbox-woman">
			<div id="woman-checkbox" class="checkbox" v-on:click="checked = 'woman'"></div>
		</div>
		<button class="DialogInput__validate btn--disabled" v-on:click="validateName" disabled="disabled">OK</button>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	name: 'DialogCheckbox',
	data() {
		return {
			txt: this.$store.getters.dialog,
			inputValue: this.value,
			checked: 'man',
		};
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
	#DialogCheckbox {
		animation: appear 0.5s ease-out forwards;
		bottom: 0px;
		display: flex;
		justify-content: center;;
		position: absolute;
		z-index: 1;
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

		#man-checkbox, #woman-checkbox {
			background-color: #fff;
			background-size: contain;
			border: 1px solid #000;
			margin-right: 5px;
			margin-top: 4px;
			height: 27px;
			width: 27px;
		}

		#man-checkbox {
			background-image: url('../../assets/man-symbol.png');
		}

		#woman-checkbox {
			background-image: url('../../assets/woman-symbol.png');
		}
	}
	.hidden {
		display: none;
	}
</style>