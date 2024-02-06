const express = require('express');
const { graphqlHTTP } = require('express-graphql'); // Note the destructuring here
const schema = require( './schema/schema' );
// import { schema } from "./schema";

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  // Your GraphQL configuration options go here
}));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});