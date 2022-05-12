export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getSlug = (str) => str.toLowerCase()
	.normalize("NFD")
	.replace(/[\u0300-\u036f]/g, "")
	.replace(/ /g,"_");