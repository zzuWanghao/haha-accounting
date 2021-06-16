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
import intervalList from '@/constans/intervalList';
import typeList from '@/constans/typeList';
@Component({
  components:{Tabs},
})
export default class Statistics extends Vue{

  type='-'
  interval ='day'
  typeList = typeList

  intervalList = intervalList
}
</script>