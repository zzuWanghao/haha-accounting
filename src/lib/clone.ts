function clone (data:any){
    return JSON.parse( JSON.stringify(data))  //深拷贝
}

export default clone