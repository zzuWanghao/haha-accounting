
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
    tagList:Tag[]
}
