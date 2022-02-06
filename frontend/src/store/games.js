module.exports = {
    state:{
        games: [],
    },
    mutations:{
        // set the games from init
        setGames(state, payload){
            state.games = payload;
        }
    },
    actions:{
        setGames(state, payload){
            state.commit('setGames', payload);
        }
    },
    getters:{
        getGames: state=>state.games
    }
}
