import { sendRedirect, setCookie } from "h3";
import { getUser } from "~~/assets/js/userDAO";

export default defineEventHandler(async (event) => {
	let [, query] = event.req.url.split("?");
	let params = new URLSearchParams(query);
	const email = params.get("email");
	const password = params.get("password");
	let user = await getUser({ email, password });
	if (user) {
		setCookie(event, "user", JSON.stringify(user));
		sendRedirect(event, "/", 302);
		let date = new Date();
		date.setHours(date.getHours() + 1);
	} else {
		sendRedirect(event, "/login", 302);
	}
	return 200;
});
