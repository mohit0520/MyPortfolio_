const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d", { alpha: true });

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

let t = 0;
const speed = 1.8;
const baseSize = 6;
const trailAlpha = 0.08;
const glowColor = "rgba(0,210,255,1)";
const innerColor = "rgba(180,255,255,0.95)";
const bgFade = `rgba(0,0,0,${trailAlpha})`;

function pointOnInfinity(t, w, h) {
  const a = w * 0.36;
  const b = h * 0.18;
  const x = 0.5 * w + a * Math.sin(t);
  const y = 0.5 * h + b * Math.sin(2 * t) * 0.5;
  return { x, y };
}

function animate() {
  ctx.fillStyle = bgFade;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  t += 0.02;
  const { x, y } = pointOnInfinity(
    t,
    canvas.width / (window.devicePixelRatio || 1),
    canvas.height / (window.devicePixelRatio || 1)
  );

  ctx.globalCompositeOperation = "lighter";

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, baseSize * 8);
  gradient.addColorStop(0, glowColor.replace("1)", "0.12)"));
  gradient.addColorStop(0.15, glowColor.replace("1)", "0.22)"));
  gradient.addColorStop(0.35, glowColor.replace("1)", "0.06)"));
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, baseSize * 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = innerColor;
  ctx.arc(x, y, baseSize, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = "rgba(0,210,255,0.6)";
  ctx.arc(x, y, baseSize * 2.6, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalCompositeOperation = "source-over";
  requestAnimationFrame(animate);
}
animate();

// App.js equivalent in vanilla JS

// Typing effect for the hero section
const typedText = document.getElementById('typed-text');
const strings = ['DevOps Engineer', 'Cloud Enthusiast', 'Automation Lover', 'Tech Explorer'];
let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentString = strings[stringIndex];
  if (isDeleting) {
    typedText.textContent = currentString.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = currentString.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentString.length) {
    isDeleting = true;
    setTimeout(typeWriter, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    stringIndex = (stringIndex + 1) % strings.length;
    setTimeout(typeWriter, 500);
  } else {
    setTimeout(typeWriter, isDeleting ? 40 : 60);
  }
}

// Start typing effect
typeWriter();