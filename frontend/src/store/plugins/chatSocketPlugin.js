export default function createChatSocketPlugin(socket){
    return store=>{
        socket.on('newmessage', data=>{
            store.commit('chat/addMessage', data);
        });
        store.subscribe(mutation=>{
            console.log(mutation.type);
        });
    }
}
