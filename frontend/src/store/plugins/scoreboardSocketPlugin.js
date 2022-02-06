export default function createScoreboardSocketPlugin(socket){
    return store=>{
        socket.on('newplayer', data=>{
            store.commit('scoreboard/addPlayer', data);
        });
        socket.on('removeplayer', data=>{
           store.commit('scoreboard/removePlayer', data);
        });
    }
}
