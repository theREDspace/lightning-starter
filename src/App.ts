import Lightning from '@lightningjs/core';
import { CarouselGrid } from './CarouselGrid';

export class App extends Lightning.Application {
  descriptionText: string;

  static override _template() {
    return {
      Description: {
        x: 220,
        y: 50,
        text: {
          text: this.bindProp('descriptionText'),
          wordWrap: true,
          wordWrapWidth: 1200,
          maxLines: 3,
        },
      },
      Grid: {
        type: CarouselGrid,
        signals: {
          setDescription: true,
        },
      },
    };
  }

  setDescription(text: string) {
    this.descriptionText = text;
  }

  _getFocused() {
    return this.tag('Grid');
  }
}
