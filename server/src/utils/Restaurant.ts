import dotenv from 'dotenv';
import { Model } from 'mongoose';
import { UserInterface, RestaurantInterface, MenuPayload } from '../global';
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

        else {
            await restaurant.updateOne(
                {name: restaurantName},
                {"$push": {"menu": {category_name: categoryName}}},

                function (error:any, res:any) {
                    console.log(error)
                }
            )
        }
    }

    static addSubCategory = async (restaurant: Model<RestaurantInterface>, restaurantName: string, categoryName: string, subcategoryName: string) => {
        const RestaurantSubCategory = await restaurant.findOne({name: restaurantName,
            "menu.subcategory": {
                "$elemMatch": {"subcategory_name": {"$in": subcategoryName}}}}
                
        )

        if (RestaurantSubCategory !== null) {
            throw new UserInputError("This subcategory already exists!")

            return 'FAILURE'
        }

        else {
            await restaurant.updateOne(
                {name: restaurantName,
                 "menu.category_name": categoryName
                },
                {
                    "$push": {
                        "menu.$.subcategory": {subcategory_name: subcategoryName}
                    }
                },

                function (error:any, res:any) {
                    console.log(error)
                }
            )
        }
    }

    static addMenuItem = async (restaurant: Model<RestaurantInterface>,payload:MenuPayload) => {
        const {restaurant_name, 
               category_name, 
               subcategory_name, 
               item_name, 
               calories, 
               type, 
               item_pic, 
               price} = payload;

        const duplicateItem = await restaurant.findOne(
            {name: restaurant_name,
            "menu.category_name": category_name,
            "menu.subcategory.subcategory_name": subcategory_name,
            "menu.subcategory.item": {
                "$elemMatch": {"item_name": {"$in": item_name}}}}      
        )

        if (duplicateItem !== null) {
            throw new UserInputError("This item was already added for this subcategory");
        }

        else {
            return restaurant.updateOne({
                name: restaurant_name
              },
              {
                "$push": {
                  "menu.$[outer].subcategory.$[inner].item": {
                    "item_name": item_name,
                    "calories": calories,
                    "type": type,
                    "price": price
                  },
                  
                }
              },
              {
                "arrayFilters": [
                  {
                    "outer.category_name": category_name
                  },
                  {
                    "inner.subcategory_name": subcategory_name
                  }
                ]
              })
        }
    }
}