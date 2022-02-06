<template>
  <form @submit.prevent="sendMessage()" class="d-flex">
    <div class="">
      <input type="text" v-model="chatinput" class="input-group-text m-2" placeholder="chatbericht">
    </div>
    <div class="">
      <button class="btn btn-info m-2" type="submit">Send message</button>
    </div>
  </form>
</template>

<script>
import {useCookies} from "vue3-cookies";
import {mapActions, mapGetters} from "vuex";

export default {
  setup() {
    const {cookies} = useCookies();
    return {cookies};
  },
  data() {
    return {
      chatinput: '',
    };
  },
  computed:{
    ...mapGetters(['getPlayer']),
    player(){
      return this.getPlayer;
    }
  },
  methods: {
    ...mapActions('chat', ['addMessage']),

    sendMessage() {
      if (this.chatinput.length > 0) {
        let player = this.player;
        this.addMessage({name:player.name, isHost:player.isHost, message:this.chatinput});
        this.$io.socket.post('/chat/sendmessage', {
          secret: this.cookies.get('secret'),
          message: this.chatinput
        }, (res, jwres) => {

        });
        this.chatinput = '';
      }
    }
  },
}
</script>
