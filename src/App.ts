import Lightning from '@lightningjs/core'

export class App extends Lightning.Application {
  static override _template() {
    return {
      Element1: {
        color: 0xffffff00, // ARGB Encoded colors
        rect: true,
        mount: 0.5, // Use x,y position as centre
        x: 1920 / 2,
        y: 1080 / 2,
        w: 400, h: 300,
        Element2: {
          color: 0xffff0000,
          // X,Y relative to parent:
          x: 200,
          y: 300,
          mountX: 0.5, // Use x as centre
          mountY: 1, // Use y as bottom
          text: { text: 'Hello World!' }
        },
        Element3: {
          src: './logo.png'
        }
      },
    }
  }
}