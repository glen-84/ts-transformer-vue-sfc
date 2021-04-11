declare module "*.vue" {
    import type {DefineComponent} from "vue";
    // eslint-disable-next-line
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "vuetify";
declare module "vuetify/lib/components";
declare module "vuetify/lib/directives";
declare module "vuetify/lib/iconsets/mdi-svg";
