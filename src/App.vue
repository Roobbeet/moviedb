<template>
  <div id="app">
    <h1 @click="resetApp">Movie Bar - One Stop Movie Solution</h1>
    <!-- <button >HOME</button> -->
    <!-- <div v-show="!isSearching" class="pages-control"> -->
    <div class="pages-control">
    <button :disabled="pageNum - 1 <= 0 ? true : false" @click="changePage(pageNum-1)">Prev Page</button><p>Page {{pageNum}}</p><button @click="changePage(pageNum+1)">Next Page</button>
    </div>
    <search-bar></search-bar>
    <!-- <button @click="showPlaying">Show Movies</button> -->
    <the-movie></the-movie>
  </div>
</template>

<script>

import TheMovie from './components/TheMovie.vue'
import SearchBar from './components/SearchBar.vue'
export default {
  components: {
    SearchBar,
    TheMovie,
  },
  methods: {
    // showPlaying() {
    //   this.isShowing = !this.isShowing
    // },
    changePage(pageTo) {
      this.pageNum = pageTo;
      if(!this.isSearching) {
        this.$store.dispatch('fetchMovie', this.pageNum)
      }else {
        this.$store.dispatch('searchMovie', {
          searched: this.$store.state.currentSearch,
          page: this.pageNum
         })
      }
    },
    resetApp() {
      this.$store.dispatch('fetchMovie');
      this.$store.dispatch('backToHome');
      this.pageNum = 1;
    },
  },
  computed: {
      nowPlaying() {
        return this.$store.state.movieList
      },
      isSearching() {
        return this.$store.state.isSearching;
      }
    },
  data() {
    return {
      isShowing: false,
      pageNum: 1,
    }
  },
  
}
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,800;1,600&family=Staatliches&display=swap);
body {
  margin: 0;
}
#app {
  font-family: 'Staatliches', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgba(245, 245, 245, 0.658);
  height: 100vh;
}
.pages-control {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

h1, button {
  text-align: center;
  margin: 0;
  font-family: 'Staatliches', cursive;
  cursor: pointer;
}
h1 {
  padding-top: 20px;
}
button {
     font-family: 'Nunito', sans-serif;
     font-weight: 600;
     padding: 10px;
     border: 1px solid transparent;
     border-radius: 5px;
     background-color: rgb(252, 176, 34);
     cursor: pointer;
     outline: none;
}
li {
  list-style: none;
}
.pages-control p {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
