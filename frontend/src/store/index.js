import {createStore} from 'vuex'
import io from '@/socket';

// import separate modules
import chat from '@/store/chat';
import scoreboard from '@/store/scoreboard';
import games from '@/store/games';

// importing plugins
import createDataInitializer from "@/store/plugins/initializeDataPlugin";
import createChatSocketPlugin from "@/store/plugins/chatSocketPlugin";

// creating plugin instances
const dataInitPlugin = createDataInitializer(io.socket);
const chatPlugin = createChatSocketPlugin(io.socket);

export default createStore({
    state: {
        player:false,
    },
    mutations: {
        setPlayer(state, payload){
            state.player = payload;
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
        }
    },
    modules: {
        chat: chat,
        scoreboard: scoreboard,
        games: games,
    },
    plugins:[
        dataInitPlugin,
        chatPlugin
    ],
    getters: {
        getPlayer: state=>state.player
    }
})
