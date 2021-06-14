import stringMatching = jasmine.stringMatching;

const localStorageKeyName ='tagList'
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
const tagListModel:tagListModel={
    data:[],

    fetch(){
        this.data =  JSON.parse(localStorage.getItem(localStorageKeyName)||'[]');
        return this.data
    },
    create(name){
        const names = this.data.map(item=>item.name)
        if(names.indexOf(name)>=0){
            return 'duplicated'
        }else{
            this.data.push({id:name,name:name})
            this.save()
            return 'success'
        }
    },
    update(id,name){
       const tag = this.data.filter(item=>item.id===id)[0]
        if(tag && tag.name!==name){
            tag.name= name;

            this.save()
            return 'success'
        }else if(tag.name===name){
            return 'duplicated'
        }else
        {
            return 'NotFound'
        }

    },
    remove(id:string){
        let index=-1
        for (let i = 0 ;i<=this.data.length;i++){
            if(this.data[i].id===id){
                index=i;
                break;
            }
        }

        console.log(index);
        this.data.splice(index,1)
        this.save()
        return true
    },
    save(){

        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
    }
}
export  default tagListModel