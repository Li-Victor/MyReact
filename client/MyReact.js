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

  function createElement(type, props, ...children) {
    const element = document.createElement(type);
    // if it is not a DOM Element, then it is a string
    children.forEach(child => {
      if (isDOMElement(child)) {
        element.appendChild(child);
      } else {
        element.innerHTML += child;
      }
    });
    return element;
  }

  window.MyReact = {
    render,
    createElement
  };
})();
