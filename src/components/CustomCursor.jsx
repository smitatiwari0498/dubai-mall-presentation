import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const moveCursor = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animateCursor = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", moveCursor);

    animateCursor();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#c9a84c] bg-[#c9a84c]/10 mix-blend-difference pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
      />

      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#c9a84c] mix-blend-difference pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}