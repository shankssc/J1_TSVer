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
         Ctx
         } from 'type-graphql';

import User from '../models/user';
import Restaurant from '../models/restaurant';
import Auth from '../utils/Authentication';
import Rest from '../utils/Restaurant';
import { ApolloError, UserInputError } from "apollo-server-express";
import { query } from "express";
import { Context, MenuPayload } from "../global";

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
  item_name!: string;

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

  @Field({ nullable: true })
  item_pic?: string
}

@InputType()
class DeletingItems {
  @Field()
  restaurant_name!: string;

  @Field()
  item_name!: string;

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

    @Mutation(() => RestaurantType)
    async createRestaurant(@Arg('restaurantInput') restaurantInput:RegisteringRestaurants,
                                                  @Ctx() context: Context): Promise<RestaurantType> {
      const {name, phone, address } = restaurantInput;

      // const verifiedUser = await Auth.verifyToken(context,process.env.TOKEN_SECRET);
      
      const verifiedUser = context.user;
      
      if (!verifiedUser) {
        throw new ApolloError('Session expired');
      }

      const presentUser = await User.findOne({uid:verifiedUser.id});

      if (presentUser?.role !== 'BUSINESS_OWNER') {
        throw new ApolloError('Only Business owners can create a restaurant page');
      }

      try {
        const restaurant = new Restaurant({
          name: name,
          phone: phone,
          owner: presentUser.username,
          address: address
        })

        await restaurant.save();

        console.log('New restaurant created successfully');

        return {...restaurant.toObject()};
      }

      catch (err:any) {
        throw new UserInputError('Restaurant creation failed');
        console.log(err);
      }
    }

    @Mutation(() => String)
    async addMenuCategory(@Arg('categoryInput') categoryInput: AddingCategory,
                                                @Ctx() context: Context): Promise<String> {
      
      const {restaurant_name, category_name} = categoryInput;

      const verifiedUser = context.user;

      if (!verifiedUser) {
        throw new ApolloError('Session expired');
      }

      const restaurant = await Restaurant.findOne({name: restaurant_name});

      if (!restaurant) {
        throw new UserInputError('Invalid restaurant name, please try again');
      }

      try {
        await Rest.addCategory(Restaurant,restaurant_name,category_name);

        return 'Category addition sucessful'
      }

      catch (error) {
        console.log('Category addition failed', error);
        throw new ApolloError('Failed to add category');
      }
    }

    @Mutation(() => String)
    async AddMenuSubCategory(@Arg('subCategoryInput') subCategoryInput: AddingSubCategory,
                                                      @Ctx() context: Context): Promise<String> {
      const {restaurant_name, category_name, subcategory_name} = subCategoryInput;
      
      const verifiedUser = context.user;

      if (!verifiedUser) {
        throw new ApolloError('Session expired');
      }

      const restaurant = await Restaurant.findOne({name: restaurant_name});

      if (!restaurant) {
        throw new UserInputError('Invalid restaurant name, please try again');
      }

      try {
        await Rest.addSubCategory(Restaurant, restaurant_name, category_name, subcategory_name);

        return 'Sub-category addition sucessful'
      }

      catch (error) {
        console.log('Sub-category addition failed', error);
        throw new ApolloError('Failed to add subcategory');
      }
    }

    @Mutation(() => Item)
    async addMenuItem(@Arg('menuItemInput') menuItemInput: AddingItems,
                      @Ctx() context: Context): Promise<Item> {
      
      const { restaurant_name, 
              item_name, 
              calories, 
              type, 
              price, 
              category, 
              subcategory,
              item_pic} = menuItemInput;
      
      const verifiedUser = context.user;

      if (!verifiedUser) {
        throw new ApolloError('Session expired');
      }

      const restaurant = await Restaurant.findOne({name: restaurant_name});

      if (!restaurant) {
        throw new UserInputError('Invalid restaurant name, please try again');
      }

      const payload:MenuPayload = {
              restaurant_name, 
              category_name:category, 
              subcategory_name: subcategory, 
              item_name, 
              calories, 
              type, 
              item_pic, 
              price
      }

      try {
        const result = Rest.addMenuItem(Restaurant,payload);

        const addedItem: Item = {
          item_name,
          calories,
          type,
          price,
          _id: result._id,
          uid: result.uid
        }

        return addedItem
      }

      catch (error) {
        console.log('Menu item addition failed', error);
        throw new ApolloError('Failed to add menu item');
      }
      }
}

export {RestResolver};