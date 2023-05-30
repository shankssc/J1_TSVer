import {Document} from 'mongoose';

interface UserInterface extends Document {
    uid: string;
    id?: string;
    username: string;
    email: string;
    password: string;
    role: 'CUSTOMER' | 'BUSINESS_OWNER' | 'CARRIER' | 'ADMINISTRATOR';
    token?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface RestaurantInterface extends Document {
    uid: string;
    id?: string;
    name: string;
    phone: string;
    owner: mongoose.Schema.Types.ObjectId;
    cover?: string;
    address: string;
    menu: MenuInterface[];
    createdAt: Date;
    updatedAt: Date;
}

interface MenuInterface {
    uid: string;
    id?: string;
    category_name?: string;
    subcategory: SubcategoryInterface[];
}
  
interface SubcategoryInterface {
    uid: string;
    id?: string;
    subcategory_name?: string;
    item: ItemInterface[];
}
  
interface ItemInterface {
    uid: string;
    item_name?: string;
    calories?: string;
    type?: 'VEGAN' | 'VEG' | 'NON_VEG';
    item_pic?: string;
    price?: string;
}

interface AddUser {
    username: string;
    email: string;
    password: string;
    role: 'CUSTOMER' | 'BUSINESS_OWNER' | 'CARRIER' | 'ADMINISTRATOR';
}