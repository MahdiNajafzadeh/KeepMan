import { createRouter, createWebHistory } from "vue-router";
import request from "@/lib/request.js";
import { useProfileStore } from "@/stores/Profile.js";

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

router.beforeEach(async (to, from, next) => {
	const token = localStorage.getItem("token");
	const tokenDate = localStorage.getItem("tokenDate");

	if (to.name !== "auth" && (!token || !tokenDate)) {
		return next({ name: "auth" });
	}

	if (to.name !== "auth" && token) {
		const tokenTime = Number(tokenDate);
		const nowTime = new Date().getTime();
		const tokenLifeTime = (nowTime - tokenTime) / 1000 / 60 / 60;

		if (tokenLifeTime >= 12) {
			return next({ name: "auth" });
		}

		try {
			const response = await request.get("http://localhost:3000/api/user");
			const data = response.data.data;
			useProfileStore().profile = data;
		} catch (error) {
			return next({ name: "auth" });
		}
	}

	if (to.name === 'auth' && !(!token || !tokenDate)) {
		next({ name: "home" });
	}

	next();
});

export default router;
