import mongoose from "mongoose";
import { FieldsAdd } from "../../types/form";
const brgSchema=new mongoose.Schema<FieldsAdd>({
    name:{
        type:String,
        required:true,
        trim:true
    }
},{
    versionKey:false,
    timestamps:true
});
export default mongoose.model<FieldsAdd>("BrgModel",brgSchema);