<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <inspiro-section></inspiro-section>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import InspiroSection from './components/InspiroSection.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    InspiroSection,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased; */
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 15px;
  /* margin-top: 60px; */
}
</style>
