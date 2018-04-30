
<template>
	<div id="DialogCheckbox">
		<div class="checkbox-man">
			<div id="confirm" class="checkbox" v-on:click="validateChoice">CONFIRM</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	name: 'DialogCheckbox',
	methods: {
		validateChoice() {
			this.$emit('validateChoice');
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

		#confirm {
			align-items: center;
			background-color: #fff;
			background-size: contain;
			border: 1px solid #000;
			border-radius: 2px;
			cursor: pointer;
			display: flex;
			font-size: 13px;
			justify-content: center;
			margin-right: 5px;
			margin-top: 4px;
			padding: 0 10px;
			height: 27px;
		}
	}
	.hidden {
		display: none;
	}
</style>