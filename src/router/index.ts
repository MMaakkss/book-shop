import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		{
			path: '/catalog',
			name: 'catalog',
			component: () => import('@/views/CatalogPage.vue')
		},
		{
			path: '/favourite',
			name: 'favourite',
			component: () => import('@/views/Favorites.vue')
		},
		{
			path: '/product/:id',
			name: 'product',
			component: () => import('@/views/ProductPage.vue')
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			component: () => import('@/views/PageNotFound.vue')
		}
	]
});
