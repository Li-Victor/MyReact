// Counter Example

class Counter extends MyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.onPlusClick = this.onPlusClick.bind(this);
    this.onMinusClick = this.onMinusClick.bind(this);
  }

  display() {
    return MyReact.createElement(
      'div',
      null,
      MyReact.createElement('button', { onClick: this.onPlusClick }, '+'),
      MyReact.createElement('div', null, `${this.state.value}`),
      MyReact.createElement('button', { onClick: this.onMinusClick }, '-')
    );
  }

  // Steps for reRendering:
  // 1. change state object
  // 2. create new element, like copying what was in the render function
  // 3. Call this.setState with new element

  onPlusClick() {
    this.state.value += 1;
    this.setState(this.display());
  }

  onMinusClick() {
    this.state.value -= 1;
    this.setState(this.display());
  }

  // have to call super.render()
  render() {
    return super.render(this.display());
  }
}
const App = MyReact.createElement('div', null, Counter, Counter);
MyReact.render(App, document.getElementById('root'));
