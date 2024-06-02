<template>
  <div>
    <div class="header" @click="open = !open" @keydown.enter="open = !open">
      <span v-if="open">
        <slot name="collapse"></slot>
      </span>
      <span v-if="!open">
        <slot name="expand"></slot>
      </span>
    </div>
    <slot v-if="open"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>

<style scoped>
.header {
  background-color: #bbb;
  padding: 3px;
  cursor: pointer;
}
</style>
