<template>
  <div>

{{recordList}}
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount"  @submit="saveRecord"/>
      <Types :type.sync="record.type" />
      <Notes @update:value="onUpdateNotes"/>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
  </div>
</template>

<script lang="ts">

import Tags from '@/components/Money/Tags.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';


type Record ={
  tags:string[],
  amount:number,
  type:string,
  notes:string,  //类型
  createAt?:Date  //类

}

@Component({
      components: {
        Tags,
        NumberPad,
        Types,
        Notes,
      }
    }
)
export default class Money extends Vue {

  tags= ['衣', '食', '住', '行', '吃', '穿', '玩', '乐']

  record:Record ={
    tags:[],
    amount:0,
    type:'-',
    notes:'',
  }
   recordList:Record[] = JSON.parse(localStorage.getItem('recordList')||'[]')
  onUpdateTags(value:string[]){
    this.record.tags=value
  }
  onUpdateAmount(value:string){
    this.record.amount=parseFloat(value)
  }
  onUpdateNotes(value:string){
    this.record.notes=value
  }
  saveRecord(){
    const record2:Record =JSON.parse( JSON.stringify(this.record))  //深拷贝
    record2.createAt = new Date()
    this.recordList.push(record2)
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
  }



}
</script>

<style lang="scss">

.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>