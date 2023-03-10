import Lightning from '@lightningjs/core';

export interface CarouselItemProps extends Lightning.Component.TemplateSpec {
  title: string;
  image: string;
}

const enum flexDirection {
  Column = 'column',
}

export class CarouselItem extends Lightning.Component<CarouselItemProps> {
  static _template() {
    return {
      flex: {
        direction: flexDirection.Column,
        padding: 10,
      },
      Image: {
        src: this.bindProp('image'),
      },
      Title: {
        text: {
          // See: https://lightningjs.io/docs/#/lightning-core-reference/RenderEngine/Textures/Text
          text: this.bindProp('title'),
          fontSize: 20,
          wordWrap: false,
          textOverflow: 'ellipsis',
          wordWrapWidth: 200,
        },
      },
    };
  }
}
