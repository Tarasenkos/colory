import { createDomNode, parseColor } from "../common/functions.js";
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

getPosition() {

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