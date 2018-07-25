attribute vec4 a_pos;
attribute vec3 a_scale;
attribute vec4 a_orientation;

varying vec2 vUv;
varying float vAlpha;

mat3 rotAxis(vec3 axis, float a) {
  float s=sin(a);
  float c=cos(a);
  float oc=1.0-c;
  vec3 as=axis*s;
  mat3 p=mat3(axis.x*axis,axis.y*axis,axis.z*axis);
  mat3 q=mat3(c,-as.z,as.y,as.z,c,-as.x,-as.y,as.x,c);

  return p*oc+q;
}

void main() {

  vec3 pos = a_pos.xyz;

  vec4 orientation = a_orientation;

  mat3 rotation = rotAxis(orientation.xyz, orientation.a);

  vec4 viewModelPosition = modelViewMatrix * vec4(position * a_scale * rotation + pos, 1.0);
  gl_Position = projectionMatrix * viewModelPosition;

  vUv = uv;
  vAlpha = a_pos.w;
}
