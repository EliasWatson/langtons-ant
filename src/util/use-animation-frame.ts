import { useEffect, useRef } from "react";

export function useAnimationFrame(onFrame: () => void): void {
  const callbackRef = useRef(onFrame);
  callbackRef.current = onFrame;

  useEffect(() => {
    let animationFrameId: number;

    function animate() {
      callbackRef.current();
      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
}
