<template>
  <div v-for="player in players" :key="player.id" class="list-group-item">
    <div class="d-flex justify-content-evenly" v-bind:class="{'text-danger': player.isHost}, {'text-info' : !player.isHost}">
      <div class="container text-center">
        {{player.name}}
      </div>
      <div class="container text-center">
        {{player.score}}
      </div>
    </div>
  </div>

</template>


<script>

import {mapGetters} from "vuex";

export default{
  setup(){},
  computed:{
    ...mapGetters('scoreboard', ['getScoreboard']),
    players(){
      return this.getScoreboard;
    }
  },
}
</script>
