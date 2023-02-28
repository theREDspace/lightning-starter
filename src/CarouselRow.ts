import Lightning from '@lightningjs/core';

interface CarouselRowSignalMap extends Lightning.Component.SignalMap {
  selectionChanged(name: string): void;
}

interface CarouselRowTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: CarouselRowSignalMap;
}

interface CarouselRowProps extends Lightning.Component.TemplateSpec {}

const shiftAmount = 245;

export class CarouselRow extends Lightning.Component<
  CarouselRowProps,
  CarouselRowTypeConfig
> {
  selectedItem = 0;

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
        newIndex = this.selectedItem - 1;
        break;
      case 'ArrowRight':
        newIndex = this.selectedItem + 1;
        break;
      default:
        return false;
    }
    if (!carousel.transition('x').isRunning()) {
      this.selectedItem = Math.min(
        Math.max(newIndex, 0),
        carousel.children.length - 1
      );
      carousel.setSmooth('x', this.selectedItem * -shiftAmount);
      this.signal('selectionChanged', 'foobar');
    }
    return true;
  }

  _getFocused() {
    return this;
  }
}
