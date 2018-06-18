// Components
const { CourseHeader, LessonHeader, Material } = components();

function renderData(data) {
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
}

// fetch('/data')
//   .then(response => response.json())
//   .then(renderData);

fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `{
      degree(id: 0) {
        name
        courses {
          name
          lessons {
            name
            materials {
              name
              type
              link
              question
              choices
              answer
            }
          }
        }
      }
    }`
  })
})
  .then(res => res.json())
  .then(({ data }) => {
    renderData(data.degree);
  });
