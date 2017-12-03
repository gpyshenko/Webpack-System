export function welcome(message) {
	console.log(message)
}

export function bye(message) {
	console.log(message)
}

let warn = 'Опасно';

export default {
	welcome: welcome,
	bye: bye
}

console.log(warn);