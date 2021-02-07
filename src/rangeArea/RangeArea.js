import { createDomNode, getBaseColor, getClickXY } from "../common/functions.js";
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
      this.node = createDomNode('div', 'colory-range-area', 'range')
      this.root.appendChild(this.node)
      this.render()
      resolve()
    } )

    render.then(() => { 
      const vertical = true
      const coord = this.pointer.getPosition(vertical)
      this.pointer.setPosition(coord)
    })

    this.on('pointer:newPosition', () => this.render())
    this.addListener()
    
    setColor(this, this.color)
  }

  render() {
    this.node.innerHTML = this.pointer.render()
  }
  
  onMousedown(event) {
    this.target = event.target
    const target = this.target
    if (target.id === "range") {

      target.classList.add('colory-grab')

      this.rangeArea = target.getBoundingClientRect()
      onMouseMoveHangler(this)()
    }
  }

}

function onMouseMoveHangler(self) {
  return onmousemove = () => {
    const horizontal = false
    const coord = getClickXY(self.rangeArea, horizontal)
    self.pointer.setPosition(coord)

    setColor(self)
  
  onmouseup = () => {
    self.target.classList.remove('colory-grab')
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