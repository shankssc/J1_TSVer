import { gql } from 'apollo-server-express'

const Restaurant = gql`

    enum Item_type {
        VEGAN
        VEG
        NON_VEG
    }

    type Restaurant {
        uid: String!
        _id: ID!
        name: String!
        phone: String!
        owner: String!
        cover: String
        address: String!
    }

    type Item {
        item_name: String!
        calories: String!
        type: String!
        item_pic: String
        price: String!
        _id: ID!
        uid: String!
    }

    type Restaurant_Menu {
        restaurant_name: String
        category_name: String,
        subcategory_name: String,
        Items: [Item]
    }

    input RegisteringRestaurants {
        name: String!
        phone: String!
        address: String!
    }

    input AddingCategory {
        restaurant_name: String!
        category_name: String!
    }

    input AddingSubCategory {
        restaurant_name: String!
        category_name: String!
        subcategory_name: String!
    }

    input AddingItems {
        restaurant_name: String!
        name: String!
        calories: String!
        type: Item_type!
        price: String!
        category: String!
        subcategory: String!
    }

    input DeletingItems {
        restaurant_name: String!
        name: String!
        category: String!
        subcategory: String!
    }

    input ItemInp {
        restaurant_name: String!
        category_name: String!
        subcategory_name: String!
    }

    type Query {
        getRestaurant(rest_id: ID!): Restaurant
        getRestaurants: [Restaurant]
        getItems(inp: ItemInp) : [Item]
    }
    
    type Mutation {
        createRestaurant(restaurantInput: RegisteringRestaurants): Restaurant

        addMenuCategory(categoryInput: AddingCategory): Restaurant

        addMenuSubCategory(subcategoryInput: AddingSubCategory): Restaurant

        addMenuItems(menuItemInput: AddingItems): Restaurant

        deleteMenuItems(dmenuItemInput: DeletingItems): Restaurant
    }
`
export default Restaurant