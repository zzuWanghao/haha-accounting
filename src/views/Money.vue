<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount"  @submit="saveRecord"/>
<!--      <Types :type.sync="record.type" />-->

      <tabs :data-source="recordTypeList"
          :type.sync="record.type" />

      <div class="notes">

        <FormItem @update:value="onUpdateNotes" :field-name="'备注'" :placeholder="'请在此输入'"/>
      </div>

      <Tags  @update:value="onUpdateTags"/>
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
   this.$store.commit('createRecord',this.record)
  }



}
</script>

<style lang="scss">

.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  padding: 6px 0;
}
</style>