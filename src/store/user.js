import { defineStore } from 'pinia';

export const useCounterStore = defineStore('user', {
	state: () => ({
	    count: 1
	  }),
	actions: {
		increment() {
			this.count++;
		},
	},
	getters: {
		doubleCount: (state) => state.count * 2
	},
});
