import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position refs for 60fps smoothing without React state overhead
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktops/laptops with mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Fast check for interactive elements without expensive getComputedStyle reflows
      const target = e.target;
      const interactive = target && Boolean(
        target.closest('button, a, input, textarea, [role="button"], .cursor-pointer')
      );
      setIsHovered(interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation loop for trailing aura ring
    let rId;
    const animate = () => {
      // Dot follows immediately with micro-smoothing
      dotPos.current.x = mousePos.current.x;
      dotPos.current.y = mousePos.current.y;

      // Aura ring lags with smooth physics lerp
      const LERP = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * LERP;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * LERP;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rId = requestAnimationFrame(animate);
    };

    rId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rId) cancelAnimationFrame(rId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Trailing Aura Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-white pointer-events-none transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out will-change-transform
          ${isHovered 
            ? 'w-14 h-14 border-white/80 bg-white/15 shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
            : isClicking
            ? 'w-7 h-7 border-white/90 bg-white/20'
            : 'w-10 h-10 border-white/50 bg-transparent'
          }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Glowing White Custom Cursor Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-white pointer-events-none will-change-transform shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(255,255,255,0.4)] transition-[width,height,opacity] duration-150
          ${isHovered 
            ? 'w-2 h-2 opacity-90' 
            : isClicking 
            ? 'w-3 h-3 opacity-100 scale-90' 
            : 'w-2.5 h-2.5 opacity-100'
          }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
}
