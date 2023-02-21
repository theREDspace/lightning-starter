import lightning from "@lightningjs/core"

const shiftAmount = 245

export class CarouselRow extends lightning.Component {
  selectedItem = 0;

  static _template() {
    return {
      clipping: true,
      flex: {
        direction: 'column'
      },
      Title: {
        text: { text: this.bindProp('title') }
      },
      Carousel: {
        flex: {
          direction: 'row'
        },
        children: this.bindProp('items')
      }
    }
  }

  _handleKey(e: KeyboardEvent) {
    const carousel = this.tag('Carousel')! as lightning.Component
    let newIndex: number
    switch (e.key) {
      case 'ArrowLeft':
        newIndex = this.selectedItem - 1
        break
      case 'ArrowRight':
        newIndex = this.selectedItem + 1
        break
      default:
        return false;
    }
    if (!carousel.transition('x').isRunning()) {
      this.selectedItem = Math.min(Math.max(newIndex, 0), carousel.children.length - 1)
      carousel.setSmooth('x', this.selectedItem * -shiftAmount)
      this.signal('selectionChanged')
    }
    return true;
  }

  _getFocused() {
    return this
  }
}