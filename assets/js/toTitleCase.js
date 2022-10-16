//toTitleCase is from https://stackoverflow.com/a/64489760/3803371
export const toTitleCase = (s) =>
	s
		.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
		.replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
