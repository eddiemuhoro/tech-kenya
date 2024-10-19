import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "primeicons/primeicons.css";
import "vue-toastification/dist/index.css"; // Add this line

const app = createApp(App);

app.use(router);

app.mount("#app");
