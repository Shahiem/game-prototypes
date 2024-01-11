export default {
  view: {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    resizeTo: window,
    resolution: 2,
    autoResize: true,
    antialias: false,
    centerOnResize: false,
  },
  game: {
    width: 1000,
    height: 1000,
    drag: false,
    pinch: false,
    decelerate: false,
    wheel: false,
    defaultZoom: 0.5,
  },
  scenes: {
    Splash: {
      hideDelay: 1200,
    },
  },
  assets: {
    root: '/assets/',
  },
};