import lightning from "@lightningjs/core"
import { data } from "./ApiData"
import { CarouselItem } from "./CarouselItem"
import { CarouselRow } from "./CarouselRow"

const shiftAmount = 335
export class CarouselGrid extends lightning.Component {
  private _selectedRow: number = 0;

  static _template() {
    return {
      clipping: true,
      w: 1720, h: 880,
      x: 200, y: 200,
      SelectionOutline: {
        x: 20, y: 80,
        texture: lightning.Tools.getRoundRect(240, 240, 5, 3, 0xffffffff, false)
      },
      Rows: {
        flex: {
          direction: 'column',
          padding: 20
        },
        Row: {
          type: CarouselRow,
          signals: {
            selectionChanged: true,
          }
        }
      }
    }
  }

  _active() {
    const rows = this.tag('Rows')!
    rows.patch({
      children: data.map(row => ({
        type: CarouselRow,
        title: row.title,
        items: row.items.map(item => ({
          type: CarouselItem,
          title: item.title,
          image: item.image
        })),
        signals: {
          'selectionChanged': true // true means the callback function name matches the signal name
        }
      }))
    })
  }

  _handleKey(e: KeyboardEvent) {
    const rows = this.tag('Rows')!
    let newIndex: number;
    switch (e.key) {
      case 'ArrowUp':
        newIndex = this._selectedRow - 1
        break
      case 'ArrowDown':
        newIndex = this._selectedRow + 1
        break
      default:
        return false
    }
    if (!rows.transition('y')?.isRunning()) {
      this._selectedRow = Math.min(Math.max(newIndex  , 0), rows.children.length - 1)
      rows.setSmooth('y', this._selectedRow * -shiftAmount)
      this.selectionChanged()
    }
    return true
  }

  selectionChanged() {
    const selectedColumn = this.tag('Rows')!.children[this._selectedRow].selectedItem
    this.signal('setDescription', data[this._selectedRow].items[selectedColumn].description)
  }

  _getFocused() {
    return this.tag('Rows')!.children[this._selectedRow]
  }
}