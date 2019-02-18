import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
// Import directly to reduce bundle size
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Scene } from 'three/src/scenes/Scene';
import { Fog } from 'three/src/scenes/Fog';
import { Mesh } from 'three/src/objects/Mesh';
import { Vector3 } from 'three/src/math/Vector3';
import { Points } from 'three/src/objects/Points';
import { Geometry } from 'three/src/core/Geometry';
import { SphereBufferGeometry } from 'three/src/geometries/SphereGeometry';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { PointsMaterial } from 'three/src/materials/PointsMaterial';
import { CanvasTexture } from 'three/src/textures/CanvasTexture';

import points from './data';
import pools from '../../stores/pools';
import style from './globe.scss';

/*
 credits: https://codepen.io/Flamov/pen/MozgXb?editors=0010
*/

class Globe extends PureComponent {
  componentDidMount() {
    const { globeRadius } = this.props;

    this.scene = new Scene();
    this.scene.fog = new Fog(
      0x0f0c29,
      globeRadius * 1.6,
      globeRadius * 2.6 + globeRadius
    );

    this.camera = new PerspectiveCamera(60, 1, 1, 10000);
    this.camera.position.z = globeRadius * 2.5;

    this.addGlobe();

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.updateRendererSize();
    this.mount.appendChild(this.renderer.domElement);

    this.start();
  }

  componentDidUpdate(prevProps) {
    const { canvasWidth, canvasHeight } = this.props;

    if (
      prevProps.canvasWidth !== canvasWidth ||
      prevProps.canvasHeight !== canvasHeight
    ) {
      this.updateRendererSize();
    }
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  updateRendererSize = () => {
    const { canvasWidth, canvasHeight } = this.props;

    this.globe.position.y =
      Math.max(canvasWidth, canvasHeight) - Math.min(canvasWidth, canvasHeight);

    this.renderer.setSize(canvasWidth, canvasHeight);
    // keep ratio at 1 to avoid any distortion in scene objects
    this.renderer.setViewport(
      0,
      0,
      Math.max(canvasWidth, canvasHeight),
      Math.max(canvasWidth, canvasHeight)
    );
  };

  addGlobe = () => {
    const { globeRadius, canvasWidth, canvasHeight } = this.props;

    const geometry = new SphereBufferGeometry(globeRadius, 5, 5);
    const material = new MeshBasicMaterial({
      transparent: true,
      opacity: 0
    });

    this.globe = new Mesh(geometry, material);
    this.addGlobeDots();

    pools.data.forEach(pool => {
      this.addGlobePoolDot(pool);
    });

    this.globe.rotation.y = Math.random() * 360;
    this.globe.position.y =
      Math.max(canvasWidth, canvasHeight) - Math.min(canvasWidth, canvasHeight);
    this.scene.add(this.globe);
  };

  addGlobeDots = () => {
    const geometry = new Geometry();

    const canvasSize = 8;
    const halfSize = canvasSize / 2;
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = canvasSize;
    textureCanvas.height = canvasSize;
    const canvasContext = textureCanvas.getContext('2d');
    canvasContext.beginPath();
    canvasContext.arc(halfSize, halfSize, halfSize, 0, 2 * Math.PI);
    canvasContext.fillStyle = 'rgb(61, 137, 164)';
    canvasContext.fill();

    const texture = new CanvasTexture(textureCanvas);

    const material = new PointsMaterial({
      map: texture,
      size: 5
    });

    const addDot = (targetX, targetY) => {
      const result = this.returnSphericalCoordinates(targetY, targetX);
      const point = new Vector3(result.x, result.y, result.z);
      geometry.vertices.push(point);
    };

    points.forEach(point => {
      addDot(point[0], point[1]);
    });

    const globeDots = new Points(geometry, material);
    this.globe.add(globeDots);
  };

  addGlobePoolDot = pool => {
    const geometry = new SphereBufferGeometry(4, 12, 12);
    const material = new MeshBasicMaterial({ color: pool.color });
    const sphere = new Mesh(geometry, material);

    const result = this.returnSphericalCoordinates(
      pool.location_coordinate.y,
      pool.location_coordinate.x,
      false
    );

    sphere.position.set(result.x, result.y, result.z);

    this.globe.add(sphere);
  };

  returnSphericalCoordinates = (lat, long, transform = true) => {
    /*
      Reference: https://stackoverflow.com/a/28367325
    */
    const { globeRadius } = this.props;

    const latitude = transform ? (lat - 90) * -1 : lat;
    const longitude = transform ? long - 180 : long;

    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);

    const x = -(globeRadius * Math.sin(phi) * Math.cos(theta));
    const z = globeRadius * Math.sin(phi) * Math.sin(theta);
    const y = globeRadius * Math.cos(phi);

    return { x, z, y };
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    window.cancelAnimationFrame(this.frameId);
    this.frameId = undefined;
  };

  animate = timestamp => {
    this.globe.rotation.y += 0.001;
    this.globe.rotation.x = Math.cos(timestamp / 30000);
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    const { canvasWidth, canvasHeight } = this.props;
    return (
      <div
        style={{ width: canvasWidth, height: canvasHeight }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

Globe.propTypes = {
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  globeRadius: PropTypes.number.isRequired
};

const ResponsiveGlobe = () => (
  <div className={style.responsiveContainer}>
    <ReactResizeDetector handleWidth handleHeight>
      {(width, height) =>
        width ? (
          <Globe
            canvasWidth={width}
            canvasHeight={height}
            globeRadius={Math.max(width, height)}
          />
        ) : (
          <div />
        )
      }
    </ReactResizeDetector>
  </div>
);

export default ResponsiveGlobe;
