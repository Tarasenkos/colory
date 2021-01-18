import { getClickCoord } from "./common/functions.js"
import {ModalWindow} from "./modal/modal.js"

export class Colory {
  constructor(className = '.colory') {
    this.nodes = document.querySelectorAll(className)
    this.init()
  }

  init() {
    
    let self = this
    this.nodes.forEach((node) => 
            node.addEventListener('click', (self) =>this.onClick(self)))
  }

  onClick(self) {
    
    let target = self.target
    let modal = new ModalWindow(target)
    let coord = getClickCoord()
    
    modal.render(coord)
    
  }
 
}










