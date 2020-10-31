<template>
  <div>
      <ul class="item-list">
      <li class="movie-card" v-for="movie in nowPlaying.results" :key="movie.id">
        <img class="movie-img" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title" width="300px">
        <h2>{{movie.title}}</h2>
        <p>Rating: {{!movie.vote_average ? 'N/A' : movie.vote_average}}</p>
      </li>
      
    </ul>
  </div>
</template>

<script>
export default {
    props: [],
    computed: {
      nowPlaying() {
        return this.$store.state.movieList
      }
    },
    created() {
      this.$store.dispatch('fetchMovie')
    }
}
</script>

<style>
  .item-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    padding: 0;
    margin-top: 50px;
  }
  .item-list li {
    width: 360px;
    margin-right: 20px;
    margin-bottom: 30px;
    padding: 30px 10px 20px 10px;
    border: 1px solid #f0f0f0;
    background-color: rgba(245, 245, 245, 0.658);
    box-shadow: -1px 2px 19px -3px rgba(0,0,0,0.75);
    transition: transform 0.3s;
    cursor: pointer;
  }
  h2 {
    font-family: 'Nunito', sans-serif;
     font-weight: 800;
  }
  p {
    font-family: 'Nunito', sans-serif;
     font-weight: 300;
  }
  .item-list li:hover {
    transform: scale(1.04);
  }
  .movie-img {
    width: 200px;
  }
</style>