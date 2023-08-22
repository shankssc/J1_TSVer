import dotenv from 'dotenv';
import { Model } from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { UserInterface, 
         StoreInterface, 
         StoreMenuInterface,
         CatlogPayload,
         DeleteCatlogItemPayload } from 'global';

dotenv.config();

export default class Str {
    static addCategory = async (store: Model<StoreInterface>, storeName: string, categoryName: string) => {
        const StoreCategory = await store.findOne({
            name: storeName,
            "catalog": {
                "$elemMatch": {"category_name": {"$in": categoryName}}
            }
        })

        if (StoreCategory !== null) {
            throw new UserInputError('Category already exists!')
        }

        else {
            await store.updateOne(
                {name: storeName},
                {"$push": {"menu": {category_name: categoryName}}},

                function (error:any, res:any) {
                    console.log(error)
                }
            )
        }
    }

    static addCatlogItem = async (store: Model<StoreInterface>, payload: CatlogPayload) => {
        const {
            store_name,
            category_name,
            item_name,
            description,
            unit,
            price,
            } = payload;

        const duplicateItem = await store.findOne(
            {
                name: store_name,
                "catalog.category_name": category_name,
                "catalog.item": {
                    "$elemMatch": {"item_name": {"$in": item_name}}
                }
            }
        )

        if (duplicateItem !== null) {
            throw new UserInputError("This item already exists for this category");
        }

        else {
            store.updateOne({
                name: store_name,
            },
            {
                "$push": {
                    "catalog.$[outer].item": {
                        "item_name": item_name,
                        "description": description,
                        "unit": unit,
                        "price": price
                    },
                }
            },
            {
                "arrayFilters": [
                    {
                        "outer.category_name": category_name
                    }
                ]
            }
            )
        }
    }

    static delCatlogItem = async (store: Model<StoreInterface>, payload:DeleteCatlogItemPayload) => {
        const {
            store_name,
            item_name,
            category_name
        } = payload;

        const ItemCheck = await store.findOne({
            name: store_name,
            "catalog.category_name": category_name,
            "catalog.item": {
                "$elemMatch": {"item_name": item_name}
            }
        })

        if (ItemCheck == null) {
            throw new UserInputError("This item doesn't exist!")
        }

        else {
            return await store.findByIdAndUpdate(
                {name: store_name},
                {
                    "$pull": {
                        "catalog.$[outer].item": {
                            "item_name": item_name
                        },
                    }
                },

                {
                    "arrayFilters": [
                        {
                            "outer.category_name": category_name
                        }
                    ]
                }
            )
        }
    }
}