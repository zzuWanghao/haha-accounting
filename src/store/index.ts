import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import store from '@/store/index';
import createId from '@/lib/idCreator';
import router from '@/router';

Vue.use(Vuex)
const localStorageKeyName = 'recordList';



export default new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    createError:null
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    },
    createRecord(state,record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = record2.createdAt || new Date().toISOString();
      store.state.recordList && store.state.recordList.push(record2);
     store.commit( 'saveRecords')
    },

    saveRecords() {
      window.localStorage.setItem('recordList', JSON.stringify(store.state.recordList));
    },




    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },

    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
     if (!state.tagList|| state.tagList.length===0){
       store.commit('createTag','衣')
       store.commit('createTag','食')
       store.commit('createTag','住')
       store.commit('createTag','行')
     }
    },
    createTag(state,name: string) {
      state.createError=null
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        state.createError = new Error('tag name duplicated')
        return;
      }
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');


    },
    removeTag(state,id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      store.state.tagList.splice(index, 1);
      store.commit('saveTags');
      if (index>=0){
        router.back();
      }else {
        window.alert('删除失败')
      }

    },
    updateTag(state, {id:id, name:name}) {
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
          return 'success';
        }
      } else {
        return 'not found';
      }
    },
    saveTags() {
      window.localStorage.setItem('tagList', JSON.stringify(store.state.tagList));
    }



  },
  actions: {
  },
  modules: {
  }
})
