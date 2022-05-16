export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getSlug = (str) => str.toLowerCase()
	.normalize("NFD")
	.replace(/[\u0300-\u036f]/g, "")
	.replace(/ /g,"_");

export const stringToColor = (string) => {
	let hash = 0;
	let i;
	
	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	
	let color = '#';
	
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */
	
	return color;
}
	
export const stringAvatar = (name) => ({
	sx: {
		bgcolor: stringToColor(name),
	},
	children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
})

export const getQuery = (search, empty) => {
	const query = search.replace(/(^[\w\W]+\?)|(^[\w\W]+$)/g,"").replace(/&/g, '","').replace(/=/g,'":"')

	if(query.match(/^(\w+":"\w+",")*\w+":"\w+$/g)) {
		const initialSearch = JSON.parse('{"' + query + '"}', (key, value) => key === '' ? value : decodeURIComponent(value).replace(/\+/g, ' '))
		empty.titulo = !!initialSearch.titulo ? initialSearch.titulo : ''
		empty.categoria = !!initialSearch.categoria ? initialSearch.categoria : ''
	}
	return empty
} 