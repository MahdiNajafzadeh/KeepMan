import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/stores/Profile.js";
import request from "@/lib/request.js";

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
			path: "/note/edit/:id",
			name: "note",
			component: () => import("../views/EditNoteView.vue"),
			meta: {
				showNavBar: true,
				showSearchBar: false
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

const TWO_HOURS = 2 * 60 * 60 * 1000;

router.beforeEach(async (to, from, next) => {
	const token = localStorage.getItem("token");
	const tokenDate = localStorage.getItem("tokenDate");
	const profileStore = useProfileStore();

	if (to.name !== "auth" && !token) {
		next({ name: "auth" });
		return;
	}

	if (to.name !== "auth" && token) {
		if (!tokenDate) {
			next({ name: "auth" });
			return;
		}
		const now = new Date().getTime();
		if (now - parseInt(tokenDate) > TWO_HOURS) {
			localStorage.clear();
			profileStore.reset();
			next({ name: "auth" });
			return;
		} else {
			try {
				const response = await request.get("http://localhost:3000/api/user");
				profileStore.profile = response.data?.data;
			} catch (error) {
				next({ name: "auth" });
				return;
			}
		}
	}

	next();
});

export default router;
