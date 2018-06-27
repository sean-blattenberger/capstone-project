const express = require('express');
const cors = require('cors')
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();
app.use(cors())

//connect mLab database
mongoose.connect("mongodb://blatt:menusort123@ds219181.mlab.com:19181/menu-sort")
mongoose.connection.once("open", () => {
  console.log('connected to database');
})
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
