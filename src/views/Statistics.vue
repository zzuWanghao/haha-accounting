<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :type.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :type.sync="interval"/>
  </Layout>
</template>




<style lang="scss" scoped>
::v-deep >.tabs{
  .type-tabs-item{
    background: white;
  &.selected{
    background: #c4c4c4;
    &::after{
      display: none;
    }
  }
}
  .interval-tabs-item{
    &.selected{

    }
  }
}

</style>


<script lang="ts">
import Tabs from '@/components/Tabs.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component({
  components:{Tabs},
})
export default class Statistics extends Vue{

  type='-'
  interval ='day'
  typeList = [
    {text:'支出',value:'-'},
    {text:'收入',value:'+'},

  ]

  intervalList = [
    {text:'按日',value:'day'},
    {text:'按月',value:'week'},
    {text:'按周',value:'money'},
  ]
}
</script>