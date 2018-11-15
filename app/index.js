import Webgl from './Webgl'
import raf from 'raf'
import dat from 'dat-gui'
import 'gsap'

// webgl settings
const webgl = new Webgl( window.innerWidth, window.innerHeight )
document.body.appendChild( webgl.renderer.domElement )

// GUI settings
const gui = window.gui = new dat.GUI()

function resizeHandler() {
  webgl.resize( window.innerWidth, window.innerHeight )
}

function animate() {
  raf( animate )

  webgl.render()
}

// handle resize
window.addEventListener( 'resize', resizeHandler )

// let's play !
animate()
