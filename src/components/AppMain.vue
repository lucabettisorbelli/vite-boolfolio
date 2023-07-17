<script>
import axios from "axios";

export default {
    name: "AppMain",
    data() {
        return {
            chiave: "valore"
        }
    },
    methods: {

    },
    mounted() {
        axios.get("http://127.0.0.1:8000/api/projects").then((response) => {
            console.log(response);
        })
    }
}
</script>

<template>
    <main>
        <div>Componente</div>
    </main>
</template>