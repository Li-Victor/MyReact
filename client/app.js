(() => {
  const courseHeader = ({ name }) =>
    MyReact.createElement('h2', null, `Course: ${name}`);

  const lessonHeader = ({ name }) =>
    MyReact.createElement('summary', null, name);

  const Material = ({ name, link }) =>
    MyReact.createElement('p', null, `${name} ${link}`);

  $.getJSON('demo.json', data => {
    const { name: degreeName, courses } = data;

    const courseContent = courses.map(({ name, lessons }) => {
      return MyReact.createElement(
        'div',
        null,
        MyReact.createElement(courseHeader, { name }, null),
        MyReact.createElement(
          'div',
          null,
          lessons.map(({ name, materials }) => {
            return MyReact.createElement(
              'details',
              null,
              MyReact.createElement(lessonHeader, { name }, null),
              materials.map(({ name, link }) =>
                MyReact.createElement(Material, { name, link }, null)
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
      courseContent
    );
    MyReact.render(App, document.getElementById('root'));
  });
})();
