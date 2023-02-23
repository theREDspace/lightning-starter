import lightning from "@lightningjs/core"

export interface CarouselItemProps extends lightning.Component.TemplateSpec {
  title: string;
  image: string;
}

const enum flexDirection {
  Column = 'column'
}

export class CarouselItem extends lightning.Component<CarouselItemProps> {
  static _template() {
    return {
      flex: {
        direction: flexDirection.Column,
        padding: 10
      },
      Image: {
        src: this.bindProp('image')
      },
      Title: {
        text: {
          text: this.bindProp('title'),
          fontSize: 20,
          wordWrap: false,
          textOverflow: 'ellipsis',
          wordWrapWidth: 200
        }
      }
    }
  }
}