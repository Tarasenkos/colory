export function createDomNode(nodeName, className = '', id = '') {
  let node = document.createElement(nodeName)
  className && node.classList.add(className)
  id && (node.id = (id))
  return node
}


export function getClickCoord() {

  let coord = {
    x: event.clientX,
    y: event.clientY
  }

  return coord
}

export function parceColor(string) {

  let RGB = string.slice(4, -1).split(', ')
  return {
    R: +RGB[0] || 0,
    G: +RGB[1] || 0,
    B: +RGB[2] || 0
  }
}

export function getBaseColor(self, color) {

  console.log('Входящий цвет:', color)
  let origRGB, RGB, R, G, B, baseColor

  RGB = parceColor(color)
  R = RGB.R
  G = RGB.G
  B = RGB.B

  if (R === G) {
    if (G === B) {
      baseColor = `rgb(255, 255, 255)`
      self.trig('rangeArea:setColor', baseColor)
      return baseColor
    }
  }
  
    origRGB = []

  origRGB.push(R)
  origRGB.push(G)
  origRGB.push(B)
  console.log('Цвет элемента: ', origRGB)

  let MaxEl, MinEl, MidEl, MaxId, MinId, MidId

  RGB = [...origRGB]

  MaxEl = Math.max(...RGB)
  MaxId = RGB.indexOf(MaxEl)
  RGB[MaxId] = 255

  MinEl = Math.min(...RGB)
  MinId = RGB.indexOf(MinEl)


  delete RGB[MaxId]
  delete RGB[MinId]

  MidEl = +RGB.filter(() => true)
  MidId = RGB.indexOf(MidEl)

  let posOfMin = MaxEl - MinEl

  MidEl = Math.round((MaxEl * (MidEl - MinEl) / posOfMin) * 255 / MaxEl) || MinEl
  MaxEl = 255
  MinEl = 0

  RGB[MinId] = MinEl
  RGB[MaxId] = MaxEl
  RGB[MidId] = MidEl

  baseColor = `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`
  console.log('Базовый цвет: ', baseColor)
  self.trig('rangeArea:setColor', baseColor)

  return baseColor
}