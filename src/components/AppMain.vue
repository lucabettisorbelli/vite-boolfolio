<script>
import axios from "axios";

export default {
    name: "AppMain",
    data() {
        return {
            chiave: "valore",
            apiUrl: "http://127.0.0.1:8000/api/projects",
            loading: false,
            loadingError: false,
            projects: [],
            projectsCurrentPage: 0,
            projectsTotalPages: 0
        }
    },
    methods: {
        getProjects() {
            this.loading = true;
            axios.get(this.apiUrl).then(response => {
                console.log(response.data.results.data);
                this.projectsCurrentPage = response.data.results.current_page;
                this.projectsTotalPages = response.data.results.last_page
                this.projects = response.data.results.data;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
            })
        },
        getPageProject(page) {
            this.loading = true;
            axios.get(`${this.apiUrl}?page=${page}`).then(response => {
                this.projectsCurrentPage = response.data.results.current_page;
                this.projectsTotalPages = response.data.results.last_page
                this.projects = response.data.results.data;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
            })
        }
    },
    mounted() {
        this.getProjects();
    }
}

</script>

<template>
    <main>
        <h1>Progetti</h1>
        <h2 v-if="loading">Caricamento in corso</h2>
        <h2 v-if="loadingError"> {{ loadingError }} </h2>

        <div class="card" v-for="project in projects">
            <h3>Titolo:</h3>
            <h4>{{ project.title }}</h4>
            <h3>Tipo:</h3>
            <h4>{{ project.type.name }}</h4><br>
            <div class="cardImage">
                <img class="image" :src="project.image" alt="">
            </div>
        </div>
        <button @click="nextPage" v-for="projectsCurrentPage in projectsTotalPages">{{ projectsCurrentPage }}</button>
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

button {
    padding: 0.5rem;
    background: #DDD;
    color: black;
    border: solid 1px black;
    border-radius: 0.25rem;
    margin: 1rem;
    cursor: pointer;
}
</style>