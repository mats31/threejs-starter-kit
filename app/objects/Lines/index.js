import * as THREE from 'three'
import MeshLineGPU from '../../helpers/3d/MeshLineGPU'

export default class Lines extends THREE.Object3D {
  constructor() {
    super()

    this._setup()
  }

  _setup() {
    this._meshLineGPU = new MeshLineGPU({
      number: 10,
      divisions: 10,
    })

    this.add(this._meshLineGPU)
  }

  // Render ------

  update() {
    this._meshLineGPU.update()
  }
}