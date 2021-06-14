<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount"  @submit="saveRecord"/>
      <Types :type.sync="record.type" />
      <div class="notes">

        <FormItem @update:value="onUpdateNotes" :field-name="'备注'" :placeholder="'请在此输入'"/>
      </div>

      <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
  </div>
</template>

<script lang="ts">

import Tags from '@/components/Money/Tags.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

// const recordListModel =  require('@/recordListModel.ts').default
console.log(recordListModel);

const tagList = tagListModel.fetch();

@Component({
      components: {
        Tags,
        NumberPad,
        Types,
        FormItem,
      }
    }
)
export default class Money extends Vue {

  tags= tagList

  // eslint-disable-next-line no-undef
  record:RecordItem ={
    tags:[],
    amount:0,
    type:'-',
    notes:'',
  }

  // eslint-disable-next-line no-undef
   recordList:RecordItem[] = recordListModel.fetch()

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
   recordListModel.create(this.record)
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