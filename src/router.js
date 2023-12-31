import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import ProjectList from './pages/ProjectList.vue';
import SingleProject from './pages/SingleProject.vue';
import ErrorNotFound from './pages/ErrorNotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "AppHome",
            component: AppHome
        },
        {
            path: "/about-us",
            name: "/about",
            component: AppAbout
        },
        {
            path: "/projects",
            name: "/projects",
            component: ProjectList
        },
        {
            path: "/projects/:id",
            name: "single-project",
            component: SingleProject
        },
        {
            path: "/not-found",
            name: "/not-found",
            component: ErrorNotFound
        },
    ]
})

export { router };