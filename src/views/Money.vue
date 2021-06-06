<template>

  <Layout>
    Money.vue
  </Layout>
</template>

<script lang="ts">
export default {
  name: 'Money',

};
</script>

<style lang="scss" >
.nav-wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid green ;

  .content{
    overflow: auto; //滚动条
    flex-grow: 1;
  }
}

</style>