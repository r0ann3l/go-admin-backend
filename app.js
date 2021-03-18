var express = require("express");
var logger = require("morgan");

const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");

const QueryRoot = new graphql.GraphQLObjectType({
  name: "Query",
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!"
    }
  })
});

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

var app = express();

app.use(logger("dev"));

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

var listener = app.listen(4000, function () {
  console.log("Listening on port " + listener.address().port);
});
