import { getClickCoord } from "./common/functions.js"
import { Trigger } from "./common/Trigger.js"
import {ModalWindow} from "./modal/modal.js"

export class Colory {
  constructor(className = '.colory') {
    this.nodes = document.querySelectorAll(className)
    this.init()
  }

  init() {
    this.nodes.forEach((node) => 
            node.addEventListener('mousedown', this.onMouseDown))
  }

  onMouseDown(event) {
    
    let target = event.target
    let trigger = new Trigger
    let modal = new ModalWindow(target, trigger)
    let coord = getClickCoord()
    
    trigger.subscribe('pickArea:colorChanged', (color) => {
      target.style.backgroundColor = color 
    })

    modal.render(coord)
  }

}