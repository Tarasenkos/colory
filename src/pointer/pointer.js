import { createDomNode, parseColor } from "../common/functions.js";
import { Listener } from "../common/Listener.js";

export class Pointer extends Listener {

constructor(self, className){
  super([], self.root, self.trigger)
  this.color = self.color
  this.root = self.root
  this.nodeClassName = className
  this.node = createDomNode('div', this.nodeClassName)
  
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

  const parent = this.root.querySelector('#range').getBoundingClientRect()
  this.node.style.right = parent.width * coord.Xcent + 'px'
  this.node.style.bottom = parent.height * coord.Ycent + 'px'
  this.node.style.display = "block"

  console.log('setPosition', this.node)

  this.trig('pointer:newPosition', this.node.outerHTML )
  
}

findPointer() {

  const parent = this.root.querySelector('#range').getBoundingClientRect()
  const Xcent = +this.node.style.right.slice(0, -2) / parent.width
  const Ycent = +this.node.style.bottom.slice(0, -2) / parent.height
  return { Xcent, Ycent }
}

}