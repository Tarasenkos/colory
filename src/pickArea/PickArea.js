import { parceColor, getBaseColor } from "../common/functions.js"
import { Listener } from "../common/Listener.js"

export class PickArea extends Listener {
  static className = 'colory-picker'
  constructor(root, options) {
    super(['mousedown'], root, options.trigger)
    this.root = root
    this.target = options.target
    this.color = options.color
    console.log(this.color)
  }

  init() {
    this.root.innerHTML = this.getHTML()
    this.on('rangeArea:setColor', (arg) => this._changePickAreaColor(arg))
    this.addListener()
  }

  getHTML() {
    return `
    <div class="colory-picker-area-above">
    <div class="colory-picker-area" id="pick"></div>
    </div>`
  }

  onMousedown() {
    
    const target = event.target

    if (target.id === "pick") {
      const maxWidth = event.target.clientWidth
      const maxHeight = event.target.clientHeight
      const baseColor = parceColor(getBaseColor(this, this.color))
      const coord = getPickAreaCoord(maxWidth, maxHeight)
      this.color = computeColor(baseColor, coord)
      
      changeTargetColor(this, this.color)
      return onMouseMoveHandler(this, baseColor, maxWidth, maxHeight)
    }
  }



  _changePickAreaColor(arg) {
    this.color = arg
    this.root.children[0].style.backgroundColor = this.color
    console.log('Установили цвет: ', this.color )

  }

}

function onMouseMoveHandler(self, baseColor, maxWidth, maxHeight) {

  onmousemove = () => {
    let coord = getPickAreaCoord(maxWidth, maxHeight)
    let color = computeColor(baseColor, coord)
    
    changeTargetColor(self, color)
  }

  onmouseup = () => {

    onmousemove = null
    onmouseup = null
  }

}


function computeColor(initColor, coord) {

  console.log('Начальный цвет: ', initColor )
  console.log('Коэфф Х: ', coord.Xcent)
  console.log('Коэфф Y: ', coord.Ycent )
  

let R,G,B,difR,difG,difB

difR = 255 - initColor.R
difG = 255 - initColor.G
difB = 255 - initColor.B

R = Math.round((difR*coord.Xcent + initColor.R) * coord.Ycent)
G = Math.round((difG*coord.Xcent + initColor.G) * coord.Ycent)
B = Math.round((difB*coord.Xcent + initColor.B) * coord.Ycent)


  let result = `rgb(${R}, ${G}, ${B})`
  console.log('Результат: ', result)
  return result
}



function getPickAreaCoord(maxWidth, maxHeight) {
  let kX = 255 / maxWidth
  let kY = 255 / maxHeight

  let Xcent = Math.round(100 - event.offsetX/maxWidth*100)/100
  let Ycent = Math.round(100 - event.offsetY/maxHeight*100)/100

  let X = Math.round(event.offsetX * kX)
  let Y = Math.abs(Math.round(event.offsetY * kY) - 255)

  if (X > 255) { X = 255 }
  if (X < 0) { X = 0 }

  if (Y > 255) { Y = 255 }
  if (Y < 0) { Y = 0 }
  
  return {
    X, Y, Xcent, Ycent
  }

}

function changeTargetColor(self, color) {
  self.target.style.backgroundColor = color

}

