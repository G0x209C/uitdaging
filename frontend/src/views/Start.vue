<template>
<div class="container">
  Hey
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
  }
}
</script>
