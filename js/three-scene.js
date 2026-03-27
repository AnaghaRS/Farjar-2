/**
 * FARJAR V2 — Three.js Interactive Scene
 * Floating wireframe geometry + particles that react to mouse position.
 * Used on About/Services pages as meaningful interactive element.
 */
function createThreeScene(containerId, opts = {}) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return null;

  const {
    particleCount = 500,
    geometryType = 'icosahedron',
    interactive = true,
    rotationSpeed = 1,
  } = opts;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.z = 6;
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  const allowInteraction = interactive && supportsHover;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Main wireframe geometry
  let mainGeo;
  switch(geometryType) {
    case 'torus':     mainGeo = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16); break;
    case 'dodeca':    mainGeo = new THREE.DodecahedronGeometry(2, 0); break;
    default:          mainGeo = new THREE.IcosahedronGeometry(2, 1); break;
  }

  const wireframe = new THREE.WireframeGeometry(mainGeo);
  const mainMat = new THREE.LineBasicMaterial({
    color: 0xFF8402, transparent: true, opacity: 0.18,
  });
  const mainMesh = new THREE.LineSegments(wireframe, mainMat);
  scene.add(mainMesh);

  // Inner geometry
  const innerGeo = new THREE.IcosahedronGeometry(1.2, 0);
  const innerWire = new THREE.WireframeGeometry(innerGeo);
  const innerMat = new THREE.LineBasicMaterial({
    color: 0x99380B, transparent: true, opacity: 0.12,
  });
  const innerMesh = new THREE.LineSegments(innerWire, innerMat);
  scene.add(innerMesh);

  // Particles
  const pGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const c1 = new THREE.Color(0xFF8402);
  const c2 = new THREE.Color(0x99380B);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.5 + Math.random() * 2;
    positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);
    const mix = new THREE.Color().lerpColors(c1, c2, Math.random());
    colors[i*3] = mix.r; colors[i*3+1] = mix.g; colors[i*3+2] = mix.b;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.02, vertexColors: true, transparent: true, opacity: 0.35,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Mouse tracking
  let mouseX = 0, mouseY = 0;
  if (allowInteraction) {
    container.addEventListener('mousemove', e => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });
  }

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    const t = Date.now() * 0.0005;

    mainMesh.rotation.x = t * 0.08 * rotationSpeed + mouseY * 0.08;
    mainMesh.rotation.y = t * 0.06 * rotationSpeed + mouseX * 0.08;
    innerMesh.rotation.x = -t * 0.1 * rotationSpeed;
    innerMesh.rotation.y = -t * 0.08 * rotationSpeed;
    particles.rotation.y = t * 0.03 * rotationSpeed;
    particles.rotation.x = t * 0.015 * rotationSpeed;

    camera.position.x += (mouseX * 0.45 - camera.position.x) * 0.012;
    camera.position.y += (-mouseY * 0.45 - camera.position.y) * 0.012;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  // Resize
  const onResize = () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  };
  window.addEventListener('resize', onResize);

  return { scene, camera, renderer };
}
window.createThreeScene = createThreeScene;
