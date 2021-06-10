<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li @click="toggle(tag)" :class="{selected:selectTags.indexOf(tag)>=0 }" v-for="tag in dataSource" :key="tag">
        {{ tag }}
      </li>

    </ul>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop() readonly dataSource: string[] | undefined;
  selectTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectTags.indexOf(tag);
    if (index >= 0) {
      this.selectTags.splice(index, 1);
    }
    else {
      this.selectTags.push(tag);
    }
    this.$emit('update:value',this.selectTags)
  }

  create() {
    const name = window.prompt('请输入标签名称');

    if (name === '') {
      window.alert('标签名不能为空，请重新输入');
    } else if (this.dataSource !== undefined) {
      this.$emit('update:dataSource', [...this.dataSource, name]);
    }


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