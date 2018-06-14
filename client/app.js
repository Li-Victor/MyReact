(() => {
  const courseHeader = ({ name }) =>
    MyReact.createElement('h2', null, `Course: ${name}`);

  const lessonHeader = ({ name }) =>
    MyReact.createElement('summary', null, name);

  const Material = ({ name, link }) =>
    MyReact.createElement('p', null, `${name} ${link}`);

  function createMaterialContent({ name, link }) {
    return MyReact.createElement(Material, { name, link }, null);
  }

  $.getJSON('demo.json', data => {
    const { name: degreeName, courses } = data;

    const courseContent = courses.map(({ name, lessons }) => {
      const lessonContent = lessons.map(({ name, materials }) => {
        const materialContent = materials.map(createMaterialContent);

        return MyReact.createElement(
          'details',
          null,
          MyReact.createElement(lessonHeader, { name }, null),
          ...materialContent
        );
      });

      const lessonList = MyReact.createElement('div', null, ...lessonContent);
      return MyReact.createElement(
        'div',
        null,
        MyReact.createElement(courseHeader, { name }, null),
        lessonList
      );
    });

    const parent = MyReact.createElement(
      'div',
      null,
      MyReact.createElement('h1', null, degreeName),
      ...courseContent
    );
    MyReact.render(parent, document.getElementById('root'));
  });
})();
