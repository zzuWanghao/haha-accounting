<template>
  <div>
    <Layout class-prefix="layout">
      <tabs :data-source="recordTypeList"
            :type.sync="record.type" />
      <Tags  @update:value="onUpdateTags"/>

      <div class="notes">
        <FormItem :value.sync="record.notes"  :field-name="'备注'" :placeholder="'写点什么吧'"/>
      </div>

      <div class="createdAt">
        <FormItem field-name="日期"
                  type="date"
                  placeholder="在这里输入日期"
                  :value.sync="record.createdAt"
        />
      </div>

      <NumberPad :value.sync="record.amount"  @submit="saveRecord"/>
<!--      <Types :type.sync="record.type" />-->
    </Layout>
  </div>
</template>

<script lang="ts">

import Tags from '@/components/Money/Tags.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constans/typeList';
// import oldStore from '@/store/index2.ts'

@Component({
      components: {
        Tabs,
        Tags,
        NumberPad,
        FormItem,
      }
    }
)
export default class Money extends Vue {

  recordTypeList=typeList
  // eslint-disable-next-line no-undef
  record:RecordItem ={
    tags:[],
    amount:0,
    type:'-',
    notes:'',
    createdAt:new Date().toISOString()
  }
  created() {
    this.$store.commit('fetchRecords');
  }
  get recordList() {
   return  this.$store.state.recordList
  }


  onUpdateTags(value:Tag[]){
    this.record.tags=value
  }
  onUpdateAmount(value:string){
    this.record.amount=parseFloat(value)
  }
  onUpdateNotes(value:string){
    this.record.notes=value
  }
  saveRecord(){
    if (!this.record.tags||this.record.tags.length===0){
       window.alert('请选择至少一个标签')
      return;
    }
    this.$store.commit('createRecord',this.record)
    window.alert('添加成功')
    this.record.notes='';
  }



}
</script>

<style lang="scss">
.createdAt{
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

}
.layout-content {
  display: flex;
  flex-direction: column;
}
.notes{
  padding: 6px 0;
}
</style>