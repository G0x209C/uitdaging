<template>
  <div class="d-grid justify-content-between">
    <div class="row">
      <div class="col-sm-12">
        <div class="container-fluid">
          <Chat-inbox></Chat-inbox>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="container">
          <Chat-input></Chat-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatInbox from '@/components/chat/ChatInbox';
import ChatInput from '@/components/chat/ChatInput';

export default {
  components: {
    ChatInbox,
    ChatInput
  }
};
</script>
