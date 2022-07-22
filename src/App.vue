<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <main class="container mt-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
@import "./assets/base.css";
</style>