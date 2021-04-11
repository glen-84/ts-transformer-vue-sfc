<template>
    <v-app>
        <v-navigation-drawer app>left sidebar</v-navigation-drawer>

        <!-- <v-app-bar app>app bar</v-app-bar> -->

        <v-main>
            <router-view />
        </v-main>

        <v-navigation-drawer app right>right sidebar</v-navigation-drawer>

        <v-footer app>footer</v-footer>
    </v-app>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

class Default extends Vue {}

export default Default;
</script>
