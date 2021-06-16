<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :type.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :type.sync="interval"/>
    <div>
      <ol>
        <li v-for="(group,index) in result" :key="index">
         <h3>{{index}}</h3>
          <ol>
            <li v-for="item in group" :key="item.id">{{item.amount}} | {{item.tags}}</li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>

</template>

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

 get recordList(){
   // eslint-disable-next-line no-undef
   return  (this.$store.state as RootState).recordList
 }
  get result(){
    // eslint-disable-next-line no-undef
    const hashTable:{[key:string]:RecordItem[]}= {}
    const {recordList} = this
    for (let i=0;i<=recordList.length-1;i++){

      const [date,time]= recordList[i].createdAt!.split('T')
      hashTable[date]=hashTable[date]||[];
      hashTable[date].push(recordList[i])
    }
    console.log(hashTable);
    return hashTable
  }

 created(){
   this.$store.commit('fetchRecords')
 }


  type='-'
  interval ='day'
  typeList = typeList
  intervalList = intervalList
}
</script>



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
    height: 48px;
    &.selected{

    }
  }
}

</style>