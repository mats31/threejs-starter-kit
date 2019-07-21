import * as THREE from 'three'
import Signals from './core/Signals'
import Webgl from './Webgl'
import Stage3d from './core/Stage3d'
import raf from 'raf'
import 'gsap'

// webgl settings
window.Stage3d = new Stage3d({
  alpha: true,
  antialias: true,
  autoClear: true,
  preserveDrawingBuffer: false,
  clearColor: 0x000000,
})
document.body.appendChild(window.Stage3d.getDOMElement())

const webgl = new Webgl( window.innerWidth, window.innerHeight )

function resizeHandler() {
  Signals.onResize.dispatch()
}

function animate() {
  raf( animate )

  webgl.render()
}

// handle resize
window.addEventListener( 'resize', resizeHandler )

// let's play !
animate()
