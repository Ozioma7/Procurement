<script setup>
import SideBar from './SideBar.vue';
</script>

<template>
  <main class="lg:flex items-start sm:pb-24 font-inter">
    <SideBar />
    <main class="md:w-full">
      <slot name="main-content" />
    </main>
  </main>
</template>
