<template>
  <div id="gamemenu">
    <div class="d-flex justify-content-center">

      <transition name="grow">
        <div v-if="this.msg" class="rounded bg-opacity-75 text-white mb-2 mt-1 px-5 py-1"
             v-bind:class="{'bg-info': !this.isError}, {'bg-danger': this.isError}">
          {{ this.msg }}
        </div>

      </transition>
    </div>

    <div class="list-group">

      <div v-for="game in games" :key="game.id" v-bind:class="{'disabled' : !this.player.isHost}">
        <div class="notextdec list-group-item rounded-2 mb-1 mousepointer" @click="setGame(game)"
             v-bind:class="{'text-secondary': !this.player.isHost}">
          {{ game.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notextdec, .notextdec:active, .notextdec:hover, .notextdec:focus {
  text-decoration: none;
}

.grow-enter-active {
  animation: harden 0.38s ease-in;
}

.grow-leave-active {
  animation: harden 0.38s ease reverse;
}

@keyframes harden {
  0% {
    transform: scale3d(0,0,0.2);
  }
  25% {
    transform: scale3d(0.5,0.25,0.3);
  }
  50% {
    transform: scale3d(0.75,0.8,0.6);

  }
  75% {
    transform: scale3d(0.9,0.95,0.9);


  }
  100% {
    transform: scale3d(1,1,1);
  }
}

.mousepointer {
  cursor: pointer;
}
</style>

<script>

import {mapGetters} from "vuex";
import {useCookies} from "vue3-cookies";

export default {
  setup(){
    const {cookies} = useCookies();
    return {cookies};
  },
  data() {
    return {
      msg: null,
      isError: false,
    };
  },
  computed: {
    ...mapGetters('games', ['getGames']),
    ...mapGetters(['getPlayer']),
    games() {
      return this.getGames;
    },
    player() {
      return this.getPlayer;
    }
  },
  methods: {
    setGame(game) {
      if (this.player.isHost) {
        let gameid = game.id;
        console.log(gameid);
        this.$io.socket.post('/api/setgame', {secret: this.cookies.get('secret'), gameId: gameid}, (res, jwres) => {
          if (res) {
            console.log(res);
            if (!res.success) {
              this.isError = true;
              this.msg = res.message;
            }
          }
        });
      }
    }
  },
}
</script>
