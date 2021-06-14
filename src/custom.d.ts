
type RecordItem ={
    tags:string[],
    amount:number,
    type:string,
    notes:string,  //类型
    createAt?:Date  //类
}
type Tag ={
    id:string,
    name:string
}

type tagListModel={
    data : Tag[],
    fetch:()=>Tag[],
    create:(name:string)=> 'success'|'duplicated', //联合类型
    update:(id:string,name:string)=>'success'|'duplicated' |'NotFound',
    remove:(id:string)=> boolean
    save : ()=> void

}
interface Window {
    tagList: Tag[],
    createTag: (name: string) => void,
    removeTag: (id: string) => boolean
    updateTag: tagListModel['update']       //类型完全一样(id:string,name:string)=>'success'|'duplicated' |'NotFound'
    findTag: (id: string) => Tag | undefined
    recordList: RecordItem[]
    createRecord: (record: RecordItem) => void

}
