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
            projects: []
        }
    },
    methods: {
        getProjects() {
            this.loading = true;
            axios.get(this.apiUrl).then(response => {
                console.log(response.data.results);
                this.projects = response.data.results;
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
        <div>Componente</div>
        <h2 v-if="loading">Caricamento in corso</h2>
        <h2 v-if="loadingError"> {{ loadingError }} </h2>

        <div v-for="project in projects">
            <h2>{{ project }}</h2>
        </div>
    </main>
</template>