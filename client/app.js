(() => {
  $.getJSON('demo.json', data => {
    const { name: degreeName, courses } = data;
    const header = MyReact.createElement('h1', null, degreeName);

    const courseContent = courses.map(({ name, lessons }) => {
      const courseHeader = MyReact.createElement('h2', null, `Course: ${name}`);

      const lessonContent = lessons.map(({ name, materials }) => {
        const lessonHeader = MyReact.createElement('summary', null, name);

        const materialContent = materials.map(({ name, link }) => {
          return MyReact.createElement('p', null, `${name} ${link}`);
        });

        return MyReact.createElement(
          'details',
          null,
          lessonHeader,
          ...materialContent
        );
      });

      const lessonList = MyReact.createElement('div', null, ...lessonContent);
      return MyReact.createElement('div', null, courseHeader, lessonList);
    });

    const parent = MyReact.createElement('div', null, header, ...courseContent);
    MyReact.render(parent, document.getElementById('root'));
  });
})();
