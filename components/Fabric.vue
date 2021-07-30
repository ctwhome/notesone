<template>
  <div class="overflow-auto ">
    <div>{{ text }}</div> {{ windowWidth }} - {{ windowHeight }}

    <p class="text-primary">
      test
    </p>
    <div class="btn btn-primary btn-sm" @click="zoomOut">
      -
    </div>
    <div class="btn btn-primary btn-sm" @click="zoomIn">
      +
    </div>
    <div class="btn btn-primary btn-sm" @click="resetZoom">
      100%
    </div>

    <code ref="output">N/A</code>
    <div class="flex">
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
        <canvas id="minimap" width="130" height="130" style="position: absolute; top: 10px; left: 10px;" />
      </div>
      <pre class="w-1/4 overflow-auto" style="height: 800px">{{ canvasWidth }}</pre>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import dataObjects from '~/canvas/dataObjects.js'

export default {
  name: 'Fabric',
  data () {
    return {
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
      console.log('🎹', evt)
      if (evt.metaKey === true) {
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
      // console.log('🎹', design.backgroundColor = 'red')
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
