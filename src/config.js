const prod = false;
const protocol = prod ? 'https' : 'http';

module.exports = {
	//clientUrl: `${protocol}://`,
	serverUrl: prod ? `${protocol}://api.jumpoint.art` : `${protocol}://77.106.125.227:8000`,
}