const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');

// The GraphQL schema in string form
const typeDefs = importSchema('server/schema.graphql');

// fake db
const Degrees = [];
const Courses = [];
const Lessons = [];
const Materials = [];

// The resolvers
const resolvers = {
  Query: {
    degrees: () => Degrees,
    degree: (_, { id }) => Degrees.find(degree => degree.id === Number(id)),
    courses: (_, { tag }) => {
      if (!tag) return Courses;
      return Courses.filter(course => course.coursesTag === course);
    },
    course: (_, { id }) => Courses.find(course => course.id === Number(id)),
    lessons: (_, { tag }) => {
      if (!tag) return Lessons;
      return Lessons.filter(lesson => lesson.lessonTag === tag);
    },
    lesson: (_, { id }) => Lessons.find(lesson => lesson.id === Number(id)),
    material: (_, { id }) =>
      Materials.find(material => material.id === Number(id))
  },
  Mutation: {
    createDegree: (_, { name, courseIDs }) => {
      const newDegree = {
        id: Degrees.length,
        name,
        courses: courseIDs.map(id => Courses[id])
      };
      Degrees.push(newDegree);
      return newDegree;
    },
    createCourse: (_, { name, lessonIDs, tag }) => {
      const newCourse = {
        id: Courses.length,
        name,
        courseTag: tag,
        lessons: lessonIDs.map(id => Lessons[id])
      };
      Courses.push(newCourse);
      return newCourse;
    },
    createLesson: (_, { name, materialIDs, tag }) => {
      const newLesson = {
        id: Lessons.length,
        name,
        lessonTag: tag,
        materials: materialIDs.map(id => Materials[id])
      };
      Lessons.push(newLesson);
      return newLesson;
    },
    createMaterial: (_, { type, name, link }) => {
      const newMaterial = {
        id: Materials.length,
        type,
        name,
        link
      };
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
