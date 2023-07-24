import mongoose, {Document, Schema} from "mongoose";
import uuid from 'node-uuid';
import { UserInterface } from "../global";

const userSchema:Schema<UserInterface> = new mongoose.Schema<UserInterface>({
    uid: {type: String, default:uuid.v4,required: true},
    id: {type: String},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["CUSTOMER", "BUSINESS_OWNER", "CARRIER", "ADMINISTRATOR"], required: true},
    token: {type: String, unique: true}
},
{timestamps: true})

export default mongoose.model<UserInterface>("User",userSchema)