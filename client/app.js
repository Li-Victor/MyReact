(() => {
  $.getJSON('demo.json', data => {
    const { name: degreeName, courses } = data;
    const header = MyReact.createElement('h1', null, degreeName);

    const courseBody = [];
    courses.forEach(({ name, lessons }) => {
      const courseHeader = MyReact.createElement('h2', null, `Course: ${name}`);

      const lessonBody = [];
      lessons.forEach(({ name, materials }) => {
        const lessonHeader = MyReact.createElement('summary', null, name);

        const materialsBody = [];
        materials.forEach(({ name, link }) => {
          const i = MyReact.createElement('p', null, `${name} ${link}`);
          materialsBody.push(i);
        });

        const lessonDetail = MyReact.createElement(
          'details',
          null,
          lessonHeader,
          ...materialsBody
        );
        lessonBody.push(lessonDetail);
      });

      const lessonList = MyReact.createElement('div', null, ...lessonBody);

      const courseContent = MyReact.createElement(
        'div',
        null,
        courseHeader,
        lessonList
      );

      courseBody.push(courseContent);
    });

    const parent = MyReact.createElement('div', null, header, ...courseBody);
    MyReact.render(parent, document.getElementById('root'));
  });
})();
