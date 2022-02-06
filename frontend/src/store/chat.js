module.exports={
    namespaced:true,
    state:{
        messages:[],
    },
    mutations:{
        addMessage(state, payload){
            state.messages.unshift(payload);
        },
        setMessages(state, payload){
            state.messages = payload;
        },
        clearMessages(state){
            state.messages = [];
        }
    },
    actions:{
        addMessage(state, payload){
            state.commit('addMessage', payload);
        },
        setMessages(state, payload) {
            state.commit('setMessages', payload);
        }
    },
    getters:{
        getMessages: state=>state.messages
    },
}
