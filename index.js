const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");
const app = express();

var message = "hello there...";

const schema = buildSchema(`

    type Mutation{
        setmessage(newMessage:String):String
    }

    type Post{
        userId:Int,
        id:Int,
        title:String,
        body:String
    }

    type User{
        name:String,
        age:Int,
        college:String
    }

    type Query{
        hello: String,
        welcome(name: String):String,
        getuser:User,
        getuserlist:[User],
        getpost:[Post]
    }
`);

const root = {
  hello: () => {
    return "Hello world";
  },
  welcome: (args) => {
    console.log(args);
    return `Welcome ${args.name}`;
  },
  getuser: () => {
    const user = {
      name: "rohan",
      age: 25,
      college: "Modern college",
    };
    return user;
  },
  getuserlist: () => {
    const users = [
      {
        name: "rohan",
        age: 25,
        college: "Modern college",
      },
      {
        name: "sid",
        age: 23,
        college: "MIT college",
      },
    ];
    return users;
  },
  getpost: async () => {
    const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return posts.data;
  },
  setmessage: ({ newMessage }) => {
    message = newMessage;
    return message;
  },
};

//graphql endpoint
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
