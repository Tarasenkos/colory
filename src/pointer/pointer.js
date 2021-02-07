import { createDomNode, getBaseColor, parseColor } from "../common/functions.js";
import { Listener } from "../common/Listener.js";

export class Pointer extends Listener {

constructor(self, className){
  super([], self.root, self.trigger)
  this.color = self.color
  this.root = self.root
  this.nodeClassName = className
  this.node = createDomNode('div', this.nodeClassName)
  this.trigger = self.trigger
  
}

render() {
  return this.node.outerHTML
}

getPosition(vertical = false) {

  if (vertical) return getVerticalPosition(this)

  const { RGB } = parseColor(this.color)
  const MaxEl = Math.max(...RGB)
  const MinEl = Math.min(...RGB)
  const Xcent = MinEl / MaxEl
  const Ycent = MaxEl / 255

  return { Xcent, Ycent }
}

setPosition(coord) {

  const parent = getParent(this)
  this.node.style.right = parent.width * coord.Xcent + 'px' || 0
  this.node.style.bottom = parent.height * coord.Ycent + 'px'
  this.node.style.display = "block"
  this.trig('pointer:newPosition')
  
}

findPointer() {

  const parent = getParent(this)
  const Xcent = +this.node.style.right.slice(0, -2) / parent.width || 0
  const Ycent = +this.node.style.bottom.slice(0, -2) / parent.height || 0
  return { Xcent, Ycent }
}

}

function getParent(self) {

  return self.root.querySelector('#range').getBoundingClientRect()

}

function getVerticalPosition(self){
  
  let Ycent
  const baseColor = getBaseColor(self, self.color)
  const {R, G, B} = parseColor(baseColor)

  const kY = 1/6

  if (G === 0) {
    if (B === 0) { Ycent = 0 }
    else { Ycent = kY * B / 255 + kY * (255 - R) / 255 }
  }

  else {
    Ycent = ( 2 * kY ) 
          + (kY * G / 255)
          + (kY * (255 - B) / 255 ) 
          + (kY * R / 255 ) 
    
    if (R === 255) {
      Ycent = (5 * kY) + (kY * (255 - G) / 255)
    }
  }
  

  Ycent = 1 - Ycent
  
  return { Xcent: 0, Ycent }
}