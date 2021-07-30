<template>
  <div class="overflow-auto ">
    <div>{{ text }}</div> {{ windowWidth }} - {{ windowHeight }}

    <div class="flex gap-2 items-center">
      <div class="btn btn-primary btn-sm" @click="undo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 7V16H11L7.37891 12.3789C8.76532 11.2116 10.5449 10.5 12.5 10.5C16.034 10.5 19.025 12.7947 20.084 15.9727L22.4512 15.1836C21.0622 11.0126 17.138 8 12.5 8C9.85397 8 7.44588 8.98632 5.60352 10.6035L2 7Z" fill="currentColor" />
        </svg>
      </div><div class="btn btn-primary btn-sm" @click="redo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 7L18.3848 10.6152C16.5429 8.99798 14.1457 8 11.5 8C6.862 8 2.93783 11.0126 1.54883 15.1836L3.43945 15.8125C4.56545 12.4365 7.745 10 11.5 10C13.592 10 15.4986 10.7671 16.9785 12.0215L13 16H22V7Z" fill="currentColor" />
        </svg>
      </div>

      <div class="btn btn-primary btn-sm" @click="zoomOut">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
        </svg>
      </div>
      <div class="btn btn-primary btn-sm" @click="zoomIn">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
      <div class="btn btn-primary btn-sm" @click="resetZoom">
        100%
      </div>
      <div class="tooltip" data-tip="B">
        <div class="btn btn-primary btn-sm" :class="{'bg-secondary':isDrawingMode, 'hover:bg-secondary-focus':isDrawingMode }" @click="toggleDrawingMode">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
      </div>
      <color-picker @on-color-change="changeColor" />

      <div class="tooltip" data-tip="⌫">
        <div class="btn btn-error btn-sm" :disabled="selectedItems <= 0" @click="deleteObjects">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <div class="w-3/4 ">
        <div class="relative bg-base-100 overflow-auto">
          <canvas
            id="design"
            :width="1500"
            :height="500"
            class="text-primary"
          />
          <!--        <canvas-->
          <!--          id="design"-->
          <!--          :width="windowWidth"-->
          <!--          :height="windowHeight-300"-->
          <!--          class=""-->
          <!--        />-->
        </div>
      </div>

      <div class="w-1/4">
        <canvas id="minimap" width="130" height="130" />
        Elements: {{ selectedItems }}
        <br>
        <input v-model="showStats" type="checkbox" class="checkbox">Show Stats
        <pre v-if="showStats" class=" text-xs overflow-auto" style="height: 800px">{{ canvasWidth }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { onKeyStroke } from '@vueuse/core'

import dataObjects from '~/canvas/dataObjects.js'

export default {
  name: 'Fabric',
  components: {
    // ColorPicker
  },
  data () {
    return {
      // color picker
      color: '#59c7f9',
      suckerCanvas: null,
      suckerArea: [],
      isSucking: false,

      selectedItems: 0,
      showStats: false,

      // redo  - undo
      isRedoing: false,
      h: [],

      // drawing Mode
      isDrawingMode: false,
      canvas: null,
      text: 'nothing here',
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      design: null,
      canvasWidth: null
    }
  },
  created () {
    window.addEventListener('resize', this.myEventHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.myEventHandler)
  },
  mounted () {
    onKeyStroke('b', (e) => {
      this.toggleDrawingMode()
    })

    onKeyStroke('Backspace', (e) => {
      e.preventDefault()
      this.deleteObjects()
    })

    fabric.Object.prototype.objectCaching = false

    const design = new fabric.Canvas('design', {
      containerClass: 'design',
      allowTouchScrolling: true
    })
    this.design = design

    const minimap = new fabric.Canvas('minimap', { containerClass: 'minimap', selection: false })

    design.loadFromJSON(dataObjects, function () {
      initMinimap()
      updateMiniMapVP()
    })

    // undo redo
    design.on('object:added', function () {
      if (!this.isRedoing) {
        this.h = []
      }
      this.isRedoing = false
    })
    if (design.freeDrawingBrush) {
      // brush.color = 'red'
      // if (brush.getPatternSrc) {
      //   brush.source = brush.getPatternSrc.call(brush)
      // }
      // brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
      // brush.shadow = new fabric.Shadow({
      //   blur: parseInt(drawingShadowWidth.value, 10) || 0,
      //   offsetX: 0,
      //   offsetY: 0,
      //   affectStroke: true,
      //   color: drawingShadowColorEl.value,
      // });
    }
    //
    // design.on({
    //   'touch:gesture' (e) {
    //     if (e.e.touches && e.e.touches.length === 2) {
    //       pausePanning = true
    //       const point = new fabric.Point(e.self.x, e.self.y)
    //       if (e.self.state === 'start') {
    //         zoomStartScale = self.canvas.getZoom()
    //       }
    //       const delta = zoomStartScale * e.self.scale
    //       self.canvas.zoomToPoint(point, delta)
    //       pausePanning = false
    //     }
    //   },
    //   'object:selected' () {
    //     pausePanning = true
    //   },
    //   'selection:cleared' () {
    //     pausePanning = false
    //   },
    //   'touch:drag' (e) {
    //     if (pausePanning == false && undefined != e.e.layerX && undefined != e.e.layerY) {
    //       currentX = e.e.layerX
    //       currentY = e.e.layerY
    //       xChange = currentX - lastX
    //       yChange = currentY - lastY
    //
    //       if ((Math.abs(currentX - lastX) <= 50) && (Math.abs(currentY - lastY) <= 50)) {
    //         const delta = new fabric.Point(xChange, yChange)
    //         canvas.relativePan(delta)
    //       }
    //
    //       lastX = e.e.layerX
    //       lastY = e.e.layerY
    //     }
    //   }
    // })

    function createCanvasEl () {
      const designSize = { width: 800, height: 600 }
      const originalVPT = design.viewportTransform
      // zoom to fit the design in the display canvas
      const designRatio = fabric.util.findScaleToFit(designSize, design)

      // zoom to fit the display the design in the minimap.
      const minimapRatio = fabric.util.findScaleToFit(design, minimap)

      const scaling = minimap.getRetinaScaling()

      const finalWidth = designSize.width * designRatio
      const finalHeight = designSize.height * designRatio

      design.viewportTransform = [
        designRatio, 0, 0, designRatio,
        (design.getWidth() - finalWidth) / 2,
        (design.getHeight() - finalHeight) / 2
      ]
      const canvas = design.toCanvasElement(minimapRatio * scaling)
      design.viewportTransform = originalVPT
      return canvas
    }

    function updateMiniMap () {
      const canvas = createCanvasEl()
      minimap.backgroundImage._element = canvas
      minimap.requestRenderAll()
    }

    function updateMiniMapVP () {
      const designSize = { width: 800, height: 600 }
      const rect = minimap.getObjects()[0]
      const designRatio = fabric.util.findScaleToFit(designSize, design)
      const totalRatio = fabric.util.findScaleToFit(designSize, minimap)
      const finalRatio = designRatio / design.getZoom()
      rect.scaleX = finalRatio
      rect.scaleY = finalRatio
      rect.top = minimap.backgroundImage.top - design.viewportTransform[5] * totalRatio / design.getZoom()
      rect.left = minimap.backgroundImage.left - design.viewportTransform[4] * totalRatio / design.getZoom()
      minimap.requestRenderAll()
    }

    function initMinimap () {
      const canvas = createCanvasEl()
      const backgroundImage = new fabric.Image(canvas)
      backgroundImage.scaleX = 1 / design.getRetinaScaling()
      backgroundImage.scaleY = 1 / design.getRetinaScaling()
      minimap.centerObject(backgroundImage)
      minimap.backgroundColor = 'white'
      minimap.backgroundImage = backgroundImage
      minimap.requestRenderAll()
      const minimapView = new fabric.Rect({
        top: backgroundImage.top,
        left: backgroundImage.left,
        width: backgroundImage.width / design.getRetinaScaling(),
        height: backgroundImage.height / design.getRetinaScaling(),
        fill: 'rgba(0, 0, 255, 0.3)',
        cornerSize: 6,
        transparentCorners: false,
        cornerColor: 'blue',
        strokeWidth: 0
      })
      minimapView.controls = {
        br: fabric.Object.prototype.controls.br
      }
      minimap.add(minimapView)
    }

    design.on('object:modified', function () {
      updateMiniMap()
    })

    // hook up the pan and zoom
    design.on('mouse:wheel', function (opt) {
      if (opt.e.altKey === true) {
        const delta = opt.e.deltaY
        let zoom = design.getZoom()
        zoom *= 0.999 ** delta
        if (zoom > 20) {
          zoom = 20
        }
        if (zoom < 0.01) {
          zoom = 0.01
        }
        this.setZoom(zoom)
        updateMiniMapVP()
        opt.e.preventDefault()
        opt.e.stopPropagation()
      }
    })
    design.on('mouse:down', function (opt) {
      const evt = opt.e
      if (evt.altKey === true || evt.metaKey === true) {
        this.isDragging = true
        this.selection = false
        this.lastPosX = evt.clientX
        this.lastPosY = evt.clientY
      }
    })
    design.on('mouse:move', function (opt) {
      if (this.isDragging) {
        const e = opt.e
        const vpt = this.viewportTransform
        vpt[4] += e.clientX - this.lastPosX
        vpt[5] += e.clientY - this.lastPosY
        this.requestRenderAll()
        updateMiniMapVP()
        this.lastPosX = e.clientX
        this.lastPosY = e.clientY
      }
    })
    const that = this
    design.on('mouse:up', function (opt) {
      that.canvasWidth = opt
      this.isDragging = false
      this.selection = true
      // design.backgroundColor = 'red'
      // const output = this.$refs.output

      // selected objects
      that.selectedItems = design.getActiveObjects().length
    })

    // ===============

    // Touch events
    design.on({
      'touch:gesture' () {
        this.text = ' Gesture '
      },
      'touch:drag' () {
        this.text = ' Dragging '
      },
      'touch:orientation' () {
        this.text = ' Orientation '
      },
      'touch:shake' () {
        this.text = ' Shaking '
      },
      'touch:longpress' () {
        this.text = ' Longpress '
      }
    })
  },
  methods: {
    changeColor (color) {
      console.log('🎹2', color)
      this.design.freeDrawingBrush.color = color
    },
    openSucker (isOpen) {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    },

    deleteObjects () {
      this.design.getActiveObjects().forEach((obj) => {
        // console.log('🔥️', this.design._objects, obj)
        // this.h.splice(this.design._objects.find(obj), 1)

        this.design.remove(obj)
      })
      this.design.discardActiveObject().renderAll()
      this.selectedItems = this.design.getActiveObjects().length
    },
    toggleDrawingMode () {
      this.isDrawingMode = !this.isDrawingMode
      this.design.isDrawingMode = this.isDrawingMode
      this.design.renderAll()
    },
    undo () {
      if (this.design._objects.length > 0) {
        this.h.push(this.design._objects.pop())
        this.design.renderAll()
      }
    },
    redo () {
      if (this.h.length > 0) {
        this.isRedoing = true
        this.design.add(this.h.pop())
      }
    },

    Copy () {
      // clone what are you copying since you
      // may want copy and paste on different moment.
      // and you do not want the changes happened
      // later to reflect on the copy.
      this.design.getActiveObject().clone(function (cloned) {
        _clipboard = cloned
      })
    },

    Paste () {
      // clone again, so you can do multiple copies.
      _clipboard.clone(function (clonedObj) {
        this.design.discardActiveObject()
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true
        })
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = this.design
          clonedObj.forEachObject(function (obj) {
            this.design.add(obj)
          })
          // this should solve the unselectability
          clonedObj.setCoords()
        } else {
          this.design.add(clonedObj)
        }
        _clipboard.top += 10
        _clipboard.left += 10
        this.design.setActiveObject(clonedObj)
        this.design.requestRenderAll()
      })
    },
    resetZoom () {
      this.design.setZoom(1)
    },
    zoomIn () {
      this.design.setZoom(this.design.getZoom() * 1.1)
    },
    zoomOut () {
      this.design.setZoom(this.design.getZoom() / 1.1)
    },
    myEventHandler (e) {
      // your code for handling resize...
      console.log('🎹', e)
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    add () {
      const triangle = new fabric.Triangle({
        width: 20,
        height: 30,
        fill: 'blue',
        left: 100,
        top: 50
      })
      this.canvas.add(triangle)
    }
  }
}
</script>

<style scoped>
.minimap {
  border: 1px solid blue;
  position: absolute !important;
  top: 20px;
  left: 20px;
}
.design {
  border: 1px solid black;
}
</style>
