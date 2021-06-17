<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li @click="toggle(tag.name)" :class="{selected:selectTags.indexOf(tag.name)>=0 }" v-for="tag in tagList" :key="tag.id">
        {{ tag.name }}
      </li>

    </ul>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/index2';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
@Component

export default class Tags extends mixins(TagHelper) {

  get tagList(){
    return  this.$store.state.tagList
  }

  selectTags: Tag[] = [];

  toggle(tag: Tag) {
    const index = this.selectTags.indexOf(tag);
    if (index >= 0) {
      this.selectTags.splice(index, 1);
    }
    else {
      this.selectTags.push(tag);
    }
    this.$emit('update:value',this.selectTags)
  }

  created(){
    this.$store.commit('fetchTags');
  }


}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  background: white;
  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      background: #d9d9d9;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;

      &.selected {
        background: darken(#d9d9d9, 50%);
        color: #fff;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}

</style>