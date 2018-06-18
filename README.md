# MyReact

My own implementation of React. Supports props, state, event handling, and component rerendering.

## Prerequisites

- [Node.js](https://node.js)

### Steps

- Install libraries with `npm install` or `yarn`.
- Run local server on port 5000 with `npm run start` or `yarn start`.
- Head to `localhost:5000`.

## Reference

### render()
```javascript
MyReact.render(element, container)
```
Renders a MyReact element into the DOM in the supplied container.

Example:
```javascript
const Text = MyReact.createElement('div', null, 'Hello World')
MyReact.render(Text, document.getElementById('root'))
```

### createElement()
```javascript
MyReact.createElement(
  type,
  [props],
  [...children]
 ) 
```
Create and return a new MyReact(DOM) element of the given type. The type argument can be either a tag name string (such as 'div' or 'span'), a MyReact component type (a class or a function), or an array of MyReact component types. 

To pass properties into a component, an object must be supplied for the props argument. To not pass properties, use null.

Example:
```javascript
MyReact.createElement('div', null, 'Hello World');
// or
const Text = ({ text }) =>
  MyReact.createElement('div', null, text);
MyReact.createElement(Text, { text: 'Hello World' }, null);
```

### MyReact.Component
MyReact lets you define components as classes or functions. Components defined as classes has their own local state as well as the ability to rerender.

To define a MyReact component, you need to extend `MyReact.Component`:
```javascript
class Welcome extends MyReact.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return super.render(
      MyReact.createElement('h1', null, `Hello, ${this.props.name}`)
    );
  }
}
```

The methods you must define in MyReact.Component subclass is called `constructor(props)` and `render()`
#### constructor(props)
When implementing the constuctor for a `MyReact.Component` subclass, you have to call `super(props)` before any statement.

Typically in MyReact constructors,

1. Initialize local state by assigning an object to `this.state`.
2. Binding `event handler` methods.

```javascript
constructor(props) {
  super(props);
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

#### render()
When called, it should examine `this.props` and `this.state`, and return using a `super.render()` with a MyReact element.

#### setState(MyReact.element)
When called, will update the component to the new MyReact element.

## Examples

To see other examples, change the last script tag in `client/index.html`.

There are 3 examples: Form, Counter, Lessons
- <script src="./examples/Form.js"></script>
- <script src="./examples/Counter.js"></script>
- <script src="./examples/App.js"></script>

## Additional
There is a GraphQL endpoint on `localhost:5000/graphql`. On `localhost:5000/graphiql`, there is an visual editor for GraphQL queries.
