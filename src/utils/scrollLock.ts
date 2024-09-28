let scrollLockCount = 0;
const originalStyle = {
  overflow: "",
  paddingRight: "",
};

export function disableScroll() {
  if (scrollLockCount === 0) {
    originalStyle.overflow = document.body.style.overflow;
    originalStyle.paddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  scrollLockCount++;
}

export function enableScroll() {
  scrollLockCount--;
  if (scrollLockCount === 0) {
    document.body.style.overflow = originalStyle.overflow;
    document.body.style.paddingRight = originalStyle.paddingRight;
  }
}

export function useScrollLock() {
  return {
    lockScroll: disableScroll,
    unlockScroll: enableScroll,
  };
}
