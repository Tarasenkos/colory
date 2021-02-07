import { Listener } from "../common/Listener"

export class InfoArea extends Listener {
  static className = 'colory-info'
  constructor(root, self) {
    super([], root, self.trigger )
    this.root = root

  }

  init() {
    this.root.innerHTML = this.getHTML()
    this.on('pickArea:colorChanged', (color) => {
      this.root.innerHTML = this.getHTML(color)})
  }

  getHTML(color) {
    console.log(color)
    return `<div class="colory-info-area">
            ${color}
            </div>`


  }
} 