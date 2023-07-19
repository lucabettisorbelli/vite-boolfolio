<script>

export default {
  name: "AppVue",

  data() {
    return {}
  },
}
</script>

<template>
  <h1>Api Laravel + Vue</h1>


  <header>
    <a href="/">Home</a>
    <a href="/about-us">About us</a>
    <a href="/projects">Projects</a>
  </header>

  <router-view></router-view>
</template>

<style scoped>
header {
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 20em;
  display: flex;
  justify-content: space-between;
}

a {
  text-decoration: none;
  color: white;

  ::hover {
    cursor: pointer;
    color: aquamarine;
  }
}
</style>
