import "reflect-metadata";
import { ObjectType, 
         Field, 
         InputType, 
         registerEnumType, 
         Query, 
         Resolver,
         Mutation, 
         Arg,
         Authorized,
         AuthChecker,
         } from 'type-graphql';

import User from '../models/user';
import Restaurant from '../models/restaurant';
import Auth from '../utils/Authentication';
import { ApolloError } from "apollo-server-express";
import { query } from "express";

// Enum definition
enum Item_type {
    VG= 'VEGAN',
    V= 'VEG',
    NV = 'NON_VEG'
}

// Registering the enum type
registerEnumType(Item_type, {
    name: 'Item_type'
});

// Declaring Restaurant type
@ObjectType()
class RestaurantType {
    @Field()
    uid!: string;

    @Field()
    _id!: string;

    @Field({ nullable: true })
    name?: string;

    @Field()
    phone!: string;

    @Field()
    owner!: string;

    @Field()
    cover!: string;

    @Field()
    address!: string;

}

// Declaring meny type
@ObjectType()
class Item {
  @Field()
  item_name!: string;

  @Field()
  calories!: string;

  @Field()
  type!: string;

  @Field({ nullable: true })
  item_pic?: string;

  @Field()
  price!: string;

  @Field()
  _id!: string;

  @Field()
  uid!: string;
}

@ObjectType()
class RestaurantMenu {
  @Field({ nullable: true })
  restaurant_name?: string;

  @Field({ nullable: true })
  category_name?: string;

  @Field({ nullable: true })
  subcategory_name?: string;

  @Field(() => [Item], { nullable: true })
  Items?: Item[];
}

@InputType()
class RegisteringRestaurants {
  @Field()
  name!: string;

  @Field()
  phone!: string;

  @Field()
  address!: string;
}

@InputType()
class AddingCategory {
  @Field()
  restaurant_name!: string;

  @Field()
  category_name!: string;
}

@InputType()
class AddingSubCategory {
  @Field()
  restaurant_name!: string;

  @Field()
  category_name!: string;

  @Field()
  subcategory_name!: string;
}

@InputType()
class AddingItems {
  @Field()
  restaurant_name!: string;

  @Field()
  name!: string;

  @Field()
  calories!: string;

  @Field(() => Item_type, {nullable: true})
  type?: Item_type;

  @Field()
  price!: string;

  @Field()
  category!: string;

  @Field()
  subcategory!: string;
}

@InputType()
class DeletingItems {
  @Field()
  restaurant_name!: string;

  @Field()
  name!: string;

  @Field()
  category!: string;

  @Field()
  subcategory!: string;
}

@InputType()
class ItemInp {
  @Field()
  restaurant_name!: string;

  @Field()
  category_name!: string;

  @Field()
  subcategory_name!: string;
}

// Restaurant Resolvers
class RestResolver {
    @Query(() => [RestaurantType])
    async getRestaurants(): Promise<RestaurantType[]> {
        const restaurants = await Restaurant.find();
        
        return restaurants.map(restaurant =>restaurant.toObject());
    }

    @Query(() => RestaurantType)
    async getRestaurant(@Arg('id') id: string): Promise<RestaurantType | null> {
        const restaurant = await Restaurant.findById(id);

        return restaurant ? restaurant.toObject() : null;
    }

    @Query(() => ItemInp)
    async getItems(@Arg('inp') inp: ItemInp): Promise<ItemInp[]> {
        const {restaurant_name,category_name,subcategory_name} = inp;
        const MenuItems = await Restaurant.aggregate([
            {$unwind: "$menu"},
            {$unwind: "$menu.subcategory"},
            {$unwind: "$menu.subcategory.item"},

            {
                $match: {
                    $and: [
                      {"menu.category_name": category_name},
                      {"menu.subcategory.subcategory_name": subcategory_name},
                      {name: restaurant_name}
                    ]
                  }
              },
              {
                $replaceRoot: {
                  newRoot: "$menu.subcategory.item"
                }
              }
        ])

        return MenuItems.map(item =>item.toObject());
    }
}

export {RestResolver};