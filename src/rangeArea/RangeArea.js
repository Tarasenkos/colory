import { getBaseColor } from "../common/functions.js";
import { Listener } from "../common/Listener.js";

export class RangeArea extends Listener {
  
  static className = "colory-range"
  constructor(root, options) {
    super(['mousedown'], root, options.trigger)
    this.root = root
    this.color = options.color

  }

  init() {
    this.root.innerHTML = this.getHTML()
    this.addListener()
    setColor(this, this.color)
  }

  getHTML() {
    return `<div class="colory-range-area" id="range"></div>`
  }

  onMousedown() {
    if (event.target.id === "range") {

      setColor(this)

      onmousemove = () => {
        //if (event.target.id === "range") {
        setColor(this)
        //}
      }

      onmouseup = () => {
        setColor(this)()
        onmousemove = null
        onmouseup = null
      }
    }
  }

}

function setColor(self, color = '') {
  
  if (color) return getBaseColor(self, color)

  let rgb, sizeRange, colorRange
  sizeRange = event.target.clientHeight / 6
  let Y = event.offsetY || 0
  colorRange = Math.round(255 / sizeRange * Y)
  console.log(Y)

  if (Y < sizeRange * 1) { rgb = [255, 0, colorRange] }
  else if (Y < sizeRange * 2) { rgb = [255 * 2 - colorRange, 0, 255] }
  else if (Y < sizeRange * 3) { rgb = [0, colorRange - 255 * 2, 255] }
  else if (Y < sizeRange * 4) { rgb = [0, 255, 255 * 4 - colorRange] }
  else if (Y < sizeRange * 5) { rgb = [colorRange - 255 * 4, 255, 0] }
  else if (Y < sizeRange * 6) { rgb = [255, 255 * 6 - colorRange, 0] }
  else { rgb = [255, 0, 0] }
  let result = `rgb(${rgb.join(', ')})`
  self.trig('rangeArea:setColor', result)
  console.log('Базовый цвет: ', result)
  return ()=> console.log(result)

}