import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';


const store = {

    //record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => {
        recordListModel.create(record);
    },

//tag store
    tagList: tagListModel.fetch(),
    createTag: (name: string) => {
        const message = tagListModel.create(name);
        if (message === 'duplicated') {
            window.alert('标签名重复');
        } else if (message === 'success') {
            window.alert('添加标签成功');
        }
    },

    removeTag: (id: string) => {
        return tagListModel.remove(id);
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    },
    findTag(id: string) {
        return this.tagList.filter(item => item.id === id)[0];
    }

};

export  default store