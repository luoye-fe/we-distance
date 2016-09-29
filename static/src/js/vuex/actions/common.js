export const setWho = (store, who) => {
	store.dispatch('SETWHO', who);
};

export const setMLocation = (store, location) => {
	store.dispatch('SETMLOCATION', location);
};

export const setOLocation = (store, location) => {
	store.dispatch('SETOLOCATION', location);
};
