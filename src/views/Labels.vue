<template>
  <Layout>
    <div class="tags">
    <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id"><span>{{ tag.name }}</span><Icon X="right"/></router-link>

    </div>
    <div class="createTag">
      <Button class="button" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import Button from '@/components/Button.vue';
tagListModel.fetch()
@Component({
  components: {Button}
})
export default class Labels extends Vue{

  tags = tagListModel.data

  createTag(){
   const name = window.prompt('请输入标签名')
    if(name){
     const message= tagListModel.create(name)
      if(message==='duplicated'){
        window.alert('标签名重复')
      }else if (message==='success'){
        window.alert('添加标签成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.tags{
  padding-left: 16px;
  .tag{
    min-height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid  rgb( 213,213,216);

    svg{
      width: 1em;
      height: 1em;
      color: #666;
      margin-right: 16px;
    }
  }

}

.createTag{
text-align: center;
  margin-top: 44px;
}


</style>