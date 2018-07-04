const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');
const User = require('../models/user');

const MenuType = new GraphQLObjectType({
  name: 'Menu',
  fields: () => ({
    id: { type: GraphQLID },
    food: { type: GraphQLString },
    type: { type: GraphQLString },
    desc: { type: GraphQLString },
    votes: { type: GraphQLInt },
    restaurant: {
      type: RestaurantType,
      resolve(parent, args) {
        return Restaurant.findById(parent.restaurantId)
      }
    }
  })
});
const MenuInputType = new GraphQLInputObjectType({
  name: 'MenuInput',
  fields: () => ({
    id: { type: GraphQLID },
    food: { type: GraphQLString },
    type: { type: GraphQLString },
    desc: { type: GraphQLString },
    votes: { type: GraphQLInt },
    restaurant: {
      type: RestaurantInputType
    }
  })
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    location: { type: GraphQLString },
    menuItems: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
        return Menu.find({restaurantId: parent.id})
      }
    }
  })
});

const RestaurantInputType = new GraphQLInputObjectType({
  name: 'RestaurantInput',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    location: { type: GraphQLString },
    menuItems: {
      type: new GraphQLList(MenuInputType)
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    img: { type: GraphQLString },
    favorites: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
        return Menu.find({restaurantId: parent.id})
      }
    },
    votes: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
        return Menu.find({restaurantId: parent.id})
      }
    }
  })
});



const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    menu: {
      type: MenuType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Menu.findById(args.id);
      }
    },
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Restaurant.findById(args.id);
      }
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return Restaurant.find({})
      }
    },
    menuItems: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
        return Menu.find({})
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({})
      }
    },
    user: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findOne({email: args.email});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMenuItem: {
      type: MenuType,
      args: {
        food: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        desc: { type: new GraphQLNonNull(GraphQLString) },
        votes: { type: new GraphQLNonNull(GraphQLInt) },
        restaurantId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let menu = new Menu({
          food: args.food,
          type: args.type,
          desc: args.desc,
          votes: args.votes,
          restaurantId: args.restaurantId
        });
        return menu.save();
      }
    },
    addRestaurant: {
      type: RestaurantType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let restaurant = new Restaurant({
          name: args.name,
          category: args.category,
          location: args.location
        })
        return restaurant.save();
      }
    },
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        img: { type: GraphQLString },
        favorites: {
          type: new GraphQLList(MenuInputType)
        },
        votes: {
          type: new GraphQLList(MenuInputType)
        }
      },
      resolve(parent, args) {
        return User.findOne({email: args.email}).then(user => {
          if(!user) return User.create(args);
        })
      }
    },
    updateVotes: {
      type: MenuType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        votes: { type: new GraphQLNonNull(GraphQLInt) },
        userId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return User.find( { votes: { $all: [ args.id ] } } ).then(user => {
          if(user.length < 1) {
            return Menu.findOneAndUpdate({_id: args.id}, { $set: {votes: args.votes}}).then((d) => {
              return User.update({ _id: args.userId}, { $push: { votes: args.id } }).then(() => {
                return Menu.findById(args.id)
              })
            })
          }
          return {error: "Already voted on this item"}
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
