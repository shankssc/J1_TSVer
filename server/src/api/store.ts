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
         Ctx,
         } from 'type-graphql';
import User from '../models/user';
import Store from '../models/store';
import Str from "../utils/Store";
import { ApolloError, UserInputError } from "apollo-server-express";
import { Context, StoreMenuInterface, storeItemInterface } from "global";

// Declaring the store type
@ObjectType()
class StoreType {
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

// Declaring menu type
@ObjectType()
class Item {
  @Field()
  item_name!: string;

  @Field()
  description!: string;

  @Field()
  unit!: string;

  @Field({ nullable: true })
  item_pic?: string;

  @Field()
  price!: string;

  @Field()
  uid!: string;
}

@ObjectType()
class StoreCatalog{
    @Field({ nullable: true })
    store_name?: string;

    @Field({ nullable: true })
    category_name?: string;

    @Field(() => [Item], { nullable: true })
    Items?: Item[];
}

@InputType()
class RegisteringStores {
    @Field()
    name!: string;

    @Field()
    phone!: string;

    @Field()
    address!: string;
}

@InputType()
class AddProdCategory {
    @Field()
    store_name!: string;

    @Field()
    category_name!: string;
}

@InputType()
class AddingItems {
  @Field()
  store_name!: string;

  @Field()
  item_name!: string;

  @Field()
  description!: string;

  @Field()
  price!: string;

  @Field()
  category!: string;

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
}

@InputType()
class ItemInp {
  @Field()
  store_name!: string;

  @Field()
  category_name!: string;
}

// Store Resolvers
class RestResolver {
    @Query(() => [StoreType])
    async getRestaurants(): Promise<StoreType[]> {
        const stores = await Store.find();
        
        return stores.map(Store =>Store.toObject());
    }

    @Query(() => StoreType)
    async getRestaurant(@Arg('id') id: string): Promise<StoreType | null> {
        const restaurant = await Store.findById(id);

        return restaurant ? restaurant.toObject() : null;
    }

    @Query(() => [Item])
    async getItems(@Arg('inp') inp: ItemInp): Promise<Item[]> {
        const {store_name,category_name} = inp;
        const MenuItems = await Store.aggregate([
            {$unwind: "$catalog"},
            {$unwind: "$catalog.item"},

            {
                $match: {
                    $and: [
                      {"catalog.category_name": category_name},
                      {name: store_name}
                    ]
                  }
              },
              {
                $replaceRoot: {
                  newRoot: "$catalog.item"
                }
              }
        ])

        return MenuItems.map(item =>item.toObject());
    }

    @Mutation(() => StoreType)
    async createStore(@Arg('storeInput') storeInput:RegisteringStores,
                                                  @Ctx() context: Context): Promise<StoreType> {
      const {name, phone, address } = storeInput;

      // const verifiedUser = await Auth.verifyToken(context,process.env.TOKEN_SECRET);
      
      const verifiedUser = context.user;
      
      if (!verifiedUser) {
        throw new ApolloError('Session expired');
      }

      const presentUser = await User.findOne({uid:verifiedUser.id});

      if (presentUser?.role !== 'BUSINESS_OWNER') {
        throw new ApolloError('Only Business owners can create a store page');
      }

      console.log(presentUser);

      try {
        const store = new Store({
          name: name,
          phone: phone,
          owner: presentUser._id,
          address: address
        })

        await store.save();

        console.log('New store created successfully');

        return {...store.toObject()};
      }

      catch (err:any) {
        console.log(err);
        throw new UserInputError('Store creation failed');
      }
    }

    @Mutation(() => String)
    async addCatlogCategory(@Arg('categoryInput') categoryInput: AddProdCategory,
                                                @Ctx() context: Context): Promise<String> {
      
      const {store_name, category_name} = categoryInput;

      const verifiedUser = context.user;

      if (!verifiedUser) {
        throw new ApolloError('Session expired');
      }

      const store = await Store.findOne({name: store_name});

      if (!store) {
        throw new UserInputError('Invalid restaurant name, please try again');
      }

      try {
        await Str.addCategory(Store, store_name, category_name);

        return 'Category addition sucessful'
      }

      catch (error) {
        console.log('Category addition failed', error);
        throw new ApolloError('Failed to add category');
      }
    }

}