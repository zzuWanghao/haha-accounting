<template>
  <div>


    <Layout class-prefix="layout">
      <NumberPad/>
      <Types/>
      <Notes/>
      <Tags :data-source.sync="tags"/>
    </Layout>
  </div>
</template>

<script lang="ts">

import Tags from '@/components/Money/Tags.vue'
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';

export default {
  name: 'Money',
  components:{
    Tags,
    NumberPad,
    Types,
    Notes
  },
  data(){
    return {
      tags:['衣','食','住','行','吃','穿','玩','乐']
    }
  }

};
</script>

<style lang="scss">

.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>