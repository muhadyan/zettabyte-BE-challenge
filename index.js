const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
require("dotenv").config({ path: process.cwd() + "/.env" });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
