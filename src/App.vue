<template>
	<div id="app" class="" :class="checkScreen">
		<router-view  :key="$route.fullPath"/>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	name: 'App',
	data() {
		return {
			isScreenMounted: this.$store.state.screenMounted,
		};
	},
	computed: {
		checkScreen () {
			if (this.$store.state.screenMounted) {
				return 'screen-app';
			} else {
				return '';
			}
		}
	},
	watch: {
		checkScreen (newValue, oldValue) {
			if (newValue === false) {
				return 'screen-app';
			} else {
				return '';
			}
		}
	},
	mounted() {
		let that = this;
		let timer = setInterval(function () {
			if (that.$store.state.screenMounted) {
				that.isScreenMounted = true;
			} else {
				that.isScreenMounted = false;
			}
		}, 1000);
	},
};
</script>

<style>
	html, body {
		height: 100%;
		margin: 0;
		overflow: hidden;
		width: 100%;
	}

	#app {
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: center;
	}

	.screen-app {
		background-color: #1F1A34;
		transition: 1s;
	}
</style>
