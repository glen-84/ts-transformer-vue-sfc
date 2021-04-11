import {createApp} from "vue";
import App from "./app.vue";
import router from "./router";
import type messages from "./app/site/lang/en-gb.json";
import VueIntl from "vue-intl";
import vuetify from "./vuetify";

type LocaleMessages = typeof messages;

// TODO: Set locale from active front-end.
const locale = "en-gb";

createApp(App)
    .use(router)
    .use(VueIntl, {
        defaultLocale: "en-GB",
        locale,
        messages: (await import(`./app/site/lang/${locale}.json`)) as LocaleMessages
    })
    .use(vuetify)
    .mount("#app");
