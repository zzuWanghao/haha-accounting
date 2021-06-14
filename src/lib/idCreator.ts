
let id:number = parseInt( window.localStorage.getItem('_id_Max')||'0')||0;

function createId(){
    id++
    return id
}

export default createId