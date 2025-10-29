/**
 * Galaxy Background Animation
 * 
 * Creates an animated starfield background with a zoom parallax effect.
 * Stars move automatically without mouse interaction.
 */

// ============================================
// Configuration Constants
// ============================================

// Calculate star count based on viewport size
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;

// Velocity damping factors
const VELOCITY_DAMPING = 0.96;
const VELOCITY_INTERPOLATION = 0.07;
const BASE_VELOCITY_Z = 0.0005;

// ============================================
// Canvas Setup
// ============================================

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Canvas dimensions and scaling
let scale = 1; // Device pixel ratio
let width;
let height;

// ============================================
// Star Management
// ============================================

let stars = [];

// Pointer position tracking
let pointerX = 0;
let pointerY = 0;

// Velocity state
let velocity = {
  x: 0,    // Current x velocity
  y: 0,    // Current y velocity
  tx: 0,   // Target x velocity
  ty: 0,   // Target y velocity
  z: BASE_VELOCITY_Z // Z-axis zoom velocity
};

let touchInput = false;

// ============================================
// Initialization
// ============================================

/**
 * Initialize the animation
 */
function init() {
  generateStars();
  resize();
  setupEventListeners();
  step();
}

/**
 * Generate initial star field
 */
function generateStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
    });
  }
}

/**
 * Place a star at random position within canvas bounds
 * @param {Object} star - Star object to place
 */
function placeStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
}

/**
 * Recycle a star that has moved out of bounds
 * Places it back at an appropriate edge based on movement direction
 * @param {Object} star - Star object to recycle
 */
function recycleStar(star) {
  let direction = 'z'; // Default: random position

  const vx = Math.abs(velocity.x);
  const vy = Math.abs(velocity.y);

  // Determine recycling direction based on velocity
  if (vx > 1 || vy > 1) {
    let axis;

    if (vx > vy) {
      axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
    } else {
      axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
    }

    if (axis === 'h') {
      direction = velocity.x > 0 ? 'l' : 'r'; // left or right
    } else {
      direction = velocity.y > 0 ? 't' : 'b'; // top or bottom
    }
  }

  // Reset star scale
  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

  // Position star based on direction
  switch (direction) {
    case 'z':
      // Random position with low scale
      star.z = 0.1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
      break;
    case 'l': // Left edge
      star.x = -OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
      break;
    case 'r': // Right edge
      star.x = width + OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
      break;
    case 't': // Top edge
      star.x = width * Math.random();
      star.y = -OVERFLOW_THRESHOLD;
      break;
    case 'b': // Bottom edge
      star.x = width * Math.random();
      star.y = height + OVERFLOW_THRESHOLD;
      break;
  }
}

/**
 * Handle window resize and recalculate canvas dimensions
 */
function resize() {
  scale = window.devicePixelRatio || 1;

  width = window.innerWidth * scale;
  height = window.innerHeight * scale;

  canvas.width = width;
  canvas.height = height;

  // Reposition all stars
  stars.forEach(placeStar);
}

/**
 * Setup event listeners (resize only - no mouse/touch interaction)
 */
function setupEventListeners() {
  window.addEventListener('resize', resize);
  // Mouse and touch interactions disabled for non-interactive animation
}

/**
 * Handle mouse movement
 * @param {MouseEvent} event - Mouse event object
 */
function onMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  pointerX = event.clientX - rect.left;
  pointerY = event.clientY - rect.top;

  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate target velocity based on mouse position relative to center
  velocity.tx = (pointerX - centerX) * 0.001;
  velocity.ty = (pointerY - centerY) * 0.001;

  touchInput = false;
}

/**
 * Handle touch movement
 * @param {TouchEvent} event - Touch event object
 */
function onTouchMove(event) {
  event.preventDefault();
  touchInput = true;

  const rect = canvas.getBoundingClientRect();
  const touch = event.touches[0];

  pointerX = touch.clientX - rect.left;
  pointerY = touch.clientY - rect.top;

  const centerX = width / 2;
  const centerY = height / 2;

  velocity.tx = (pointerX - centerX) * 0.001;
  velocity.ty = (pointerY - centerY) * 0.001;
}

/**
 * Handle mouse/touch leave - reset velocity
 */
function onMouseLeave() {
  velocity.tx = 0;
  velocity.ty = 0;
}

/**
 * Main animation loop
 */
function step() {
  context.clearRect(0, 0, width, height);

  update();
  render();

  requestAnimationFrame(step);
}

/**
 * Update star positions and velocity
 */
function update() {
  // No mouse interaction - keep velocity at zero
  velocity.x = 0;
  velocity.y = 0;
  velocity.tx = 0;
  velocity.ty = 0;

  // Update each star
  stars.forEach((star) => {
    // Move star based on velocity and its depth
    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;

    // Apply zoom effect (stars move away from center)
    star.x += (star.x - width / 2) * velocity.z * star.z;
    star.y += (star.y - height / 2) * velocity.z * star.z;
    star.z += velocity.z;

    // Recycle stars that have moved out of bounds
    if (
      star.x < -OVERFLOW_THRESHOLD ||
      star.x > width + OVERFLOW_THRESHOLD ||
      star.y < -OVERFLOW_THRESHOLD ||
      star.y > height + OVERFLOW_THRESHOLD
    ) {
      recycleStar(star);
    }
  });
}

/**
 * Render all stars to the canvas
 */
function render() {
  stars.forEach((star) => {
    // No tail effect without mouse interaction
    const finalTailX = 0;
    const finalTailY = 0;

    // Set star appearance
    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    
    // Random opacity for twinkling effect
    const opacity = (100 + 100 * Math.random()) / 255;
    context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;

    // Draw star trail
    context.moveTo(star.x, star.y);
    context.lineTo(star.x + finalTailX, star.y + finalTailY);
    context.stroke();
  });
}

// ============================================
// Start Animation
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
