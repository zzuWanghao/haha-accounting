<template>
<div class="nav">
  <router-link to="/money">
    <Icon X="money" />记账
  </router-link>|
  <router-link to="/labels">
    <Icon X="labels" />
    标签</router-link>|
  <router-link to="/statistics">
    <Icon X="statistics" />
    统计</router-link>
</div>
</template>

<script lang="ts">

// import L from  '@/assets/icons/labels.svg'
// import M from  '@/assets/icons/money.svg'
//
// console.log(L);
// console.log(M);

export default {

  name: 'Nav',

};
</script>

<style lang="scss" scoped >
a{
  display: flex;
}
.nav{
  border:1px solid red;
  display:flex;
}
</style>