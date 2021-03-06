import { createDomNode } from "../common/functions.js"
import { Listener } from "../common/Listener.js"
import { InfoArea } from "../infoArea/InfoArea.js"
import { PickArea } from "../pickArea/PickArea.js"
import { RangeArea } from "../rangeArea/RangeArea.js"


export class ModalWindow extends Listener {
  constructor(target, trigger) {
    super([], null, trigger)
    this.components = [PickArea, RangeArea, InfoArea]
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

        this.on('pickArea:colorChanged', (color) => this.newColor = color )
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
    
    let modalWindow = createDomNode('div', 'colory-window')
    modalWindow.style = `left: ${screen.x}px; top: ${screen.y}px`
    
    self.components.forEach((Component)=>{
      let root = createDomNode('div', Component.className)
      let component = new Component(root, self)
          component.init()
          modalWindow.appendChild(root)
    })
  
  return modalWindow
}