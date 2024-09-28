export function clickOutside(element: HTMLElement, callback: () => void) {
  const outsideClickListener = (event: MouseEvent) => {
    if (!element.contains(event.target as Node) && isVisible(element)) {
      callback();
    }
  };

  document.addEventListener('click', outsideClickListener);

  return () => {
    document.removeEventListener('click', outsideClickListener);
  };
}

function isVisible(elem: HTMLElement) {
  return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

export function createBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.className = 'fixed inset-0 z-40';
  return backdrop;
}