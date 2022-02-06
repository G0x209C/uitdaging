<template>
  <div class="jumbotron bg-black rounded bg-opacity-75 text-white">
    <div id="jb" class="d-flex">
      <div v-for="message in messages">
        <div   class="d-flex justify-content-start text-white">
          <div v-bind:class="{'text-danger': message.isHost}">{{ message.name }} said:&nbsp;</div>
          <div v-bind:class="{'text-danger': message.isHost}">{{ message.message }}</div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
#jb {
  height: 200px !important;
  overflow-y: scroll;
  overflow-x: auto;
  flex-direction: column-reverse;
}
</style>

<script>
import {mapGetters} from 'vuex';
import {useCookies} from 'vue3-cookies';

export default {
  setup() {
    const {cookies} = useCookies();
    return {cookies};
  },
  computed: {
    ...mapGetters({getMessages: 'chat/getMessages'}),
    messages() {
      return this.getMessages;
    }
  },
  mounted() {

  },
};
</script>
