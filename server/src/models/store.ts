import mongoose, {Schema} from "mongoose";
import uuid from 'node-uuid';
import { StoreInterface } from "global";


const storeSchema:Schema<StoreInterface> = new mongoose.Schema<StoreInterface>({
    uid: {type: String, default:uuid.v4,required: true, unique: true},
    id: {type: String, unique: true},
    name: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    cover: {type: String},
    address: {type: String, required: true},
    catalog: [{
        uid: {type: String, default:uuid.v4, unique: true},
        category_name: {type: String},
        item: [{
            uid: {type: String, default:uuid.v4, unique:true},
            item_name: {type: String, unique: true},
            description: {type: String, unique: true},
            unit: {type: String, unique: true},
            item_pic: {type: String},
            price: {type: String},
        }]
    }]
})

export default mongoose.model<StoreInterface>("Store",storeSchema);