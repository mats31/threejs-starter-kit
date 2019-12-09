import * as THREE from 'three'
import Cube from './objects/Cube'
import Lines from './objects/Lines'
import Points from './example/3d/Points/Points'
import AbstractInstanced from './helpers/3d/Instanced/AbstractInstanced'

export default class Webgl {
  constructor( width, height ) {

    // this.cube = new Cube()
    // Stage3d.add( this.cube )

    this.lines = new Lines()
    Stage3d.add(this.lines)

    // this.abstractInstanced = new AbstractInstanced()
    // Stage3d.add(this.abstractInstanced)

    // this.points = new Points()
    // Stage3d.add(this.points)

    Stage3d.renderer.debug.checkShaderErrors = true
  }

  render() {
    // this.cube.update()
    this.lines.update()
    // this.abstractInstanced.update()

    Stage3d.renderer.setRenderTarget(null)
    Stage3d.renderer.render(Stage3d.scene, Stage3d.camera)
  }
}
