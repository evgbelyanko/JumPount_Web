export const setTypeDevice = () => {
	let device = null;

	if(document.documentElement.clientWidth <= 768) {
		device = 'mobile'
	} else {
		device = 'desktop'
	}

	return device;
}