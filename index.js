const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const schema = buildSchema(`
    type Query{
        hello: String,
        welcome:String
    }
`);

const root = {
  hello: () => {
    return "Hello world";
  },
  welcome:()=>{
    return "Welcome"
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(4000, () => {
  console.log("server running on port 4000");
});
