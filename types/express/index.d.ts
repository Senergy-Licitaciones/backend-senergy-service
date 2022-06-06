import { ObjectId } from "mongoose";
import {Proveedor, User } from "../data";

declare global {
    namespace Express{
    interface Request{
        user?:User,
        proveedor?:Proveedor,
        licitacionId?:ObjectId,
        ofertaId?:ObjectId
    }
}}