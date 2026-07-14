import { useCursor } from "../../hooks/useCursor";

export function CustomCursor() {
  const { cursorRef, glowRef } = useCursor();

  return (
    <>
      <div className="custom-cursor" id="custom-cursor" ref={cursorRef} />
      <div className="cursor-glow" id="cursor-glow" ref={glowRef} />
    </>
  );
}
