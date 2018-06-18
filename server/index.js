const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');

// The GraphQL schema in string form
const typeDefs = importSchema('server/schema.graphql');

const demo = require('./demo.json');
const demo1 = require('./demo1.json');

// fake db
const { Degrees, Courses, Lessons, Materials } = require('./db');

// The resolvers
const resolvers = {
  Query: {
    degrees: () =>
      Degrees.map(degree => {
        const { courses: courseIDs } = degree;
        return {
          ...degree,
          courses: courseIDs.map(id => {
            const course = Courses[id];
            const { lessons: lessonIDs } = course;
            return {
              ...course,
              lessons: lessonIDs.map(id => {
                const lesson = Lessons[id];
                const { materials: materialIDs } = lesson;
                return {
                  ...lesson,
                  materials: materialIDs.map(id => Materials[id])
                };
              })
            };
          })
        };
      }),
    degree: (_, { id }) => {
      const degree = Degrees[Number(id)];
      if (!degree) return null;
      const { courses: courseIDs } = degree;
      return {
        ...degree,
        courses: courseIDs.map(id => {
          const course = Courses[id];
          const { lessons: lessonIDs } = course;
          return {
            ...course,
            lessons: lessonIDs.map(id => {
              const lesson = Lessons[id];
              const { materials: materialIDs } = lesson;
              return {
                ...lesson,
                materials: materialIDs.map(id => Materials[id])
              };
            })
          };
        })
      };
    },
    courses: (_, { tag }) => {
      const CoursesArr = !!tag
        ? Courses.filter(course => course.coursesTag.some(CT => CT === tag))
        : Courses;
      return CoursesArr.map(course => {
        const { lessons: lessonIDs } = course;
        return {
          ...course,
          lessons: lessonIDs.map(id => {
            const lesson = Lessons[id];
            const { materials: materialIDs } = lesson;
            return {
              ...lesson,
              materials: materialIDs.map(id => Materials[id])
            };
          })
        };
      });
    },
    course: (_, { id }) => {
      const course = Courses[Number(id)];
      if (!course) return null;
      const { lessons: lessonIDs } = course;
      return {
        ...course,
        lessons: lessonIDs.map(id => {
          const lesson = Lessons[id];
          const { materials: materialIDs } = lesson;
          return {
            ...lesson,
            materials: materialIDs.map(id => Materials[id])
          };
        })
      };
    },
    lessons: (_, { tag }) => {
      const LessonsArr = !!tag
        ? Lessons.filter(lesson => lesson.lessonTag.some(LT => LT === tag))
        : Lessons;

      return LessonsArr.map(lesson => {
        const { materials: materialIDs } = lesson;
        return {
          ...lesson,
          materials: materialIDs.map(id => Materials[id])
        };
      });
    },
    lesson: (_, { id }) => {
      const lesson = Lessons[Number(id)];
      if (!lesson) return null;
      const { materials: materialIDs } = lesson;
      return {
        ...lesson,
        materials: materialIDs.map(id => Materials[id])
      };
    },
    material: (_, { id }) => Materials[Number(id)]
  },
  Mutation: {
    createDegree: (_, { name, courseIDs }) => {
      const newDegree = {
        id: Degrees.length,
        name,
        courses: courseIDs
      };
      Degrees.push(newDegree);
      return {
        ...newDegree,
        courses: courseIDs.map(id => Courses[id])
      };
    },
    createCourse: (_, { name, lessonIDs, tag }) => {
      const newCourse = {
        id: Courses.length,
        name,
        courseTag: tag,
        lessons: lessonIDs
      };
      Courses.push(newCourse);
      return {
        ...newCourse,
        lessons: lessonIDs.map(id => Lessons[id])
      };
    },
    createLesson: (_, { name, materialIDs, tag }) => {
      const newLesson = {
        id: Lessons.length,
        name,
        lessonTag: tag,
        materials: materialIDs
      };
      Lessons.push(newLesson);
      return {
        ...newLesson,
        materials: materialIDs.map(id => Materials[id])
      };
    },
    createMaterial: (_, { type, name, link, question, choices, answer }) => {
      const newMaterial = {
        id: Materials.length,
        type,
        name,
        link,
        question,
        choices,
        answer
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

app.get('/data', (req, res) => {
  res.send(demo);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
