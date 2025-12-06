// Nova Hub Interactive Background
// Original design with mouse interaction, no gradients

class InteractiveBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.grid = [];
    this.animationId = null;
    
    this.init();
  }

  init() {
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'interactive-bg';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '0';
    this.canvas.style.pointerEvents = 'none';
    document.body.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    
    // Create particles
    this.createParticles();
    this.createGrid();
    
    // Event listeners
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    
    // Start animation
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.createGrid();
  }

  createParticles() {
    const particleCount = 80;
    this.particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.getRandomColor()
      });
    }
  }

  getRandomColor() {
    const colors = [
      '#4a9eff', // Nova Hub Blue
      '#6bb3ff', // Light Blue
      '#3d7fcc', // Dark Blue
      '#5a9fff', // Bright Blue
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  createGrid() {
    this.grid = [];
    const cellSize = 100;
    const cols = Math.ceil(this.canvas.width / cellSize);
    const rows = Math.ceil(this.canvas.height / cellSize);
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        this.grid.push({
          x: x * cellSize,
          y: y * cellSize,
          size: cellSize,
          opacity: 0.03
        });
      }
    }
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    
    // Attract particles to mouse
    this.particles.forEach(particle => {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const force = (200 - distance) / 200;
        particle.vx += (dx / distance) * force * 0.02;
        particle.vy += (dy / distance) * force * 0.02;
      }
    });
  }

  updateParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -0.8;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -0.8;
      
      // Keep in bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      
      // Friction
      particle.vx *= 0.98;
      particle.vy *= 0.98;
    });
  }

  drawGrid() {
    this.ctx.strokeStyle = '#4a9eff';
    this.ctx.lineWidth = 1;
    
    this.grid.forEach(cell => {
      const dx = this.mouse.x - (cell.x + cell.size / 2);
      const dy = this.mouse.y - (cell.y + cell.size / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 300;
      
      if (distance < maxDist) {
        const opacity = (1 - distance / maxDist) * 0.15;
        this.ctx.globalAlpha = opacity;
        this.ctx.strokeRect(cell.x, cell.y, cell.size, cell.size);
      }
    });
    
    this.ctx.globalAlpha = 1;
  }

  drawParticles() {
    this.particles.forEach((particle, i) => {
      // Draw particle
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw connections
      this.particles.slice(i + 1).forEach(other => {
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.3;
          this.ctx.strokeStyle = particle.color;
          this.ctx.globalAlpha = opacity;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.stroke();
        }
      });
    });
    
    this.ctx.globalAlpha = 1;
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid
    this.drawGrid();
    
    // Update and draw particles
    this.updateParticles();
    this.drawParticles();
  }

  animate() {
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.novaHubBG = new InteractiveBackground();
  });
} else {
  window.novaHubBG = new InteractiveBackground();
}


