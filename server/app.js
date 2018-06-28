const express = require('express');
const cors = require('cors')
require('dotenv').config()
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();
app.use(cors())


//connect mLab database
mongoose.connect(process.env.DB_URL)
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
