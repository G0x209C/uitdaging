<template>
<div id="start">
  <div class="container">
    <div class="p-8 bg-dark rounded">
      <div class="w-50 mx-auto d-block">
        <img src="../assets/uitdaging.png" class="img-fluid" alt="">
      </div>
    </div>
  </div>
  <div class="container border-light rounded bg-dark text-white">
    <hr>
    <div class="d-flex justify-content-center">
      <h4>Login to application</h4>
    </div>
    <hr>
    <div class="d-flex justify-content-center" v-if="this.$route.params.msg">
      <div v-bind:class="{'text-danger': this.$route.params.isError}">{{ this.$route.params.msg }}</div>
    </div>
    <div class="d-flex justify-content-center">
      <div id="msg" v-bind:class="{'text-danger': msgIsError}">{{ msg }}</div>
    </div>

    <form @submit.prevent="sendLogin">
      <div class="d-flex p-3 m-auto justify-content-center">
        <input type="text" class="input-group-text ms-2" v-model="name" placeholder="naam" required>
        <input type="text" class="input-group-text ms-2" v-model="code" placeholder="Kamercode (optioneel)">
      </div>
      <div class="d-flex p-3 m-auto justify-content-center">
        <button class="btn btn-info" type="submit">Start/Join spel!</button>
      </div>
    </form>

  </div>
</div>
</template>

<style>
body{
    margin-top:20px;
}
</style>

<script>
import {useCookies} from 'vue3-cookies';

export default {
  setup(){
    const {cookies} = useCookies();
    return {cookies};
  },
  mounted(){
  },
  methods:{
    sendLogin(){
      this.$io.socket.post('/api/register', {name:this.name, code:this.code}, (res,jwres)=>{
        if(jwres.statusCode===200){
          // set the secret as a cookie.
          this.cookies.set('secret', res.secret);
          // initialize data with the secret and join the socket to room.
          this.$io.socket.post('/initdata', {secret:res.secret}, (res,jwres)=>{});
          this.$io.socket.post('/joinroom', {secret:res.secret}, (res,jwres)=>{
            if(!res.status){
              console.log(res.message);
            }
          })
          this.$router.push('/lobby');
        }else{
          console.log(jwres.error);
        }
      });
    }
  },
  data(){
    return {
      name: '',
      code: '',
      msg: '',
      msgIsError: false,
    };
  },
}
</script>
