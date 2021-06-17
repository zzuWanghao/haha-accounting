<template>
  <div>
    <ul class="tabs">
      <li v-for="item in dataSource" :key="item.value"
          :class="{[classPrefix+'-tabs-item']:classPrefix,selected:item.value===type}" @click="selectType(item.value)">{{ item.text }}</li>

    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Tabs extends Vue {
 @Prop({required:true,type:Array}) dataSource! :{text:string,value:string}[];
  @Prop()type!:string;
  @Prop()classPrefix?:string;

  selectType(type: string) {
    this.$emit('update:type',type)

  }
}
</script>

<style lang="scss" scoped>

.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>