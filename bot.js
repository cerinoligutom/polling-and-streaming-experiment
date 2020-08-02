const client = require('./client');

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
	for (let i of [...Array(10000)].fill(0).map((_, idx) => idx + 1)) {
		console.info(`Ticked ${i}`);
		client.handleTextInput(i);
		await sleep(1000);
	}
})();
