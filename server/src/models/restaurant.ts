import mongoose, {Document, Schema} from "mongoose";
import uuid from 'node-uuid';
import { RestaurantInterface } from "../global";



const restaurantSchema:Schema<RestaurantInterface> = new mongoose.Schema<RestaurantInterface>({
    uid: {type: String, default:uuid.v4,required: true, unique: true},
    id: {type: String, unique: true},
    name: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    cover: {type: String},
    address: {type: String, required: true},
    menu: [{
        uid: {type: String, default:uuid.v4, unique: true},
        id: {type: String, unique: true},
        category_name: {type: String},
        subcategory: [{
            uid: {type: String, default:uuid.v4},
            id: {type: String, unique: true},
            subcategory_name: {type: String, unique: true},
            item: [{
                uid: {type: String, default:uuid.v4, unique:true},
                item_name: {type: String, unique: true},
                calories: {type: String},
                type: {type: String, enum: ['VEGAN', 'VEG', 'NON_VEG']},
                item_pic: {type: String},
                price: {type: String},
            }]
        }]
    }]
},
    {timestamps: true}
)

export default mongoose.model<RestaurantInterface>("Restaurant",restaurantSchema)