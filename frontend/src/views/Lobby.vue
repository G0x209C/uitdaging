<template>
  <div class="lobby">

    <div class="d-flex justify-content-between">
      <div class="container w-50 h-100 bg-dark bg-opacity-75 py-3 rounded">
        <img src="../assets/uitdaging.png" class="img-fluid rounded mb-2" alt="">
        <Scoreboard></Scoreboard>
      </div>
      <div class="container">
        <div class="d-block row">
          <div class="col">
            <div class="jumbotron rounded bg-dark bg-opacity-75 px-2 py-2">
              <h3 class="text-white">
                Game lijst
              </h3>
              <GameMenu></GameMenu>
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
import Scoreboard from "@/components/scoreboard/Scoreboard";
import GameMenu from "@/components/gamemenu/GameMenu";
import {useCookies} from "vue3-cookies";
import {mapActions, mapGetters} from "vuex";

export default {
  setup() {
    const {cookies} = useCookies();
    return {cookies};
  },
  components: {
    Chat,
    Scoreboard,
    GameMenu
  },
  methods: {
    ...mapActions(['unsetPlayer']),
  },
  computed: {
    ...mapGetters(['getPlayer']),
    player() {
      return this.getPlayer;
    },
  },
  mounted() {
    if (!this.cookies.get('secret')) {
      this.unsetPlayer();
      this.$router.push({name: 'Start', params: {msg: 'User expired', isError: true}});
    } else {
      this.$io.socket.post('/joinroom', {secret: this.cookies.get('secret')}, (res, jwres) => {
        if (!res.status) {
          console.log(res.message);
        }
      });
    }

    // register an event-listener for when the room starts a game.
    this.$io.socket.on('startgame', game => {
      // for now a simple window.location = will suffice
      console.log('triggered');
      console.log(game);

      window.location = `${this.$gameHost}${game.link}/?secret=${this.player.secret}`
      //window.location=`${game.link}`;

    });
  },
}
</script>
