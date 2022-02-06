<template>
  <div class="lobby">

    <div class="d-flex justify-content-between">
      <div class="container w-50 h-100 bg-dark bg-opacity-75 py-3 rounded">
        <img src="../assets/uitdaging.png" class="img-fluid rounded mb-2" alt="">
<!--        <Scoreboard></Scoreboard>-->
      </div>
      <div class="container">
        <div class="d-block row">
          <div class="col">
            <div class="jumbotron rounded bg-dark bg-opacity-75 px-2 py-2">
              <h3 class="text-white">
                Game lijst
              </h3>
<!--              <GameMenu class="list-group"></GameMenu>-->
            </div>
          </div>
        </div>
        <div class="d-block row position-absolute bottom-0 end-0">
          <div class="col">
            <Chat></Chat>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Chat from "@/components/chat/Chat";
import {useCookies} from "vue3-cookies";
import {mapActions} from "vuex";

export default{
  setup(){
    const {cookies} = useCookies();
    return {cookies};
  },
  components:{
    Chat
  },
  methods:{
    ...mapActions(['unsetPlayer']),
  },
  mounted(){
    if(!(this.cookies.get('secret'))){
      this.unsetPlayer();
      this.$router.push({name: 'Start', params: {msg: 'User expired', isError: true}});
    }
  },
}
</script>
