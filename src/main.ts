import { App } from './App';

window.addEventListener('DOMContentLoaded', () => {
  // See: https://lightningjs.io/docs/#/lightning-core-reference/RuntimeConfig/index
  const app = new App({
    stage: {
      w: 1920,
      h: 1080,
      precision: 1,
      clearColor: 0xff000000,
      defaultFontFace: 'Roboto',
    },
    debug: true,
  });

  document.body.appendChild(app.stage.getCanvas());
});
