export default function createDataInitializer(socket) {
    return store => {
        socket.on('initdata', data => {
            console.log('triggered');
            // TODO: init the datastores.
            if (data.success) {
                store.commit('chat/setMessages', data.messages);
                store.commit('scoreboard/setScoreboard', data.scoreboard);
                store.commit('setPlayer', data.player);
                store.commit('games/setGames', data.games);
            }else{
                store.commit('setError', true);
            }
        });
    }
}
