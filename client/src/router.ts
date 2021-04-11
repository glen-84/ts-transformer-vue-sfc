import {createRouter, createWebHistory} from "vue-router";
import type {RouteComponent, RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: async (): Promise<RouteComponent> => import("./app/site/layouts/default.vue"),
        children: [
            {
                name: "app.site.index",
                path: "",
                component: async (): Promise<RouteComponent> => import("./app/site/views/index.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
