
module.exports={
    namespaced:true,
    state:{
        scoreboard:[]
    },
    mutations:{
        // initialize the scoreboard
        setScoreboard(state, payload){
            state.scoreboard=payload;
        },
        // add a player to scoreboard
        addPlayer(state, payload){
            // push player object onto stack
            state.scoreboard.push(payload);
        },
        // remove a player from scoreboard;
        removePlayer(state, payload){
            // remove player object
            state.scoreboard.splice(state.scoreboard.indexOf(payload),1);
        },
        clearScoreboard(state){
            state.scoreboard = [];
        }
    },
    actions:{
        // initialize the scoreboard
        setScoreboard(state, payload) {
            state.commit('setScoreboard', payload);
        },
        // add a player to scoreboard
        addPlayer(state, payload){
            state.commit('addPlayer', payload);
        },
        // remove a player from scoreboard;
        removePlayer(state, payload){
            state.commit('removePlayer', payload);
        },
        clearScoreboard(state){
            state.commit('clearScoreboard');
        }
    },
    getters:{
        getScoreboard: state=>state.scoreboard
    },


}
