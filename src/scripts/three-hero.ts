// src/scripts/three-hero.ts
// Three.js 3D Hero — Desktop Only (min-width: 1024px, hover, fine pointer, no reduced motion)

interface ThreeHeroConfig {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
}

export function initThreeHero(): void {
  // Find hero section and create canvas
  const heroSection = document.querySelector('#beranda') as HTMLElement;
  if (!heroSection) return;

  // Check if already initialized
  if (heroSection.querySelector('canvas.three-hero-canvas')) return;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.className = 'three-hero-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  
  // Insert at the beginning of hero section (behind text content)
  const heroContent = heroSection.querySelector('.relative.z-10');
  heroSection.insertBefore(canvas, heroContent);

  // Setup scene
  setupThreeScene(canvas);
}

function setupThreeScene(canvas: HTMLCanvasElement): void {
  // Dynamically import Three.js (separate chunk)
  import('three').then((THREE) => {
    initScene(canvas, THREE);
  }).catch((err) => {
    console.warn('[three-hero] Failed to load Three.js:', err);
    // Fallback: canvas stays hidden, CSS pattern shows
    canvas.style.display = 'none';
  });
}

function initScene(canvas: HTMLCanvasElement, THREE: typeof import('three')): void {
  // Canvas sizing
  const container = canvas.parentElement!;
  const dpr = Math.min(window.devicePixelRatio, 1.5);
  
  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(dpr);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = false; // Not needed for simple scene

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const aspect = container.clientWidth / container.clientHeight;
  const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
  camera.position.set(0, 0, 5);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffd700, 0.8);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  // Create 8-point star geometry (rub el hizb)
  function createStarGeometry(size: number, depth: number): THREE.ExtrudeGeometry {
    const shape = new THREE.Shape();
    const points = 8;
    const outerRadius = size;
    const innerRadius = size * 0.4;

    for (let i = 0; i < points * 2; i++) {
      const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();

    const extrudeSettings = {
      depth,
      bevelEnabled: false,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }

  // Material - gold with slight metalness
  const starMaterial = new THREE.MeshStandardMaterial({
    color: 0xC9A227,
    metalness: 0.3,
    roughness: 0.4,
  });

  // Create 3 stars
  const stars: THREE.Mesh[] = [];
  const positions = [
    { x: -1.5, y: 0.5, z: -0.5 },
    { x: 0, y: -0.3, z: 0 },
    { x: 1.5, y: 0.2, z: 0.3 },
  ];

  for (let i = 0; i < 3; i++) {
    const geometry = createStarGeometry(0.6, 0.1);
    geometry.center();
    const mesh = new THREE.Mesh(geometry, starMaterial);
    mesh.position.set(positions[i].x, positions[i].y, positions[i].z);
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    scene.add(mesh);
    stars.push(mesh);
  }

  // Animation state
  let animationId: number;
  let isVisible = true;
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;

  // Mouse parallax
  const handleMouseMove = (e: MouseEvent): void => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX = (e.clientX - centerX) / (rect.width / 2);
    mouseY = (e.clientY - centerY) / (rect.height / 2);
    
    targetRotationX = mouseY * 0.1; // ±0.1 rad
    targetRotationY = mouseX * 0.1;
  };

  container.addEventListener('mousemove', handleMouseMove);

  // IntersectionObserver for pause/resume - observe the container (hero section)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (!isVisible) {
          cancelAnimationFrame(animationId);
        } else {
          animate();
        }
      });
    },
    { rootMargin: '100px', threshold: 0 }
  );
  observer.observe(container);

  // Visibility change
  const handleVisibilityChange = (): void => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else if (isVisible) {
      animate();
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Resize handler
  let resizeTimeout: number;
  const handleResize = (): void => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }, 100);
  };
  window.addEventListener('resize', handleResize);

  // Animation loop
  function animate(): void {
    if (!isVisible || document.hidden) return;

    // Slow auto-rotation
    stars.forEach((star, i) => {
      star.rotation.x += 0.0005 * (i + 1);
      star.rotation.y += 0.0008 * (i + 1);
    });

    // Parallax lerp
    stars.forEach((star) => {
      star.rotation.x += (targetRotationX - star.rotation.x) * 0.05;
      star.rotation.y += (targetRotationY - star.rotation.y) * 0.05;
    });

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Cleanup function (attached to canvas for potential disposal)
  (canvas as any)._threeCleanup = () => {
    cancelAnimationFrame(animationId);
    container.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('resize', handleResize);
    observer.disconnect();
    
    // Dispose Three.js resources
    stars.forEach((star) => {
      star.geometry.dispose();
    });
    starMaterial.dispose();
    renderer.dispose();
  };
}