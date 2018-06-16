const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');

// The GraphQL schema in string form
const typeDefs = importSchema('server/schema.graphql');

// fake db
const Lessons = [];
const Materials = [];

// The resolvers
const resolvers = {
  Query: {
    lessons: (_, { tag }) => {
      if (!tag) return Lessons;
      return Lessons.filter(lesson => lesson.lessonTag === tag);
    },
    lesson: (_, { id }) => Lessons.find(lesson => lesson.id === id),
    material: (_, { id }) =>
      Materials.find(material => material.id === Number(id))
  },
  Mutation: {
    createMaterial: (_, { type, name, link }) => {
      const newMaterial = {
        id: Materials.length,
        type,
        name,
        link
      };
      console.log(newMaterial);
      Materials.push(newMaterial);
      return newMaterial;
    }
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
