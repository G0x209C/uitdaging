import {createStore} from 'vuex'
import io from '@/socket';

// import separate modules
import chat from '@/store/chat';
import scoreboard from '@/store/scoreboard';
import games from '@/store/games';

// importing plugins
import createDataInitializer from "@/store/plugins/initializeDataPlugin";
import createChatSocketPlugin from "@/store/plugins/chatSocketPlugin";
import createScoreboardSocketPlugin from "@/store/plugins/scoreboardSocketPlugin";

// creating plugin instances
const dataInitPlugin = createDataInitializer(io.socket);
const chatPlugin = createChatSocketPlugin(io.socket);
const scoreboardPlugin = createScoreboardSocketPlugin(io.socket);

export default createStore({
    state: {
        player:false,
        error: false,
    },
    mutations: {
        setPlayer(state, payload){
            state.player = payload;
        },
        setError(state, payload){
            state.error = payload;
        },
        unsetPlayer(state){
            state.player = false;
        }
    },
    actions: {
        setPlayer(state, payload){
            state.commit('setPlayer', payload);
        },
        unsetPlayer(state){
            state.commit('unsetPlayer');
            state.commit('chat/clearMessages');
            state.commit('scoreboard/clearScoreboard');
        }
    },
    modules: {
        chat: chat,
        scoreboard: scoreboard,
        games: games,
    },
    plugins:[
        dataInitPlugin,
        chatPlugin,
        scoreboardPlugin
    ],
    getters: {
        getPlayer: state => state.player,
        getError: state => state.error
    }
})
