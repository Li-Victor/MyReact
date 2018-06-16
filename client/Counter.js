// Counter Example
(() => {
  class Counter extends MyReact.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0
      };
    }

    // Steps for reRendering:
    // 1. change state object
    // 2. create new element, like copying what was in the render function
    // 3. Call this.setState with new element

    onPlusClick() {
      this.state.value += 1;
      this.setState(
        MyReact.createElement(
          'div',
          null,
          MyReact.createElement(
            'button',
            { onClick: this.onPlusClick.bind(this) },
            '+'
          ),
          MyReact.createElement('div', null, `${this.state.value}`),
          MyReact.createElement(
            'button',
            { onClick: this.onMinusClick.bind(this) },
            '-'
          )
        )
      );
    }

    onMinusClick() {
      this.state.value -= 1;
      this.setState(
        MyReact.createElement(
          'div',
          null,
          MyReact.createElement(
            'button',
            { onClick: this.onPlusClick.bind(this) },
            '+'
          ),
          MyReact.createElement('div', null, `${this.state.value}`),
          MyReact.createElement(
            'button',
            { onClick: this.onMinusClick.bind(this) },
            '-'
          )
        )
      );
    }

    // have to call super.render()
    render() {
      return super.render(
        MyReact.createElement(
          'div',
          null,
          MyReact.createElement(
            'button',
            { onClick: this.onPlusClick.bind(this) },
            '+'
          ),
          MyReact.createElement('div', null, `${this.state.value}`),
          MyReact.createElement(
            'button',
            { onClick: this.onMinusClick.bind(this) },
            '-'
          )
        )
      );
    }
  }

  MyReact.render(Counter, document.getElementById('root'));
})();
