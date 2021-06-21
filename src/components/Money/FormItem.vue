<template>
  <div>
    <label class="notes">
      <span class="name">{{this.fieldName}}</span>

      <template v-if="type === 'date'">
        <input :type="type || 'text'"
               :value="format(value)"
               @input="onChangeValue($event.target.value)"
               :placeholder="this.placeholder">
      </template>
      <template v-else>
        <input :type="type || 'text'"
               :value="value"
               @input="onChangeValue($event.target.value)"
               :placeholder="this.placeholder">
      </template>

    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import dayjs from 'dayjs';
@Component
export  default  class Notes extends Vue{
  @Prop({default:''}) readonly value! :string
  @Prop({required:true}) fieldName!:string;
  @Prop() placeholder?:string;

  @Prop() type?: string;

  onChangeValue(newValue: string){
    this.$emit('update:value',newValue)
  }
  format(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DD');
  }
}

  // export default {
  //   name: 'Notes'
  // };
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    //background: #f5f5f5;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .name {
      padding-right: 16px;
    }
    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>