<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark shrink fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="">Uitdaging</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
              aria-controls="navbarContent" aria-expanded="false" aria-label="Expand menu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" v-if="!player" to="/">Start</router-link>
          </li>
          <li class="nav-item" v-if="player">
            <router-link class="nav-link" to="/lobby">Lobby</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/about">Over uitdaging</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="player">
          <li class="nav-item">
            <a class="nav-link mousepointer" @click.prevent="logOut()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div>
    <!--    <div class="container">-->
    <!--      <div class="jumbotron">-->
    <!--        <div class="d-flex justify-content-center rounded bg-dark bg-opacity-75 mb-2 text-white">-->
    <!--          <div v-bind:class="{'text-danger': this.msgIsError}">-->
    <!--            {{ msg }}-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>


  </div>
</template>

<style>
body {
  padding-top: 3.0rem;
  background-color: royalblue;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.mousepointer{
  cursor: pointer;
}
</style>

<script>
import {mapGetters, mapActions} from 'vuex';
import {useCookies} from "vue3-cookies";

export default {
  setup() {
    const {cookies} = useCookies();
    return {cookies};
  },
  computed: {
    ...mapGetters(['getPlayer', 'getError']),
    player() {
      return this.getPlayer;
    },
    anError(){
      return this.getError;
    }
  },
  watch:{
    anError(){
      if(this.anError){
        this.unsetPlayer();
        this.cookies.remove('secret');
        this.$router.push({name: 'Start', params: {msg: 'User Expired', isError: true}})
      }
    }
  },
  methods: {
    ...mapActions(['unsetPlayer']),
    logOut() {
      let player = this.player;
      let secret = this.cookies.get('secret');
      this.$io.socket.post('/api/logout', {secret: secret}, (res, jwres) => {
      });
      this.unsetPlayer();
      this.cookies.remove('secret');
      this.$router.push({name: 'Start', params: {msg: 'User logged out'}})
    }
  },
  mounted() {
    // has session cookie, init data.
    if (this.cookies.get('secret')) {
      // initialize data with the secret and join the socket to room.
      this.$io.socket.post('/initdata', {secret: this.cookies.get('secret')}, (res, jwres) => {
      });
      this.$io.socket.post('/joinroom', {secret: this.cookies.get('secret')}, (res, jwres) => {
        if (!res.status) {
          console.log(res.message);
        }
      })
      this.$router.push('/lobby');
    }
  }
}
</script>
