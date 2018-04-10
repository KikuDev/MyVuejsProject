<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'App',
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
</style>
