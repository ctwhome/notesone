<template>
  <h1>Canvas</h1>
  <div class="controls">
    <button id="add" @click="add">Add a triangle</button>
    <p>Zoom(alt+scroll) and Panning(alt+click) (in development)</p>
  </div>
  <!--  <div class="canvasWrapper">-->
  <canvas
    id="c"
    :width="windowWidth - 100"
    :height="windowHeight - 300"
    style="border:1px solid #CCC"
  ></canvas>
  <!--  </div>-->
</template>
<script>
// import { fabric } from 'fabric'

export default {
  data() {
    return {
      canvas: null
    };
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  computed: {
    windowWidth() {
      return window.innerWidth;
    },
    windowHeight() {
      return window.innerHeight;
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas("c");
    const circle = new fabric.Circle({
      radius: 20,
      fill: "green",
      left: 100,
      top: 100,
      opacity: 1
    });
    const triangle = new fabric.Triangle({
      width: 20,
      height: 30,
      fill: "blue",
      left: 50,
      top: 50
    });

    this.canvas.add(circle, triangle);

    this.canvas.on("mouse:down", function(opt) {
      var evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    this.canvas.on("mouse:move", function(opt) {
      if (this.isDragging) {
        console.log("🎹is dragging");
        var e = opt.e;
        var vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        fabric.requestRenderAll();
        fabric.lastPosX = e.clientX;
        fabric.lastPosY = e.clientY;
      }
    });
    this.canvas.on("mouse:up", function(opt) {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      console.log("🎹", opt);
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      this.selection = true;
    });
  },
  methods: {
    myEventHandler(e) {
      // your code for handling resize...
      console.log("🎹", e);
    },
    add: function() {
      const triangle = new fabric.Triangle({
        width: 20,
        height: 30,
        fill: "blue",
        left: 100,
        top: 50
      });

      this.canvas.add(triangle);
    }
  }
};
</script>
<style>
.canvasWrapper {
  width: 100%;
  height: 400px;
  overflow: scroll;
}
</style>
