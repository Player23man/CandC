import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";

class TestIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly scrollMargin = "0px";
  readonly thresholds = [0];

  constructor(private readonly callback: IntersectionObserverCallback) {}

  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
  unobserve() {}

  observe(element: Element) {
    this.callback(
      [{
        boundingClientRect: element.getBoundingClientRect(),
        intersectionRatio: 1,
        intersectionRect: element.getBoundingClientRect(),
        isIntersecting: true,
        rootBounds: null,
        target: element,
        time: 0
      }],
      this
    );
  }
}

globalThis.IntersectionObserver = TestIntersectionObserver;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false
  })
});

afterEach(() => {
  document.body.innerHTML = "";
});
