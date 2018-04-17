import Vue from 'vue';
import Router from 'vue-router';
import Screen from '@/components/Screen-Page/Screen';
import Homepage from '@/components/Homepage';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Homepage',
			component: Homepage,
		},
		{
			path: '/experience',
			name: 'Screen',
			component: Screen,
		},
	],
});
