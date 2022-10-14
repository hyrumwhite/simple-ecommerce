import { defineStore } from "pinia";
export default defineStore("user-store", () => {
	const currentUser = ref({});
	const setCurrentUser = (user) => (currentUser.value = user);

	return { currentUser, setCurrentUser };
});
