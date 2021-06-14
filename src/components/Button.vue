<template>
  <button class="button" >
   <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class Button extends Vue{

}
</script>

<style lang="scss" scoped>
button{
  min-width: 88px;
  min-height: 40px;
  background: #767676;
  border-radius: 4px;
  color: #fff;
}
</style>