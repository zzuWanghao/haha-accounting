import Vue from 'vue';
import Component from 'vue-class-component';

const map:{[key:string]:string} ={
  'tag name duplicated':'标签名重复'
}
@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) { return window.alert('标签名不能为空'); }
    this.$store.commit('createTag', {name,img:'else'});
    if (this.$store.state.createError){
      window.alert(map[this.$store.state.createError.message]||'未知错误')
     return;
    }
    window.alert('添加成功');
  }
}

export default TagHelper;
