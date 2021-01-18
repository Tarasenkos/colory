import { createDomNode } from "../common/functions.js"
import { Trigger } from "../common/Trigger.js"
import { PickArea } from "../pickArea/PickArea.js"
import { RangeArea } from "../rangeArea/RangeArea.js"


export class ModalWindow {
  constructor(target) {
    this.components = [PickArea, RangeArea]
    this.target = target
    this.trigger = new Trigger
    this.color = window.getComputedStyle(this.target).backgroundColor //target.style.backgroundColor || 'rgb(255, 255, 255)'
    
  }

    

  render(coord) {
    
    let modal = createDomNode('div', 'colory-modal', 'colory-modal')
        modal.appendChild(createModalWindow(this, coord))
        
        document.body.appendChild(modal)
        modal.addEventListener('click', ()=> this.destroy(modal))
  }

  destroy(modal) {
    if (event.target.id === 'colory-modal') {
      document.body.removeChild(modal)
      modal = null
    }
    
  }

}

function createModalWindow(self, coord) {
    
    let domNode = createDomNode('div', 'colory-window')
        domNode.style = `left: ${coord.x}px; top: ${coord.y}px`
    
    self.components.map((Component)=>{
      let root = createDomNode('div', Component.className)
      let component = new Component(root, self)
          component.init(root)
  
          domNode.appendChild(root)
    })
  
  return domNode
}