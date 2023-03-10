import Lightning from '@lightningjs/core';
import { CarouselItem, CarouselItemProps } from './CarouselItem';

// See: https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/TypeConfigs?id=signal-maps
interface CarouselRowSignalMap extends Lightning.Component.SignalMap {
  selectionChanged(): void;
}

// See: https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/TypeConfigs
interface CarouselRowTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: CarouselRowSignalMap;
}

// See: https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/TemplateSpecs
interface CarouselRowProps extends Lightning.Component.TemplateSpec {
  items: [CarouselItemProps];
  Carousel: {
    children: [typeof CarouselItem];
  };
}

const shiftAmount = 245;

export class CarouselRow extends Lightning.Component<
  CarouselRowProps,
  CarouselRowTypeConfig
> {
  private _selectedIndex = 0;

  get selectedItem() {
    return this.tag('Carousel')!.children[this._selectedIndex];
  }

  static _template() {
    return {
      clipping: true,
      flex: {
        direction: 'column' as const,
      },
      Title: {
        text: { text: this.bindProp('title') },
      },
      Carousel: {
        flex: {
          direction: 'row',
        },
        children: this.bindProp('items'),
      },
    };
  }

  _handleKey(e: KeyboardEvent) {
    const carousel = this.tag('Carousel')! as Lightning.Component;
    let newIndex: number;
    switch (e.key) {
      case 'ArrowLeft':
        newIndex = this._selectedIndex - 1;
        break;
      case 'ArrowRight':
        newIndex = this._selectedIndex + 1;
        break;
      default:
        return false;
    }
    if (!carousel.transition('x').isRunning()) {
      this._selectedIndex = Math.min(
        Math.max(newIndex, 0),
        carousel.children.length - 1
      );
      carousel.setSmooth('x', this._selectedIndex * -shiftAmount);
      this.signal('selectionChanged');
    }
    return true;
  }

  _getFocused() {
    return this;
  }
}
