import dotenv from 'dotenv';
import { Model } from 'mongoose';
import { UserInterface, RestaurantInterface } from '../global';
import { UserInputError } from 'apollo-server-express';

dotenv.config();

export default class Rest {

    static verifyUser = async (activeUser: string, user: Model<UserInterface>) => {
        const lookup = await user.findOne({owner:activeUser})

        return lookup
    }

    static addCategory = async (restaurant: Model<RestaurantInterface>, restaurantName: string, categoryName: string) => {
        const RestaurantCategory = await restaurant.findOne({
            name: restaurantName,
            "menu": {
                "$elemMatch": {"category_name": {"$in": categoryName}}
            }
        })

        if (RestaurantCategory !== null) {
            throw new UserInputError('Category already exists!')
        }
    }
}