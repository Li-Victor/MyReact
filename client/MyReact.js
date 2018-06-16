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

  function applyProps(element, props) {
    // iterate over props object
    for (const [propKey, propVal] of Object.entries(props)) {
      // Event listeners starts with "on"
      if (propKey.match(/^on.*$/)) {
        const EVL = propKey.slice(2).toLowerCase();
        element.addEventListener(EVL, propVal);
      } else {
        element.setAttribute(propKey, propVal);
      }
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

      if (props !== null) applyProps(element, props);
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

    setState(newDomElement) {
      this.domElement.replaceWith(newDomElement);
      this.domElement = newDomElement;
    }

    render(domElement) {
      this.domElement = domElement;
      return domElement;
    }
  }

  window.MyReact = {
    render,
    createElement,
    Component
  };
})();
