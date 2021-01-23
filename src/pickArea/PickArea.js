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
    
    const coord = getCoordByRGB(this.color, baseColor)
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
    
    const target = event.target
    const targetCoord = target.getBoundingClientRect()
    
    if (target.id === "pick") {
      const baseColor = parceColor(getBaseColor(this, this.color))
      const coord = getClickCoord(targetCoord)
      this.color = computeColor(baseColor, coord)

      
      getPointerPosition(this.pickPiont, coord)
      changeTargetColor(this, this.color)
      
      return onMouseMoveHandler(this, targetCoord, baseColor)
    }
  }


  _changePickAreaColor(color) {
    this.color = color
    this.root.children[0].style.backgroundColor = this.color

  }

}

function getPointerPosition(pickPiont, coord) {

  pickPiont.style.left = coord.coordX + 'px'
  pickPiont.style.top = coord.coordY + 'px'
    
  }

function onMouseMoveHandler(self, targetCoord, baseColor) {

  onmousemove = () => {
    let coord = getClickCoord(targetCoord)
    let color = computeColor(baseColor, coord)

    getPointerPosition(self.pickPiont, coord)
    changeTargetColor(self, color)
  }

  onmouseup = () => {
    onmousemove = null
    onmouseup = null
  }

}


function computeColor(baseColor, coord) {

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

function getCoordByRGB(elColor, baseColor) {

  let difR, difG, difB

  difR = 255 - baseColor.R
  difG = 255 - baseColor.G
  difB = 255 - baseColor.B

  let {R, G, B} = parceColor(elColor)
  let X, Y, coordX, coordY
 
  X = (G * baseColor.R - R * baseColor.G) / (R * difG - G * difR) || 0
  Y = B / (difB * X + baseColor.B) || 0

  coordX = 220 - 220 * X
  coordY = 180 - 180 * Y

  return {
    coordX, 
    coordY
  }

}


function getClickCoord(pickArea) {
  
  const maxWidth = pickArea.width
  const maxHeight = pickArea.height
  
  const kX = 255 / maxWidth
  const kY = 255 / maxHeight

  let coordX = event.clientX - pickArea.x
  let coordY = event.clientY - pickArea.y

  if (coordX > maxWidth) {coordX = maxWidth}
  if (coordX < 0) {coordX = 0}
  if (coordY > maxHeight) {coordY = maxHeight}
  if (coordY < 0) {coordY = 0}

  let Xcent = Math.round(100 - coordX/maxWidth*100)/100
  let Ycent = Math.round(100 - coordY/maxHeight*100)/100

  let X = Math.round(coordX * kX)
  let Y = Math.abs(Math.round(coordY * kY) - 255)
  
  
  return {
    X, Y, Xcent, Ycent, coordX, coordY
  }

}

function changeTargetColor(self, color) {
  self.target.style.backgroundColor = color

}

