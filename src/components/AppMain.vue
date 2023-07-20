<script>
import axios from "axios";
import { store } from "../store";

export default {
    name: "AppMain",
    data() {
        return {
            store,
            chiave: "valore",
            loading: false,
            loadingError: false,
            projects: [],
            projectsCurrentPage: 0,
            projectsTotalPages: 0
        }
    },
    methods: {
        getProjectsFirstPage() {
            this.loading = true;
            axios.get(this.store.apiUrl + "projects").then(response => {
                console.log(response.data);
                this.projects = response.data.results.data;
                this.projectsCurrentPage = response.data.results.current_page;
                this.projectsTotalPages = response.data.results.last_page;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'not-found' })
            });
        },
        getProjectsPage(pageNumber) {
            if (pageNumber && pageNumber > 0 && pageNumber <= this.projectsTotalPages) {
                let config = {
                    params: {
                        page: pageNumber
                    }
                };
                this.loading = true;
                axios.get(this.store.apiUrl + "projects", config).then(response => {
                    console.log(response.data);
                    this.projects = response.data.results.data;
                    this.projectsCurrentPage = response.data.results.current_page;
                    this.projectsTotalPages = response.data.results.last_page;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.loadingError = err.message;
                });
            } else {
                console.error("Non ci sono più pagine");
            }
        },
        getProjectsPrevPage() {
            this.getProjectsPage(this.projectsCurrentPage - 1);
        },
        getProjectsNextPage() {
            this.getProjectsPage(this.projectsCurrentPage + 1);
        },
    },
    mounted() {
        this.getProjectsFirstPage();
    }
}


</script>

<template>
    <main>
        <h2>Projects <span v-if="projectsTotalPages > 0">{{ projectsCurrentPage }} di {{ projectsTotalPages }}</span></h2>
        <h3 v-if="loading">Caricamento in corso</h3>
        <h3 v-if="loadingError">{{ loadingError }}</h3>

        <div class="card" v-for="project in projects">
            <h3>Titolo:</h3><router-link :to="{ name: '/single-project', params: { id: project.id } }">{{ project.title
            }}</router-link>
            <h4>Tipo: {{ project.type ? project.type.name : "Nessuno" }}</h4>
            <div class="cardImage">
                <img class="image" :src="project.image" alt="">
            </div>
        </div>

        <a class="button" @click="getProjectsPrevPage">Pagina precedente</a>
        <a class="button" @click="getProjectsPage(pageNumber)" v-for="pageNumber in projectsTotalPages">{{ pageNumber }}</a>
        <a class="button" @click="getProjectsNextPage">Pagina successiva</a>
    </main>
</template>

<style scoped>
.card {
    background: #555;
    padding: 1rem;
    margin: 1rem;
    border-radius: 0.25rem;

    .cardImage {
        width: 5rem;
        height: 5rem;

        .image {
            width: 100%;
            height: 100%;
        }
    }
}

.button {
    padding: 0.5rem;
    background: #DDD;
    color: black;
    border: solid 1px black;
    border-radius: 0.25rem;
    margin: 1rem;
    cursor: pointer;
}
</style>