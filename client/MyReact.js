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

  function render(ReactElement, domContainer) {
    domContainer.appendChild(ReactElement);
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
    if (typeof type === 'string') {
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

  window.MyReact = {
    render,
    createElement
  };
})();
