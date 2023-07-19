<script>

export default {
  name: "AppVue",

  data() {
    return {
      navLinks: [
        { route: "AppHome", label: "Home" },
        { route: "/about", label: "About Us" },
        { route: "/projects", label: "Projects" }
      ]
    }
  },
}
</script>

<template>
  <h1>Api Laravel + Vue</h1>


  <header>
    <div v-for="i in navLinks">
      <router-link :to="{ name: i.route }">{{ i.label }}</router-link>
    </div>
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
