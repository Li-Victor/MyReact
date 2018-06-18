// Components
const { CourseHeader, LessonHeader, Material } = components();

fetch('/data')
  .then(response => response.json())
  .then(data => {
    const { name: degreeName, courses } = data;

    const Content = courses.map(({ name, lessons }) => {
      return MyReact.createElement(
        'div',
        null,
        MyReact.createElement(CourseHeader, { name }),
        MyReact.createElement(
          'div',
          null,
          lessons.map(({ name, materials }) => {
            return MyReact.createElement(
              'details',
              null,
              MyReact.createElement(LessonHeader, { name }),
              materials.map(({ name, type, link, question, choices, answer }) =>
                MyReact.createElement(Material, {
                  name,
                  type,
                  link,
                  question,
                  choices,
                  answer
                })
              )
            );
          })
        )
      );
    });

    const App = MyReact.createElement(
      'div',
      null,
      MyReact.createElement('h1', null, degreeName),
      Content
    );
    MyReact.render(App, document.getElementById('root'));
  });
