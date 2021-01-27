import { parceColor, getBaseColor } from "../common/functions.js"
import { Listener } from "../common/Listener.js"

export class PickArea extends Listener {
  static className = 'colory-picker'
  constructor(root, options) {
    super(['mousedown'], root, options.trigger)
    this.root = root
    this.target = options.target
    this.color = options.color
  
  }

  init() {
    this.root.innerHTML = this.getHTML()
    this.pickPiont = this.root.querySelector('.colory-pickpoint')

    const baseColor = parceColor(getBaseColor(this, this.color))
    
    const coord = RGB_TO_XY(this.color, baseColor)
    getPointerPosition(this.pickPiont, coord)

  
    this.on('rangeArea:setColor', (arg) => this._changePickAreaColor(arg))
    this.addListener()
  }

  getHTML() {
    return `
    <div class="colory-picker-area-above">
    <div class="colory-picker-area" id="pick">
    <div class="colory-pickpoint"></div>
    </div>
    </div>`

  }

  onMousedown(event) {

    const pickArea = event.target.getBoundingClientRect()
    console.log(pickArea)
    
    if (event.target.id === "pick") {
      const pickArea = event.target.getBoundingClientRect()
      const baseColor = parceColor(getBaseColor(this, this.color))
      
      onMouseMoveHandler(this, pickArea, baseColor)()
    }
  }

  _changePickAreaColor(color) {
    this.color = color
    this.root.children[0].style.backgroundColor = this.color

  }
}

function getPointerPosition(pickPiont, coord) {

  pickPiont.style.right = coord.X + 'px'
  pickPiont.style.bottom = coord.Y + 'px'
 
console.log('pickPiont', coord.X, coord.Y)

  }

function onMouseMoveHandler(self, pickArea, baseColor) {

  return onmousemove = () => {
    let coord = getClickXY(pickArea)
    let color = XY_TO_RGB(baseColor, coord)

    getPointerPosition(self.pickPiont, coord)
    changeTargetColor(self, color)

    onmouseup = () => {
      onmousemove = null
      onmouseup = null
    }
  }
}


function XY_TO_RGB(baseColor, coord) {

let R,G,B,difR,difG,difB

console.log('Исходные координаты', coord)

difR = 255 - baseColor.R
difG = 255 - baseColor.G
difB = 255 - baseColor.B


R = Math.round((difR*coord.Xcent + baseColor.R) * coord.Ycent)
G = Math.round((difG*coord.Xcent + baseColor.G) * coord.Ycent)
B = Math.round((difB*coord.Xcent + baseColor.B) * coord.Ycent)


  let result = `rgb(${R}, ${G}, ${B})`
  return result
}

function RGB_TO_XY(elColor, baseColor) {

  let difR, difG, difB

  difR = 255 - baseColor.R
  difG = 255 - baseColor.G
  difB = 255 - baseColor.B
  

  let {R, G, B} = parceColor(elColor)
  let X, Y, coordX, coordY
 
  coordX = (G * baseColor.R - R * baseColor.G) / (R * difG - G * difR) || 0
  coordY = 1 - (B / (difB * coordX + baseColor.B)) || 0

  X = 220 * coordX
  Y = 180 - 180 * coordY

  return {
    X, 
    Y
  }

}


function getClickXY(pickArea) {
  
  const maxWidth = pickArea.width
  const maxHeight = pickArea.height
  
  let X = pickArea.right - event.clientX
  let Y = pickArea.bottom - event.clientY

  if (X > maxWidth) {X = maxWidth}
  if (X < 0) {X = 0}
  if (Y > maxHeight) {Y = maxHeight}
  if (Y < 0) {Y = 0}

  let Xcent = Math.round(X/maxWidth*100)/100
  let Ycent = Math.round(Y/maxHeight*100)/100
   
  return {
    Xcent, Ycent, X, Y
  }

}

function changeTargetColor(self, color) {
  self.target.style.backgroundColor = color

}

