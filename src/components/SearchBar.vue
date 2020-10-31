<template>
    <form >
    <input class="searchbar" v-model="search" @keyup.enter="userInput" type="text" ref="inputSearch">
    <button @click.prevent="userSearch">Search</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            search: '',
        }
    },
    methods: {
        userSearch() {
            this.$store.dispatch('searchMovie', {searched: this.search, page: 1})
            console.log(this.$store.state.movieList)
            //get the array of searched movies
            this.search = '';
        }
    },
}
</script>

<style>
 .searchbar {
     width: 300px;
     padding: 10px;
     border: solid 1px rgba(128, 128, 128, 0.719);
     border-radius: 5px;
     margin: 20px 30px;
     outline: none;
     font-family: 'Nunito', sans-serif;
     font-weight: 300;
 }
 form button {
     padding: 10px;
     border: 1px solid transparent;
     border-radius: 5px;
     background-color: rgb(252, 176, 34);
     cursor: pointer;
 }
</style>