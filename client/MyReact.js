(() => {
  function isDOMElement(el) {
    return typeof HTMLElement === 'object'
      ? el instanceof HTMLElement //DOM2
      : el &&
          typeof el === 'object' &&
          el !== null &&
          el.nodeType === 1 &&
          typeof el.nodeName === 'string';
  }

  function isClass(v) {
    return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
  }

  // create Component or Component Tree
  function createC_or_CT(element, child) {
    if (Array.isArray(child)) {
      child.forEach(component => {
        createC_or_CT(element, component);
      });
    } else if (isDOMElement(child)) {
      element.appendChild(child);
    } else {
      element.innerHTML += child;
    }
  }

  function createElement(type, props, ...children) {
    if (isClass(type)) {
      const ClassComponent = new type(props);
      return ClassComponent.render();
    } else if (typeof type === 'string') {
      const element = document.createElement(type);
      // if it is not a DOM Element, then it is a string
      children.forEach(child => {
        createC_or_CT(element, child);
      });
      return element;
    } else {
      // creating functional components
      return type(props);
    }
  }

  function render(ReactElement, domContainer) {
    if (isClass(ReactElement)) {
      const ClassComponent = new ReactElement();
      domContainer.appendChild(ClassComponent.render());
    } else {
      domContainer.appendChild(ReactElement);
    }
  }

  class Component {
    constructor(props) {
      this.props = props;
    }

    render() {}
    // set state
  }

  window.MyReact = {
    render,
    createElement,
    Component
  };
})();
