(window.webpackJsonp=window.webpackJsonp||[]).push([[0,7],{326:function(t,e,n){var content=n(332);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(61).default)("2219aab6",content,!0,{sourceMap:!1})},331:function(t,e,n){"use strict";n(326)},332:function(t,e,n){var o=n(60)((function(i){return i[1]}));o.push([t.i,"input[type=color]::-webkit-color-swatch{\n  border:none\n}",""]),o.locals={},t.exports=o},333:function(t,e,n){var content=n(350);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(61).default)("ef21bbb2",content,!0,{sourceMap:!1})},337:function(t,e,n){"use strict";n.r(e);var o={data:function(){return{color:"#e66465"}},methods:{changeColor:function(){this.$emit("on-color-change",this.color)}}},r=(n(331),n(20)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.color,expression:"color"}],staticClass:"rounded-full w-6 border-none",style:{background:t.color},attrs:{id:"head",type:"color"},domProps:{value:t.color},on:{change:t.changeColor,input:function(e){e.target.composing||(t.color=e.target.value)}}})])}),[],!1,null,null,null);e.default=component.exports},346:function(t,e){},347:function(t,e){},348:function(t,e){},349:function(t,e,n){"use strict";n(333)},350:function(t,e,n){var o=n(60)((function(i){return i[1]}));o.push([t.i,".minimap[data-v-3b8f1b17]{\n  border:1px solid #00f;\n  position:absolute!important;\n  top:20px;\n  left:20px\n}\n.design[data-v-3b8f1b17]{\n  border:1px solid #000\n}",""]),o.locals={},t.exports=o},358:function(t,e,n){"use strict";n.r(e);n(35);var o=n(341),r=n(359),l={version:"3.6.3",objects:[{type:"rect",version:"3.6.3",left:513,top:160,width:50,height:50,fill:"#8D476B",opacity:.8},{type:"circle",version:"3.6.3",left:174,top:166,width:100,height:100,fill:"#383881",opacity:.8,radius:50,startAngle:0,endAngle:6.283185307179586},{type:"triangle",version:"3.6.3",left:330,top:242,width:50,height:50,fill:"#C8EFF0",opacity:.8},{type:"line",version:"3.6.3",left:328,top:300,width:150,height:100,stroke:"#98D727",x1:-75,x2:75,y1:-50,y2:50},{type:"textbox",version:"3.6.3",lockScalingFlip:!0,lockRotation:!0,left:10,top:10,width:500,height:75.03,fill:"white",angle:0,text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ",fontSize:14,fontWeight:"",fontFamily:"helvetica",minWidth:20,splitByGrapheme:!1,styles:{}}]},c={name:"Fabric",components:{},data:function(){return{selectedItems:0,showStats:!1,isRedoing:!1,h:[],isDrawingMode:!1,canvas:null,windowWidth:window.innerWidth,windowHeight:window.innerHeight,design:null,canvasWidth:null}},created:function(){window.addEventListener("resize",this.myEventHandler)},destroyed:function(){window.removeEventListener("resize",this.myEventHandler)},mounted:function(){var t=this;Object(r.a)("b",(function(e){t.toggleDrawingMode()})),Object(r.a)("Backspace",(function(e){e.preventDefault(),t.deleteObjects()})),o.fabric.Object.prototype.objectCaching=!1;var e=new o.fabric.Canvas("design",{containerClass:"design",allowTouchScrolling:!0});this.design=e;var n=new o.fabric.Canvas("minimap",{containerClass:"minimap",selection:!1});function c(){var t={width:800,height:600},r=e.viewportTransform,l=o.fabric.util.findScaleToFit(t,e),c=o.fabric.util.findScaleToFit(e,n),d=n.getRetinaScaling(),h=t.width*l,f=t.height*l;e.viewportTransform=[l,0,0,l,(e.getWidth()-h)/2,(e.getHeight()-f)/2];var canvas=e.toCanvasElement(c*d);return e.viewportTransform=r,canvas}function d(){var t={width:800,height:600},rect=n.getObjects()[0],r=o.fabric.util.findScaleToFit(t,e),l=o.fabric.util.findScaleToFit(t,n),c=r/e.getZoom();rect.scaleX=c,rect.scaleY=c,rect.top=n.backgroundImage.top-e.viewportTransform[5]*l/e.getZoom(),rect.left=n.backgroundImage.left-e.viewportTransform[4]*l/e.getZoom(),n.requestRenderAll()}e.loadFromJSON(l,(function(){!function(){var canvas=c(),t=new o.fabric.Image(canvas);t.scaleX=1/e.getRetinaScaling(),t.scaleY=1/e.getRetinaScaling(),n.centerObject(t),n.backgroundColor="white",n.backgroundImage=t,n.requestRenderAll();var r=new o.fabric.Rect({top:t.top,left:t.left,width:t.width/e.getRetinaScaling(),height:t.height/e.getRetinaScaling(),fill:"rgba(0, 0, 255, 0.3)",cornerSize:6,transparentCorners:!1,cornerColor:"blue",strokeWidth:0});r.controls={br:o.fabric.Object.prototype.controls.br},n.add(r)}(),d()})),e.on("object:added",(function(){this.isRedoing||(this.h=[]),this.isRedoing=!1})),e.freeDrawingBrush,e.on("object:modified",(function(){var canvas;canvas=c(),n.backgroundImage._element=canvas,n.requestRenderAll()})),e.on("mouse:wheel",(function(t){if(!0===t.e.altKey){var n=t.e.deltaY,o=e.getZoom();(o*=Math.pow(.999,n))>20&&(o=20),o<.01&&(o=.01),this.setZoom(o),d(),t.e.preventDefault(),t.e.stopPropagation()}})),e.on("mouse:down",(function(t){var e=t.e;!0!==e.altKey&&!0!==e.metaKey||(this.isDragging=!0,this.selection=!1,this.lastPosX=e.clientX,this.lastPosY=e.clientY)})),e.on("mouse:move",(function(t){if(this.isDragging){var e=t.e,n=this.viewportTransform;n[4]+=e.clientX-this.lastPosX,n[5]+=e.clientY-this.lastPosY,this.requestRenderAll(),d(),this.lastPosX=e.clientX,this.lastPosY=e.clientY}}));var h=this;e.on("mouse:up",(function(t){h.canvasWidth=t,this.isDragging=!1,this.selection=!0,h.selectedItems=e.getActiveObjects().length})),e.on({"touch:gesture":function(){this.text=" Gesture "},"touch:drag":function(){this.text=" Dragging "},"touch:orientation":function(){this.text=" Orientation "},"touch:shake":function(){this.text=" Shaking "},"touch:longpress":function(){this.text=" Longpress "}})},methods:{changeColor:function(t){console.log("🎹2",t),this.design.freeDrawingBrush.color=t},openSucker:function(t){},deleteObjects:function(){var t=this;this.design.getActiveObjects().forEach((function(e){t.design.remove(e)})),this.design.discardActiveObject().renderAll(),this.selectedItems=this.design.getActiveObjects().length},toggleDrawingMode:function(){this.isDrawingMode=!this.isDrawingMode,this.design.isDrawingMode=this.isDrawingMode,this.design.renderAll()},undo:function(){this.design._objects.length>0&&(this.h.push(this.design._objects.pop()),this.design.renderAll())},redo:function(){this.h.length>0&&(this.isRedoing=!0,this.design.add(this.h.pop()))},Copy:function(){this.design.getActiveObject().clone((function(t){_clipboard=t}))},Paste:function(){_clipboard.clone((function(t){this.design.discardActiveObject(),t.set({left:t.left+10,top:t.top+10,evented:!0}),"activeSelection"===t.type?(t.canvas=this.design,t.forEachObject((function(t){this.design.add(t)})),t.setCoords()):this.design.add(t),_clipboard.top+=10,_clipboard.left+=10,this.design.setActiveObject(t),this.design.requestRenderAll()}))},resetZoom:function(){this.design.setZoom(1)},zoomIn:function(){this.design.setZoom(1.1*this.design.getZoom())},zoomOut:function(){this.design.setZoom(this.design.getZoom()/1.1)},myEventHandler:function(t){console.log("🎹",t),this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight},add:function(){var t=new o.fabric.Triangle({width:20,height:30,fill:"blue",left:100,top:50});this.canvas.add(t)}}},d=(n(349),n(20)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"overflow-auto "},[n("div",[t._v(t._s(t.windowWidth)+" - "+t._s(t.windowHeight))]),t._v(" "),n("div",{staticClass:"flex gap-2 items-center"},[n("div",{staticClass:"btn btn-primary btn-sm",on:{click:t.undo}},[n("svg",{attrs:{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M2 7V16H11L7.37891 12.3789C8.76532 11.2116 10.5449 10.5 12.5 10.5C16.034 10.5 19.025 12.7947 20.084 15.9727L22.4512 15.1836C21.0622 11.0126 17.138 8 12.5 8C9.85397 8 7.44588 8.98632 5.60352 10.6035L2 7Z",fill:"currentColor"}})])]),n("div",{staticClass:"btn btn-primary btn-sm",on:{click:t.redo}},[n("svg",{attrs:{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M22 7L18.3848 10.6152C16.5429 8.99798 14.1457 8 11.5 8C6.862 8 2.93783 11.0126 1.54883 15.1836L3.43945 15.8125C4.56545 12.4365 7.745 10 11.5 10C13.592 10 15.4986 10.7671 16.9785 12.0215L13 16H22V7Z",fill:"currentColor"}})])]),t._v(" "),n("div",{staticClass:"btn btn-primary btn-sm",on:{click:t.zoomOut}},[n("svg",{staticClass:"h-5 w-5",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"}})])]),t._v(" "),n("div",{staticClass:"btn btn-primary btn-sm",on:{click:t.zoomIn}},[n("svg",{staticClass:"h-5 w-5",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"}})])]),t._v(" "),n("div",{staticClass:"btn btn-primary btn-sm",on:{click:t.resetZoom}},[t._v("\n      100%\n    ")]),t._v(" "),n("div",{staticClass:"tooltip",attrs:{"data-tip":"B"}},[n("div",{staticClass:"btn btn-primary btn-sm",class:{"bg-secondary":t.isDrawingMode,"hover:bg-secondary-focus":t.isDrawingMode},on:{click:t.toggleDrawingMode}},[n("svg",{staticClass:"h-5 w-5",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"}})])])]),t._v(" "),n("color-picker",{on:{"on-color-change":t.changeColor}}),t._v(" "),n("div",{staticClass:"tooltip",attrs:{"data-tip":"⌫"}},[n("div",{staticClass:"btn btn-error btn-sm",attrs:{disabled:t.selectedItems<=0},on:{click:t.deleteObjects}},[n("svg",{staticClass:"h-5 w-5",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"}})])])])],1),t._v(" "),n("div",{staticClass:"flex gap-2"},[n("div",{staticClass:"w-3/4 "},[n("div",{staticClass:"relative bg-base-100 overflow-auto"},[n("canvas",{staticClass:"text-primary",attrs:{id:"design",width:1500,height:500}})])]),t._v(" "),n("div",{staticClass:"w-1/4"},[n("canvas",{attrs:{id:"minimap",width:"130",height:"130"}}),t._v("\n      Elements: "+t._s(t.selectedItems)+"\n      "),n("br"),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.showStats,expression:"showStats"}],staticClass:"checkbox",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.showStats)?t._i(t.showStats,null)>-1:t.showStats},on:{change:function(e){var n=t.showStats,o=e.target,r=!!o.checked;if(Array.isArray(n)){var l=t._i(n,null);o.checked?l<0&&(t.showStats=n.concat([null])):l>-1&&(t.showStats=n.slice(0,l).concat(n.slice(l+1)))}else t.showStats=r}}}),t._v("Show Stats\n      "),t.showStats?n("pre",{staticClass:" text-xs overflow-auto",staticStyle:{height:"800px"}},[t._v(t._s(t.canvasWidth))]):t._e()])])])}),[],!1,null,"3b8f1b17",null);e.default=component.exports;installComponents(component,{ColorPicker:n(337).default})}}]);