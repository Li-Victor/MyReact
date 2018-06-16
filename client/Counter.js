// Counter Example
(() => {
  class Counter extends MyReact.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0
      };
      this.onPlusClick = this.onPlusClick.bind(this);
      this.onMinusClick = this.onMinusClick.bind(this);
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
          MyReact.createElement('button', { onClick: this.onPlusClick }, '+'),
          MyReact.createElement('div', null, `${this.state.value}`),
          MyReact.createElement('button', { onClick: this.onMinusClick }, '-')
        )
      );
    }

    onMinusClick() {
      this.state.value -= 1;
      this.setState(
        MyReact.createElement(
          'div',
          null,
          MyReact.createElement('button', { onClick: this.onPlusClick }, '+'),
          MyReact.createElement('div', null, `${this.state.value}`),
          MyReact.createElement('button', { onClick: this.onMinusClick }, '-')
        )
      );
    }

    // have to call super.render()
    render() {
      return super.render(
        MyReact.createElement(
          'div',
          null,
          MyReact.createElement('button', { onClick: this.onPlusClick }, '+'),
          MyReact.createElement('div', null, `${this.state.value}`),
          MyReact.createElement('button', { onClick: this.onMinusClick }, '-')
        )
      );
    }
  }
  const App = MyReact.createElement('div', null, Counter, Counter);
  MyReact.render(App, document.getElementById('root'));
})();
