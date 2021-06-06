<template>
<div>
  <svg class="icon">
<!--    <use xlink:href="#money" />-->
    <use v-bind:xlink:href="'#'+X" />
  </svg>
</div>
</template>

<script lang="ts">
//将目录中的svg文件全部引用

// eslint-disable-next-line no-undef
let importAll = (requireContext:__WebpackModuleApi.RequireContext)=>requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('../assets/icons',true,/\.svg$/));
}catch (error)
{
  console.log(error);
}


export default {
  props:['X'],
  name: 'Icon'
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>