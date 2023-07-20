<script>
import AppMain from '../components/AppMain.vue'
import axios from "axios";
import { store } from '../store';

export default {
    name: "SingleProject",
    data() {
        return {
            store,
            loading: false,
            apiUrl: "http://127.0.0.1:8000/api/",
            loadingError: false,
            project: null
        }
    },
    components: {
        AppMain
    },
    methods: {
        getSingleProject(id) {
            this.loading = true;
            axios.get(this.apiUrl + "projects/" + id).then(response => {
                console.log(response.data);
                this.project = response.data.results;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
            });
        }
    },
    mounted() {
        this.getSingleProject(this.$route.params.id)
    },
    beforeRouteUpdate(to, from) {
        if (from.name == to.name) {
            this.getSingleProject(to.params.id);
        }
    }
}
</script>

<template>
    <section>
        <div class="card" v-if="project">
            <template v-if="project.id > 1">
                <router-link :to="{ name: 'single-project', params: { id: project.id - 1 } }" class="navLink">Articolo
                    precedente</router-link>
            </template>
            <template v-if="project.id < store.totalProjectsNumber">
                <router-link :to="{ name: 'single-project', params: { id: project.id + 1 } }" class="navLink">Articolo
                    Successivo</router-link>
            </template>
            <h3>Titolo: {{ project.title }}</h3>
            <h4>Tipo: {{ project.type ? project.type.name : "Nessuno" }}</h4>
            <div class="cardImage">
                <img class="image" :src="project.image" alt="">
            </div>
        </div>
    </section>
</template>

<style scoped>
a.navLink {
    color: red;
    text-decoration: none;
    padding-right: 2rem;
}
</style>