<template>
<div class="movie-container">
<the-list></the-list>
<h1 v-if="resultExist">No Result</h1>
</div>
</template>

<script>
import TheList from './TheList.vue'
export default {
    components: {
        TheList
    },
    data() {
      return {
        resultExist: this.$store.state.movieList.results ? true : false,
      }
    },
}
</script>

<style>
.movie-container {
background-color: rgba(245, 245, 245, 0.658);
}
</style>