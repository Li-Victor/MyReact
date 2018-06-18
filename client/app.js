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

  class MCQ extends MyReact.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        message: ''
      };
    }

    display() {
      const Choices = this.props.choices.map(choice => {
        const inputProps = {
          type: 'radio',
          id: choice,
          value: choice,
          name: choice,
          onChange: this.handleChange
        };

        if (choice === this.state.value) inputProps.checked = true;
        return MyReact.createElement(
          'div',
          null,
          MyReact.createElement('input', inputProps, null),
          MyReact.createElement(
            'label',
            {
              for: choice
            },
            choice
          )
        );
      });

      const inputButtonProps = {
        type: 'submit',
        value: 'Answer'
      };

      if (!this.state.answered) inputButtonProps.disabled = true;

      const Message = (message => {
        if (message === '') return null;
        return MyReact.createElement('div', null, message);
      })(this.state.message);

      return MyReact.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        MyReact.createElement(
          'fieldset',
          null,
          MyReact.createElement('legend', null, this.props.question),
          Choices,
          MyReact.createElement('input', inputButtonProps, null),
          Message
        )
      );
    }

    handleChange(event) {
      this.state.value = event.target.value;
      this.state.answered = true;
      this.setState(this.display());
    }

    handleSubmit(event) {
      event.preventDefault();
      this.state.message =
        this.props.choices[this.props.answer] === this.state.value
          ? 'Correct!'
          : 'Wrong!';

      this.setState(this.display());
    }

    render() {
      return super.render(this.display());
    }
  }

  const Material = ({ name, type, link, question, choices, answer }) => {
    if (type === 'Video') {
      return MyReact.createElement(Video, { name, link }, null);
    } else if (type === 'Website') {
      return MyReact.createElement(WebLink, { name, link }, null);
    } else {
      // MCQ
      return MyReact.createElement(
        MCQ,
        { name, question, choices, answer },
        null
      );
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
              materials.map(({ name, type, link, question, choices, answer }) =>
                MyReact.createElement(
                  Material,
                  { name, type, link, question, choices, answer },
                  null
                )
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
