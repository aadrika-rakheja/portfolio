import React, { useEffect, useRef, useState } from 'react';

// Shortest path circular angular difference
function shortestAngleDiff(target, current) {
  let diff = (target - current) % (2 * Math.PI);
  if (diff > Math.PI) diff -= 2 * Math.PI;
  if (diff < -Math.PI) diff += 2 * Math.PI;
  return diff;
}

export default function CharacterCanvas({ onLoaded }) {
  const canvasRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // References to keep state across rAF cycles without React re-render overhead
  const imagesRef = useRef([]);
  const centerImageRef = useRef(null);

  // Mouse & Target Tracking
  const mousePosRef = useRef({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 });
  const isMouseActiveRef = useRef(false);
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const isInsideDeadzoneRef = useRef(true);

  // Preload all 64 WebP frames + center frame (all extracted strictly from video)
  useEffect(() => {
    let isCancelled = false;
    const totalFrames = 64;
    const loadedImages = new Array(totalFrames);
    let loadedCount = 0;

    const checkComplete = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / (totalFrames + 1)) * 100);
      setLoadProgress(pct);

      if (loadedCount === totalFrames + 1 && !isCancelled) {
        imagesRef.current = loadedImages;
        setIsReady(true);
        if (onLoaded) onLoaded();
      }
    };

    // Load 64 circular frames
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const filename = `/frames/frame_${String(i).padStart(2, '0')}.webp`;
      img.src = filename;
      img.onload = () => {
        loadedImages[i] = img;
        checkComplete();
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${filename}`);
        checkComplete();
      };
    }

    // Load center neutral frame (strictly video frame #212)
    const centerImg = new Image();
    centerImg.src = '/frames/center.webp';
    centerImg.onload = () => {
      centerImageRef.current = centerImg;
      checkComplete();
    };
    centerImg.onerror = () => {
      console.error('Failed to load center.webp');
      checkComplete();
    };

    return () => {
      isCancelled = true;
    };
  }, [onLoaded]);

  // Track cursor and touch events
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      isMouseActiveRef.current = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isMouseActiveRef.current = true;
      }
    };

    const handleMouseLeave = () => {
      isMouseActiveRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 60-120 FPS High-Performance Canvas Render Loop
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;

    // Fast, ultra-smooth response factor
    const LERP_FACTOR = 0.22;
    const IMG_WIDTH = 1280;
    const IMG_HEIGHT = 720;
    const IMG_ASPECT = IMG_WIDTH / IMG_HEIGHT;
    // Face center in frame coordinates: (640, 270)
    const FACE_NORM_X = 0.50;
    const FACE_NORM_Y = 0.375;

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      // Handle HiDPI / Retina Canvas Sizing
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
      }

      // Spacious responsive dimensions pinned gracefully to the bottom
      let scaleFactor = 0.74;
      if (width < 1024) scaleFactor = 0.68;

      let renderH = Math.min(height * scaleFactor, (width * 0.92) / IMG_ASPECT);
      let renderW = renderH * IMG_ASPECT;

      if (renderH < 320 && height > 380) {
        renderH = Math.min(360, height * 0.70);
        renderW = renderH * IMG_ASPECT;
      }

      const centerBias = width >= 1200 ? 0.56 : 0.50;
      let offsetX = (width - renderW) * centerBias;
      let offsetY = height - renderH;

      // Compute exact face center on screen
      const faceX = offsetX + renderW * FACE_NORM_X;
      const faceY = offsetY + renderH * FACE_NORM_Y;

      // Deadzone is proportional to her rendered face size (~18% of character height)
      const baseDeadzone = renderH * 0.18;
      const deadzoneEnter = baseDeadzone * 0.90;
      const deadzoneExit = baseDeadzone * 1.10;

      let dx = mousePosRef.current.x - faceX;
      let dy = mousePosRef.current.y - faceY;
      const dist = Math.hypot(dx, dy);

      // Smooth angle tracking
      if (dist > 10) {
        const targetAngle = Math.atan2(dy, dx);
        targetAngleRef.current = targetAngle;
        const diff = shortestAngleDiff(targetAngle, currentAngleRef.current);
        currentAngleRef.current += diff * LERP_FACTOR;
      }

      // Hysteresis deadzone switching to eliminate any boundary stutter
      let inDeadzone = isInsideDeadzoneRef.current;
      if (inDeadzone) {
        if (dist > deadzoneExit) {
          inDeadzone = false;
        }
      } else {
        if (dist < deadzoneEnter) {
          inDeadzone = true;
        }
      }
      isInsideDeadzoneRef.current = inDeadzone;

      let targetFrame;
      if (!isMouseActiveRef.current || inDeadzone) {
        // Center neutral pose directly looking at user
        targetFrame = centerImageRef.current || imagesRef.current[0];
      } else {
        // Normalize smoothed angle to [0, 2*PI)
        const normAngle = ((currentAngleRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        // Map to nearest frame index 0..63
        const frameIndex = Math.round((normAngle / (2 * Math.PI)) * 64) % 64;
        targetFrame = imagesRef.current[frameIndex] || centerImageRef.current;
      }

      // Seamless Background Fill matching exact video background hex #e70b07
      ctx.fillStyle = '#e70b07';
      ctx.fillRect(0, 0, width, height);

      // ZERO-GHOSTING: Draw EXACTLY ONE crisp frame at 100% opacity
      if (targetFrame && targetFrame.complete && targetFrame.naturalWidth > 0) {
        ctx.globalAlpha = 1.0;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(targetFrame, offsetX, offsetY, renderW, renderH);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isReady]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-[#e70b07]">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover'
        }}
      />

      {/* Sleek Minimalist Loading Screen */}
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e70b07] z-50 transition-opacity duration-700">
          <div className="flex flex-col items-center gap-4">
            <span className="font-cursive text-4xl md:text-5xl text-white script-shadow">
              Aadrika
            </span>
            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150 rounded-full"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-xs uppercase tracking-widest text-white/70 font-mono">
              Loading Experience {loadProgress}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
