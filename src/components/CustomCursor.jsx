import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    let animationFrame;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const renderCursor = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      animationFrame = requestAnimationFrame(renderCursor);
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    renderCursor();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Outer Circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#c9a84c] bg-[#c9a84c]/10 mix-blend-difference pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2"
        style={{
          willChange: "left, top",
        }}
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#c9a84c] mix-blend-difference pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2"
        style={{
          willChange: "left, top",
        }}
      />
    </>
  );
}