<template>
  <div class="d-flex justify-content-center flex-column">
    <div class="container rounded bg-dark text-white pb-3">
      <hr>
      <div class="d-flex justify-content-between">
        <h4>Scoreboard</h4>
        <p>{{this.code}}</p>
      </div>
      <hr>
      <div class="d-flex justify-content-around">
        <h6>Name</h6>
        <h6>Score</h6>
      </div>
      <div class="list-group scroll">
        <scoreboard-list></scoreboard-list>
      </div>
    </div>

  </div>
</template>

<script>
import ScoreboardList from "@/components/scoreboard/ScoreboardList";
import {mapGetters} from "vuex";

export default{
  data(){
    return {
      code: '',
    };
  },
  computed:{
    ...mapGetters(['getPlayer']),
    player(){
      return this.getPlayer;
    }
  },
  watch:{
    player(){
      if(this.player){
        this.code = this.player.room.code;
      }
    },
  },
  components:{
    ScoreboardList
  }
}
</script>
