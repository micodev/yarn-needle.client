<template>
  <div>
    <h1>Available Routes</h1>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path">{{ route.path }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: []
    };
  },
  created() {
    this.routes = this.$router.options.routes[0].children;
  }
};
</script>

<style scoped>
/* Add any styles you need here */
</style>
