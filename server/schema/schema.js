const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');

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
        // return _.find(restaurants, { id: args.id });
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
    updateVotes: {
      type: MenuType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        votes: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return Menu.findOneAndUpdate({_id: args.id}, { $set: {votes: args.votes}}).then(() => {
          return Menu.findOne({_id: args.id})
        })
        // return Menu.findById(args.id);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
