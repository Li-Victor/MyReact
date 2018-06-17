(() => {
  // Components
  const CourseHeader = ({ name }) =>
    MyReact.createElement('h2', null, `Course: ${name}`);

  const LessonHeader = ({ name }) =>
    MyReact.createElement('summary', null, name);

  const WebLink = ({ name, link }) => {
    return MyReact.createElement(
      'div',
      null,
      MyReact.createElement('a', { href: link, target: '_blank' }, name)
    );
  };

  const Video = ({ name, link }) => {
    const youtubeID = link.replace('https://www.youtube.com/watch?v=', '');
    return MyReact.createElement(
      'div',
      null,
      MyReact.createElement('div', null, name),
      MyReact.createElement(
        'iframe',
        {
          id: 'ytplayer',
          type: 'text/html',
          width: '640',
          height: '360',
          src: `https://www.youtube.com/embed/${youtubeID}`
        },
        null
      )
    );
  };

  const Material = ({ name, type, link }) => {
    if (type === 'Video') {
      return MyReact.createElement(Video, { name, link }, null);
    } else if (type === 'Website') {
      return MyReact.createElement(WebLink, { name, link }, null);
    } else {
      // MCQ
      return MyReact.createElement('p', null, `${name} ${type} ${link}`);
    }
  };

  $.getJSON('demo.json', data => {
    const { name: degreeName, courses } = data;

    const courseContent = courses.map(({ name, lessons }) => {
      return MyReact.createElement(
        'div',
        null,
        MyReact.createElement(CourseHeader, { name }, null),
        MyReact.createElement(
          'div',
          null,
          lessons.map(({ name, materials }) => {
            return MyReact.createElement(
              'details',
              null,
              MyReact.createElement(LessonHeader, { name }, null),
              materials.map(({ name, type, link }) =>
                MyReact.createElement(Material, { name, type, link }, null)
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
