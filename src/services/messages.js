const store = [];

module.exports = {
	find(params) {
		return Promise.resolve(store);
	},

	get(id, params) {
		const el = store.find(el => el.id === id);

		return Promise.resolve(el);
	},

	create(data, params) {
		data.id = store.length.toString();
		store.push(data);

		return Promise.resolve(data);
	},

	update(id, data, params) {
		const el = store.find(el => el.id === id);

		Object.assign(el, data);

		return Promise.resolve(el);
	},

	remove(id, params) {
		const i = store.findIndex(el => el.id === id);

		store.splice(i, 1);

		return Promise.resolve({});
	}
};
