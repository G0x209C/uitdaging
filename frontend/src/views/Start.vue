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
    <div class="d-flex justify-content-center">
      <div v-bind:class="{'text-danger': this.$route.params.isError}">{{ this.$route.params.msg }}</div>
    </div>
    <div class="d-flex justify-content-center">
      <div id="msg" v-bind:class="{'text-danger': msgIsError}">{{ msg }}</div>
    </div>

    <form @submit.prevent="sendLogin">
      <div class="d-flex p-3 m-auto justify-content-center">
        <input type="text" class="input-group-text ms-2" v-model="naam" placeholder="naam">
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
export default {
  mounted(){
    this.$io.socket.post('/test', {}, (data,jwres)=>{
      console.log(jwres);
    });
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
