import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/HomeView.vue"),
			meta: {
				showNavBar: true,
				showSearchBar: true
			}
		},
		{
			path: "/profile",
			name: "profile",
			component: () => import("../views/ProfileView.vue"),
			meta: {
				showNavBar: true,
				showSearchBar: false
			}
		},
		{
			path: "/friends",
			name: "friends",
			component: () => import("../views/FriendsView.vue"),
			meta: {
				showNavBar: true,
				showSearchBar: true
			}
		},
		{
			path: "/note/:id",
			name: "note",
			component: () => import("../views/NoteView.vue"),
			meta: {
				showNavBar: true,
				showSearchBar: true
			}
		},
		{
			path: "/auth",
			name: "auth",
			component: () => import("../views/AuthView.vue"),
			meta: {
				showNavBar: false,
				showSearchBar: false
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem("token");
	if (to.path !== "/auth" && !token) {
		// next("/auth")
		router.push("/auth");
	} else {
		next();
	}
});

export default router;
