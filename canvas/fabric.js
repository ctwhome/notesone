import fabric from 'fabrik'

const canvas = new fabric.Canvas('c3')
canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }))

canvas.item(0).set({
  borderColor: 'red',
  cornerColor: 'green',
  cornerSize: 6,
  transparentCorners: false
})
canvas.setActiveObject(canvas.item(0))
this.__canvases.push(canvas)
