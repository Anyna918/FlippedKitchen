import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import * as Pinia from 'pinia';
import uviewPlus from 'uview-plus';

export function createApp() {
	const app = createSSRApp(App);
	app.use(Pinia.createPinia());
	app.use(uviewPlus)
	return {
		app,
		Pinia,
	};
}
