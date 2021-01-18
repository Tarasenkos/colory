export class Listener {
 constructor(listeners, root, trigger) {
   this.listeners = listeners || []
   this.root = root
   this.trigger = trigger
   
 }

 addListener() {
   
  this.listeners.forEach((listener) => {
        let eventName = this.getEventName(listener)
        this[eventName] = this[eventName].bind(this)
        this.root.addEventListener(listener, this[eventName])
  })
}

 removeListener() {
  this.listeners.forEach((listener) => {
    this.root.removeEventListener(listener, this.onClick)
 } )

}

getEventName(listener) {
  return 'on' + this.upperCase(listener)
}

upperCase(listener){
  return listener[0].toUpperCase() + listener.slice(1)
  }


trig(eventName, arg){
  return this.trigger.trig(eventName, arg)

}  

on(eventName, fn) {
  return this.trigger.subscribe(eventName, fn)
}
}
