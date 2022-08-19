const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./typedefs");
const resolvers = require("./resolver");

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startApolloServer();
