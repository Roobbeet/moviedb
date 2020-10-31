import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      movieList: {},
      isSearching: false,
      currentSearch: '',
    },
    mutations: {
      addMovies(state, movie) { //yang mana state yg mau diubah, apa yang jadi payloadnya
        state.movieList = movie;
      },
      searchMovie(state, searchRes) {
        state.movieList = searchRes;
        state.isSearching = true;
      },
      unsearch(state) {
        state.isSearching = false;
      }
    },
    actions: {
      // API Key 21059414113068a2e3b8e2e21349cb28
        fetchMovie({commit}, payload) { //commit adalah method dari store, jadi bisa masuk ke par si actions --> tradisionalnya adalah store.commit
          if(payload) {
            axios(`https://api.themoviedb.org/3/movie/now_playing?api_key=21059414113068a2e3b8e2e21349cb28&language=en-US&page=${payload}`)
            .then(movieData => {
              commit('addMovies', movieData.data)}) //melakukan commit pada nowPlaying
            .catch(er => console.log(er))
          } else {
            axios('https://api.themoviedb.org/3/movie/now_playing?api_key=21059414113068a2e3b8e2e21349cb28&language=en-US')
                .then(movieData => {
                  commit('addMovies', movieData.data)}) //melakukan commit pada nowPlaying
                .catch(er => console.log(er))
          }
                
 
        },
        searchMovie({commit, state}, {searched, page = 1}) {
          state.currentSearch = searched;
          console.log(state.currentSearch)
          const modifiedPayload = state.currentSearch.split(' ').join('%20'); //because screw u regex lul atau pake encodeURI()
          console.log(modifiedPayload);
          if(state.currentSearch === '') {
            axios(`https://api.themoviedb.org/3/movie/now_playing?api_key=21059414113068a2e3b8e2e21349cb28&language=en-US&page=${page}`)
                .then(movieData => {
                  commit('addMovies', movieData.data)}) //melakukan commit pada nowPlaying
                .catch(er => console.log(er))
          } else {
            axios(`https://api.themoviedb.org/3/search/movie?api_key=21059414113068a2e3b8e2e21349cb28&language=en-US&query=${modifiedPayload}&page=${page}&include_adult=true`)
          .then(res => commit('searchMovie', res.data))
          .catch(er => console.log(er))
          }
          
          
        },
        backToHome({commit}) {
          commit('unsearch')
        }

    }
  })

 export default store