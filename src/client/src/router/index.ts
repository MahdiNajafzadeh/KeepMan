import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import HomeView from '@/views/HomeView.vue';
import ProfileView from '@/views/ProfileView.vue';
import FriendsView from '@/views/FriendsView.vue';
import AboutView from '@/views/AboutView.vue';
import NoteView from '@/views/NoteView.vue';
import AuthView from '@/views/AuthView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: {
				needAuth: true,
				showNavBar: true
			}
		},
		{
			path: '/note/:id',
			name: 'note',
			component: NoteView,
			meta: {
				needAuth: true,
				showNavBar: true
			}
		},
		{
			path: '/profile',
			name: 'profile',
			component: ProfileView,
			meta: {
				needAuth: true,
				showNavBar: true
			}
		},
		{
			path: '/friends',
			name: 'friends',
			component: FriendsView,
			meta: {
				needAuth: true,
				showNavBar: true
			}
		},
		{
			path: '/about',
			name: 'about',
			component: AboutView,
			meta: {
				needAuth: true,
				showNavBar: true
			}
		},
		{
			path: '/auth',
			name: 'auth',
			component: AuthView,
			meta: {
				needAuth: false,
				showNavBar: false
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.needAuth);
	const isAuthenticated = !!Cookies.get('token');

	if (requiresAuth && !isAuthenticated) {
		next('/auth');
	} else {
		next();
	}
});

export default router;
