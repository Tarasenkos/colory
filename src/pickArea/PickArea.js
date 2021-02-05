import { parseColor, getBaseColor } from "../common/functions.js"
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

  }

  init() {

    //this.pickPiont = this.root.querySelector('.colory-pickarea-pickpoint')
    
    this.pointer = new Pointer(this, 'colory-pickarea-pickpoint')
    
    this.root.innerHTML = this.getHTML(this.pointer.render())

    console.log('this.root', this.root)
        
    const pointerPosition = this.pointer.getPosition()

    // setTimeout(() => { setPointerPosition(this.pickPiont, pointerPosition) }, 0)
    setTimeout(() => { this.pointer.setPosition(pointerPosition) }, 0)
    
    this.on('rangeArea:setColor', (arg) => this.changeColor(arg))
    this.on('pointer:newPosition', (arg) => this.reRender(arg))



    this.addListener()
  }


  reRender(pointer) {
    this.root.innerHTML = this.getHTML(pointer)
  }

  getHTML(pointer) {
    return `
    <div class="colory-picker-area-above">
      <div class="colory-picker-area" id="range">
        ${pointer}
      </div>
    </div>`

  }

//   getPointerPosition() {

//   const { RGB } = parseColor(this.color)

//   const MaxEl = Math.max(...RGB)
//   const MinEl = Math.min(...RGB)

//   const Xcent = MinEl / MaxEl
//   const Ycent = MaxEl / 255

//   return { Xcent, Ycent }
// }

  onMousedown(event) {

    if (event.target.id === "range") {
      const pickArea = event.target.getBoundingClientRect()
      this.baseColor = getBaseColor(this, this.baseColor)
      onMouseMoveHandler(this, pickArea)()
    }
  }

  changeColor(baseColor) {
    this.baseColor = baseColor
    this.root.children[0].style.backgroundColor = this.baseColor
    setTargetColor(this)
  }
}

function setTargetColor(self, pickArea = null) {

    const pointerPosition = pickArea ? getClickXY(pickArea) : self.pointer.findPointer()
    const color = XY_TO_RGB(parseColor(self.baseColor), pointerPosition )
    pickArea && self.pointer.setPosition(pointerPosition)

    
    
    self.target.style.backgroundColor = color
    self.trig('colorChanged', color)
    

}

// function findPointer(self) {

//   const parent = getParent(self.pickPiont)
//   const Xcent = +self.pickPiont.style.right.slice(0, -2) / parent.width
//   const Ycent = +self.pickPiont.style.bottom.slice(0, -2) / parent.height
//   return { Xcent, Ycent }
// }


// function setPointerPosition(pickPiont, coord) {

//   const parent = getParent(pickPiont)

//   pickPiont.style.right = parent.width * coord.Xcent + 'px'
//   pickPiont.style.bottom = parent.height * coord.Ycent + 'px'
//   pickPiont.style.display = "block"

// }

// function getParent(child) {
//   return child.parentElement.getBoundingClientRect()

// }

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
