import { query } from "~/assets/js/db.mjs";

export const getUser = async ({ email, password }) => {
	let { rows } = await query(
		`select * from users where email = $1 and password_plain = $2;`,
		[email, password]
	);
	const [user] = rows;
	return user || null;
};
