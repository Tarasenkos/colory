


export function createDomNode(nodeName, className = '', id = '') {
  let node = document.createElement(nodeName)
  className && node.classList.add(className)
  id && (node.id = (id))
  return node
}

export function getClickXY(area, Xcoord = true) {

  const maxWidth = area.width
  const maxHeight = area.height

  let X = area.right - event.clientX
  let Y = area.bottom - event.clientY

  if (X > maxWidth) { X = maxWidth }
  if (X < 0) { X = 0 }
  if (Y > maxHeight) { Y = maxHeight }
  if (Y < 0) { Y = 0 }

  let Xcent = Xcoord ? (X / maxWidth) : 0
  let Ycent = Y / maxHeight

  return {
    Xcent, Ycent
  }
}


export function getClickCoord() {

  let coord = {
    x: event.clientX,
    y: event.clientY
  }

  return coord
}

export function parseColor(string) {

  let RGB = string.slice(4, -1).split(', ').map((el)=>+el)

  return {
    R: RGB[0] || 0,
    G: RGB[1] || 0,
    B: RGB[2] || 0,
    RGB
  }
}

export function getBaseColor(self, elementColor) {

  let RGB, R, G, B, baseColor

  R = parseColor(elementColor).R
  G = parseColor(elementColor).G
  B = parseColor(elementColor).B

  if (R === G) {
    if (G === B) {
      baseColor = `rgb(255, 255, 255)`
      self.trig('rangeArea:setColor', baseColor)
      return baseColor
    }
  }
  
  RGB = parseColor(elementColor).RGB

  let MaxEl, MinEl, MidEl, MaxId, MinId, MidId

  MaxEl = Math.max(...RGB)
  MaxId = RGB.indexOf(MaxEl)
  RGB[MaxId] = 255

  MinEl = Math.min(...RGB)
  MinId = RGB.indexOf(MinEl)


  delete RGB[MaxId]
  delete RGB[MinId]

  MidEl = +RGB.filter(() => true)
  MidId = RGB.indexOf(MidEl)

  let positionOfMin = MaxEl - MinEl

  MidEl = Math.round((MaxEl * (MidEl - MinEl) / positionOfMin) * 255 / MaxEl) || MinEl
  MaxEl = 255
  MinEl = 0

  RGB[MinId] = MinEl
  RGB[MaxId] = MaxEl
  RGB[MidId] = MidEl

  baseColor = `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`
  self.trig('rangeArea:setColor', baseColor)

  return baseColor
}