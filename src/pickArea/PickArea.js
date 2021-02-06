import { parseColor, getBaseColor, getClickXY } from "../common/functions.js"
import { Listener } from "../common/Listener.js"
import { Pointer } from "../pointer/pointer.js"

export class PickArea extends Listener {
  static className = 'colory-picker'
  constructor(root, options) {
    super(['mousedown'], root, options.trigger)
    this.root = root
    this.target = options.target
    this.color = options.color
    this.baseColor = this.color
    this.pointer = new Pointer(this, 'colory-pickarea-pickpoint')
  }

  init() {

    const render = new Promise((resolve) => {
      this.render()
      resolve()
    } )
    
    render.then(() => {
      this.pointer.setPosition(this.pointer.getPosition())
      this.setAreaColor()
    })
      
    this.on('rangeArea:setColor', (arg) => this.setAreaColor(arg))
    this.on('pointer:newPosition', () => this.render())
    this.addListener()

  }

  render() {
    this.root.innerHTML = this.getHTML(this.pointer.render())
  }

  getHTML(pointer) {
    const color = this.baseColor
     return `
    <div class="colory-picker-area-above" style="background-color: ${color} ">
      <div class="colory-picker-area" id="range">
        ${pointer}
      </div>
    </div>`

  }
 
  setAreaColor(baseColor = this.baseColor) {
    this.baseColor = baseColor
    this.root.children[0].style.backgroundColor = this.baseColor

    setTargetColor(this)
  }

  onMousedown(event) {

    if (event.target.id === "range") {
      const pickArea = event.target.getBoundingClientRect()
      onMouseMoveHandler(this, pickArea)()
    }
  }
}

function setTargetColor(self, pickArea = null) {

    const pointerPosition = pickArea ? getClickXY(pickArea) : self.pointer.findPointer()
    const color = XY_TO_RGB(parseColor(self.baseColor), pointerPosition )
    pickArea && self.pointer.setPosition(pointerPosition)
    
    self.trig('pickArea:colorChanged', color)
}

function onMouseMoveHandler(self, pickArea) {

  return onmousemove = () => {
    setTargetColor(self, pickArea)
    
    onmouseup = () => {
      onmousemove = null
      onmouseup = null
    }
  }
}



function XY_TO_RGB(baseColor, coord) {

  let R, G, B, difR, difG, difB

  difR = 255 - baseColor.R
  difG = 255 - baseColor.G
  difB = 255 - baseColor.B


  R = Math.round((difR * coord.Xcent + baseColor.R) * coord.Ycent)
  G = Math.round((difG * coord.Xcent + baseColor.G) * coord.Ycent)
  B = Math.round((difB * coord.Xcent + baseColor.B) * coord.Ycent)


  const result = `rgb(${R}, ${G}, ${B})`
  return result
}