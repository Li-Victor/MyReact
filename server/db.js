const Degrees = [
  {
    id: 0,
    name: 'React',
    courses: [0, 1, 2]
  },
  {
    id: 1,
    name: 'Angular',
    courses: [0, 1, 3]
  }
];
const Courses = [
  {
    id: 0,
    courseTag: ['Javascript', 'Beginner'],
    name: 'Javascript for Beginners',
    lessons: [0, 1, 2, 3]
  },
  {
    id: 1,
    courseTag: ['Javascript', 'Advanced'],
    name: 'Advanced Javascript',
    lessons: [4, 5]
  },
  {
    id: 2,
    courseTag: ['React', 'Beginner'],
    name: 'React 101',
    lessons: [6]
  },
  {
    id: 3,
    courseTag: ['Angular', 'Beginner'],
    name: 'Angular 101',
    lessons: []
  }
];
const Lessons = [
  {
    id: 0,
    lessonTag: ['Variables', 'Types'],
    name: 'Introduction to Javascript',
    materials: [0]
  },
  {
    id: 1,
    lessonTag: ['Control Flow'],
    name: 'Learn Javascript: Control Flow',
    materials: [1]
  },
  {
    id: 2,
    lessonTag: ['Functions'],
    name: 'Learn Javascript: Functions',
    materials: [2]
  },
  {
    id: 3,
    lessonTag: ['Scope'],
    name: 'Learn Javascript: Scope',
    materials: [3]
  },
  {
    id: 4,
    lessonTag: ['Advanced', 'Scope'],
    name: 'Scope',
    materials: [3, 4]
  },
  {
    id: 5,
    lessonTag: ['Advanced', 'Hoisting'],
    name: 'Hoisting',
    materials: [5]
  },
  {
    id: 6,
    lessonTag: ['JSX'],
    name: 'JSX',
    materials: [6]
  }
];
const Materials = [
  {
    id: 0,
    type: 'Video',
    name: 'Variables',
    link: 'https://www.youtube.com/watch?v=UAZRq7Ev5No'
  },
  {
    id: 1,
    type: 'Video',
    name: 'Learn Javascript: Control Flow',
    link: 'https://www.youtube.com/watch?v=4eqJNLl-03U'
  },
  {
    id: 2,
    type: 'Video',
    name: 'Learn Javascript: Functions',
    link: 'https://www.youtube.com/watch?v=uiv3oLsHbaI'
  },
  {
    id: 3,
    type: 'Video',
    name: 'Learn Javascript: Scope',
    link: 'https://www.youtube.com/watch?v=XR84vFUs4M4'
  },
  {
    id: 4,
    type: 'Website',
    name: 'What is Scope?',
    link:
      'https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch1.md'
  },
  {
    id: 5,
    type: 'Website',
    name: 'Hoisting',
    link:
      'https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch4.md'
  },
  {
    id: 6,
    type: 'MCQ',
    name: 'What is JSX?',
    question: 'What is JSX?',
    choices: ['Javascript XML', 'Javascript Syntax eXtension'],
    answer: 0
  }
];

module.exports = {
  Degrees,
  Courses,
  Lessons,
  Materials
};
