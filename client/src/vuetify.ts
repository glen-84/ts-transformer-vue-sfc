import "vuetify/lib/styles/main.sass";
import {aliases, mdi} from "vuetify/lib/iconsets/mdi-svg";
import {createVuetify} from "vuetify";
import * as components from "vuetify/lib/components";
import * as directives from "vuetify/lib/directives";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default createVuetify({
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    components,
    directives,
    icons: {
        aliases,
        sets: {
            mdi
        }
    }
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
});
