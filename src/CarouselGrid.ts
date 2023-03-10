import Lightning from '@lightningjs/core';
import { fetchData } from './ApiData';
import { CarouselItem } from './CarouselItem';
import { CarouselRow } from './CarouselRow';

const itemPadding = 20;

// Fixed size of logo.png
const imageSize = 225;

// The amount we shift per-row when scrolling vertically.
// Accounts for image size, padding and font size
const shiftAmount = 335;

export interface CarouselGridProps extends Lightning.Component.TemplateSpec {
  Rows: typeof CarouselRow;
}

export class CarouselGrid extends Lightning.Component<CarouselGridProps> {
  private _selectedRow: number = 0;

  static _template() {
    return {
      clipping: true,
      w: 1720,
      h: 880,
      x: 200,
      y: 200,
      Rows: {
        // See: https://lightningjs.io/docs/#/lightning-core-reference/Templates/Flexbox
        flex: {
          direction: 'column',
          padding: itemPadding,
        },
      },
      SelectionOutline: {
        x: itemPadding + 2,
        y: 82,
        // See: https://lightningjs.io/docs/#/lightning-core-reference/RenderEngine/Shaders/RoundedRectangle?id=rounded-rectangle
        texture: Lightning.Tools.getRoundRect(
          /* width= */ imageSize + 10,
          /* height= */ imageSize + 10,
          /* radius= */ 5,
          /* strokeWidth= */ 3,
          /* color= */ 0xffffffff,
          /* fill= */ false
        ),
      },
    };
  }

  _active() {
    fetchData().then(data => {
      const rows = this.tag('Rows')!;
      // See: https://lightningjs.io/docs/#/lightning-core-reference/RenderEngine/Elements/Children
      rows.children = data.map((row) => ({
        type: CarouselRow,
        title: row.title,
        asdf: 'st',
        items: row.items.map((item) => ({
          type: CarouselItem,
          title: item.title,
          image: item.image,
          description: item.description,
        })),
        // See: https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal
        signals: {
          selectionChanged: true, // true means the callback function name matches the signal name
        },
      }));

      this.selectionChanged();
    });

  }

  // See: https://lightningjs.io/docs/#/lightning-core-reference/HandlingInput/RemoteControl/KeyHandling
  _handleKey(e: KeyboardEvent) {
    const rows = this.tag('Rows')!;
    let newIndex: number;
    switch (e.key) {
      case 'ArrowUp':
        newIndex = this._selectedRow - 1;
        break;
      case 'ArrowDown':
        newIndex = this._selectedRow + 1;
        break;
      default:
        return false;
    }

    // optional: Ignore key presses until transition is done.
    if (!rows.transition('y')?.isRunning()) {
      this._selectedRow = Math.min(
        Math.max(newIndex, 0),
        rows.children.length - 1
      );
      rows.setSmooth('y', this._selectedRow * -shiftAmount);
      this.selectionChanged();
    }
    return true;
  }

  // Signal handler registered in _template above:
  selectionChanged() {
    const selectedItem = this.tag('Rows')!.children[this._selectedRow].selectedItem;
    this.signal('setDescription', selectedItem.description);
  }

  _getFocused() {
    return this.tag('Rows')!.children[this._selectedRow];
  }
}
