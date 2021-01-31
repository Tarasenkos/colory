import { getClickCoord } from "./common/functions.js"
import { Trigger } from "./common/Trigger.js"
import {ModalWindow} from "./modal/modal.js"

export class Colory {
  constructor(className = '.colory') {
    this.nodes = document.querySelectorAll(className)
    this.init()
  }

  init() {
    let self = this
    this.nodes.forEach((node) => 
            node.addEventListener('mousedown', (self) =>this.onClick(self)))
  }

  onClick(self) {

    let target = self.target
    let trigger = new Trigger
    let modal = new ModalWindow(target, trigger)
    let coord = getClickCoord()
    
    modal.render(coord)
  }
 
}










