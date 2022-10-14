import { sendRedirect, getCookie } from "h3";

export default defineNuxtPlugin(async (nuxtApp) => {
	const userStore = useUserStore();
	if (process.server) {
		const { ssrContext } = nuxtApp;
		if (!ssrContext.event.req.url.includes("login")) {
			const userCookie = getCookie(ssrContext.event, "user");
			if (!userCookie) {
				sendRedirect(ssrContext.event, "/login", 302);
			} else {
				userStore.setCurrentUser(JSON.parse(userCookie));
			}
		}
	}
});
