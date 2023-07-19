<script>
import AppMain from '../components/AppMain.vue'
import axios from "axios";

export default {
    name: "SingleProject",
    data() {
        return {
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
    }
}
</script>

<template>
    <section>
        <div class="card" v-if="project">
            <h3>Titolo: {{ project.title }}</h3>
            <h4>Tipo: {{ project.type ? project.type.name : "Nessuno" }}</h4>
            <div class="cardImage">
                <img class="image" :src="project.image" alt="">
            </div>
        </div>
    </section>
</template>