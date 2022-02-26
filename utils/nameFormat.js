const formatFileLicitacion=(array)=>{
    const filenamesArray=array.map((el)=>el.filename);
    return filenamesArray;
}
module.exports={formatFileLicitacion}