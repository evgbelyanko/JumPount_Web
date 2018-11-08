export const setTypeDevice = () => {
	const device = document.documentElement.clientWidth <= 768 ? 'mobile' : 'desktop';

	return device;
}