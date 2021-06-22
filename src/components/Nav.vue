<template>
<nav>

  <router-link to="/labels" class="item" active-class="selected">
    <Icon X="labels" />
    标签</router-link>
  <router-link to="/money" class="item" active-class="selected">
    <Icon X="money" />
    <div>记账</div>
  </router-link>
  <router-link to="/statistics" class="item" active-class="selected">
    <Icon X="statistics" />
    统计</router-link>
</nav>
</template>

<script lang="ts">

export default {

  name: 'Nav',

};
</script>

<style lang="scss"  >
a{
  display: flex;
}
nav{
  //border:1px solid red;
  display:flex;
  box-shadow: 0 0 3px rgba(0,0,0,0.25);
  flex-direction: row;
  font-size: 12px;

  .item{
    width: 33.3333333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3px 0;
     .icon{
      width: 32px;
      height: 32px;
    }
  }
.selected{
    color: red;
  }
}
</style>