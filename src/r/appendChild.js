import Component from '../component/Component';
import Listener from '../listen/Listener';
import appendChildren from './appendChildren';
import appendListenerToElement from './utils/appendListenerToElement';

/**
 * @param {HTMLElement} element
 * @returns {function(*)}
 */
const appendChild = element => child => {
  if (!child) return;

  if (child instanceof Component) {
    element.appendChild(child.render());
    return;
  }

  if (child instanceof Listener) {
    appendListenerToElement(child, element);
    return;
  }

  if (Array.isArray(child)) {
    appendChildren(element, child);
    return;
  }

  // Handles lazy loading components
  if (typeof child === 'function') {
    const placeholder = document.createElement('div');
    const el = element.appendChild(placeholder);
    child().then(local => {
      el.appendChild((new local.default()).render());
    });
    return;
  }

  if (child instanceof Node) {
    element.appendChild(child);
    return;
  }

  element.appendChild(document.createTextNode(child));
};

export default appendChild;
