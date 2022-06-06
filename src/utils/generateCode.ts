const generateCode=():string=>{
    const CARACTERES="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let code="";
        for(let i=0;i<6;i++){
            code+=CARACTERES.charAt(Math.floor(Math.random()*CARACTERES.length));
        }
        return code;
}
export default generateCode