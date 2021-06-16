<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :type.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :type.sync="interval"/>
      <ol>
        <li v-for="(group,index) in result" :key="index">
         <h3 class="title">{{index}}</h3>
          <ol>
            <li  class="record" v-for="item in group" :key="item.id">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}} </span>
            </li>
          </ol>
        </li>
      </ol>
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

  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
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

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

</style>