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
        flex: {
          direction: 'column'
        },
        Element2: {
          color: 0xffff0000,
          text: { text: 'Hello World!' }
        },
        Element3: {
          flexItem: {
            marginTop: 15
          },
          src: './logo.png'
        }
      },
    }
  }
}