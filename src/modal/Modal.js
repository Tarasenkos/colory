import { createDomNode } from "../common/functions.js"
import { Listener } from "../common/Listener.js"
import { PickArea } from "../pickArea/PickArea.js"
import { RangeArea } from "../rangeArea/RangeArea.js"


export class ModalWindow extends Listener {
  constructor(target, trigger) {
    super([], null, trigger)
    this.components = [PickArea, RangeArea]
    this.target = target
    this.trigger = trigger
    this.color = window.getComputedStyle(this.target).backgroundColor 
    this.newColor = this.color
    
  }

  render(coord) {
    
    let modal = createDomNode('div', 'colory-modal', 'colory-modal')
        modal.appendChild(createModalWindow(this, coord))
        
        document.body.appendChild(modal)
        modal.addEventListener('mousedown', ()=> this.destroy(modal))

        this.on('colorChanged', (color) => this.newColor = color )
        this.on('modalClosed', () => console.log('Установлен цвет', this.newColor))
  }

  destroy(modal) {
    
    if (event.target.id === 'colory-modal') {
      this.trig('modalClosed')
      modal.removeEventListener('mousedown', ()=> this.destroy(modal))
      document.body.removeChild(modal)
      modal = null
    }
  }
}

function createModalWindow(self, screen) {
    
    let domNode = createDomNode('div', 'colory-window')
        domNode.style = `left: ${screen.x}px; top: ${screen.y}px`
    
    self.components.map((Component)=>{
      let root = createDomNode('div', Component.className)
      let component = new Component(root, self)
          component.init(root)
          domNode.appendChild(root)
    })
  
  return domNode
}