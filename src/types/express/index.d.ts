import { ObjectId } from "mongoose";
import {Proveedor, User } from "../data";

declare global {
    namespace Express{
    interface Request{
        user?:Document<any, any, User> & User & {
            _id: Types.ObjectId;
        },
        proveedor?:Document<any, any, Proveedor> & Proveedor & {
            _id: Types.ObjectId;
        },
        licitacionId?:Types.ObjectId,
        ofertaId?:Types.ObjectId
    }
}}