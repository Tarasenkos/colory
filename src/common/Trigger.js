export class Trigger {
  constructor() {
    this.events = {}
  }

  trig(eventName = '', arg = null) {
      if (!this.events[eventName]) {return false}
      this.events[eventName].forEach(fn => fn(arg))
  }
  
  subscribe(eventName, fn) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(fn)
  }

}