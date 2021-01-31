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

    const pointerPosition = RGB_TO_XY(this.color)
    setTimeout(() => { setPointerPosition(this.pickPiont, pointerPosition) }, 0)

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

    if (event.target.id === "pick") {
      const pickArea = event.target.getBoundingClientRect()
      const baseColor = parceColor(getBaseColor(this, this.color))

      onMouseMoveHandler(this, pickArea, baseColor)()
    }
  }

  _changePickAreaColor(baseColor) {
    this.color = baseColor
    this.root.children[0].style.backgroundColor = this.color
    setTragetColor(this)
  }
}

function setTragetColor(self) {

    const baseColor = self.color
    const parent = getParent(self.pickPiont)
    const Xcent = +self.pickPiont.style.right.slice(0, -2) / parent.width
    const Ycent = +self.pickPiont.style.bottom.slice(0, -2) / parent.height
    const color = XY_TO_RGB(parceColor(baseColor), { Xcent, Ycent })

    changeTargetColor(self, color)
}

function setPointerPosition(pickPiont, coord) {

  const parent = getParent(pickPiont)

  pickPiont.style.right = parent.width * coord.Xcent + 'px'
  pickPiont.style.bottom = parent.height * coord.Ycent + 'px'
  pickPiont.style.display = "block"

}

function getParent(child) {
  return child.parentElement.getBoundingClientRect()

}

function onMouseMoveHandler(self, pickArea, baseColor) {

  return onmousemove = () => {
    const coord = getClickXY(pickArea)
    const color = XY_TO_RGB(baseColor, coord)

    setPointerPosition(self.pickPiont, coord)
    changeTargetColor(self, color)

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

function RGB_TO_XY(elColor) {

  const { RGB } = parceColor(elColor)

  const MaxEl = Math.max(...RGB)
  const MinEl = Math.min(...RGB)

  const Xcent = MinEl / MaxEl
  const Ycent = MaxEl / 255

  return { Xcent, Ycent }
}


function getClickXY(pickArea) {

  const maxWidth = pickArea.width
  const maxHeight = pickArea.height

  let X = pickArea.right - event.clientX
  let Y = pickArea.bottom - event.clientY

  if (X > maxWidth) { X = maxWidth }
  if (X < 0) { X = 0 }
  if (Y > maxHeight) { Y = maxHeight }
  if (Y < 0) { Y = 0 }

  let Xcent = X / maxWidth
  let Ycent = Y / maxHeight

  return {
    Xcent, Ycent
  }
}

function changeTargetColor(self, newColor) {
  self.target.style.backgroundColor = newColor
}

