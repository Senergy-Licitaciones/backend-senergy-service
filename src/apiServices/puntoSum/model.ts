import mongoose from "mongoose";
import { FieldsAdd } from "../../types/form";
const puntoSumSchema=new mongoose.Schema<FieldsAdd>({
    name:{
        type:String,
        required:true,
        trim:true
    }
},{
    versionKey:false,
    timestamps:true
});
export default mongoose.model<FieldsAdd>("PuntoSumModel",puntoSumSchema);