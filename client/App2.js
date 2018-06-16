(() => {
  class Hello extends MyReact.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return MyReact.createElement(
        'div',
        null,
        `My name is ${this.props.name}`
      );
    }
  }

  const App2 = MyReact.createElement(Hello, { name: 'Victor' }, null);
  MyReact.render(App2, document.getElementById('root'));
})();
