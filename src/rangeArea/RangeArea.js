import { getBaseColor, getClickXY } from "../common/functions.js";
import { Listener } from "../common/Listener.js";
import { Pointer } from "../pointer/pointer.js"

export class RangeArea extends Listener {
  
  static className = "colory-range"
  constructor(root, options) {
    super(['mousedown'], root, options.trigger)
    this.root = root
    this.color = options.color
    this.baseColor = this.color
    this.pointer = new Pointer(this, 'colory-range-pickpoint')
  }


  init() {

    const render = new Promise((resolve) => {
      this.render()
      resolve()
    } )

    render.then(()=>{
      //this.pointer.setPosition({Xcent:0.5, Ycent: 0.5})// координаты для примера
    })

    this.on('pointer:newPosition', () => this.render())
    this.addListener()
    setColor(this, this.color)
  }

  render() {
    this.root.innerHTML = this.getHTML(this.pointer.render())
  }

  getHTML(pointer) {
    return `<div class="colory-range-area" id="range">
            ${pointer}
            </div>`
  }

  onMousedown(event) {
    if (event.target.id === "range") {

      this.rangeArea = event.target.getBoundingClientRect()
      onMouseMoveHangler(this)()
    }
  }

}

function onMouseMoveHangler(self) {
  return onmousemove = () => {
    const coord = getClickXY(self.rangeArea, false)
    self.pointer.setPosition(coord)
    setColor(self)
  

  onmouseup = () => {
    onmousemove = null
    onmouseup = null
  }
}
}

function setColor(self, color = '') {
  
  if (color) return getBaseColor(self, color)

  let rangeArea = self.rangeArea
  let rgb, sizeRange, colorRange
  let Y = event.clientY - rangeArea.top;

  sizeRange = rangeArea.height / 6;

  (Y > rangeArea.height) && (Y = rangeArea.height);
  (Y < 0) && (Y = 0)

  colorRange = Math.round(255 / sizeRange * Y)

  if (Y < sizeRange * 1) { rgb = [255, 0, colorRange] }
  else if (Y < sizeRange * 2) { rgb = [255 * 2 - colorRange, 0, 255] }
  else if (Y < sizeRange * 3) { rgb = [0, colorRange - 255 * 2, 255] }
  else if (Y < sizeRange * 4) { rgb = [0, 255, 255 * 4 - colorRange] }
  else if (Y < sizeRange * 5) { rgb = [colorRange - 255 * 4, 255, 0] }
  else if (Y < sizeRange * 6) { rgb = [255, 255 * 6 - colorRange, 0] }
  else { rgb = [255, 0, 0] }
  
  let result = `rgb(${rgb.join(', ')})`
  self.trig('rangeArea:setColor', result)

}