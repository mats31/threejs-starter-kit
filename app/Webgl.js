import * as THREE from 'three'
import Cube from './objects/Cube'
import Lines from './objects/Lines'

export default class Webgl {
  constructor( width, height ) {

    this.cube = new Cube()
    // Stage3d.add( this.cube )

    this.lines = new Lines()
    Stage3d.add(this.lines)
  }

  render() {
    this.cube.update()
    this.lines.update()

    Stage3d.renderer.setRenderTarget(null)
    Stage3d.renderer.render(Stage3d.scene, Stage3d.camera)
  }
}
