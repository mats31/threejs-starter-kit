import * as THREE from 'three';
import { randomFloat } from '../../../utils/math';
const glsl = require('glslify');
const vertexShader = glsl.file('./shaders/instanced.vs');
const fragmentShader = glsl.file('./shaders/instanced.fs');

export default class AbstractInstanced extends THREE.Object3D {
  constructor({
    nb = 20,
    geometry = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 ),
    material = false,
    depthMaterial = false,
    frustumCulled = false,
  } = {}) {
    super();

    this._nb = nb || 20;
    this._baseGeometry = geometry;
    this._material = material;
    this._frustumCulled = frustumCulled || false;

    this._setupGeometry();

    if (!this._material) {
      this._setupMaterial();
    }

    this._setupMesh(depthMaterial);
  }

  _setupGeometry() {
    this._geometry = new THREE.InstancedBufferGeometry();
    this._geometry.copy(this._baseGeometry);

    this.aPos = new THREE.InstancedBufferAttribute( new Float32Array( this._nb * 4 ), 4 ); // pos.xyz + alpha
    this.aScale = new THREE.InstancedBufferAttribute( new Float32Array( this._nb * 3 ), 3 ); // scale
    this.aOrientation = new THREE.InstancedBufferAttribute( new Float32Array( this._nb * 4 ), 4 );

    this._geometry.setAttribute( 'a_pos', this.aPos );
    this._geometry.setAttribute( 'a_scale', this.aScale );
    this._geometry.setAttribute( 'a_orientation', this.aOrientation );

    for ( let i = 0; i < this._nb; i++) {

      this.aPos.setXYZW( i, randomFloat( -10, 10 ), randomFloat( -10, 10 ), randomFloat( -10, 10 ), randomFloat( 0.2, 0.8 ) );

      this.aScale.setXYZ( i, 1, 1, 1 );

      const orientation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0);
      this.aOrientation.setXYZW( i, orientation.x, orientation.y, orientation.z, orientation.w );
    }
  }

  _setupMaterial() {
    this._material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {},
      vertexShader,
      fragmentShader,
    });
  }

  _setupMesh(depthMaterial) {
    this._mesh = new THREE.Mesh( this._geometry, this._material );
    this._mesh.frustumCulled = this._frustumCulled;

    if (depthMaterial) {
      this._mesh.depthMaterial = depthMaterial
    }

    this.add(this._mesh);
  }

  // Getters -------------------------------------------------------------------

  getAttribute(attr) {
    return this[attr];
  }

  setAttribute(attrName, attrArr) {
    this._geometry.addAttribute( attrName, attrArr );
  }
}
