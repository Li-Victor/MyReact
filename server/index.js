const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');

// The GraphQL schema in string form
const typeDefs = importSchema('server/schema.graphql');

// The resolvers
const resolvers = {
  Query: {
    text: () => 'Hello World'
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.use(express.static(path.join(__dirname, '../client')));

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
