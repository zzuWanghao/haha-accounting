<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome  Your Vue.js App"/>
  </div>
</template>

<style lang="scss" >

@import "../assets/styles/reset";

body{
  background-color: $color;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>


