import { useCallback, useRef, useState } from "react";

export function useZoomPanDrag() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const clampPan = useCallback((x: number, y: number, z: number) => {
    const maxX = (z - 1) * (window.innerWidth * 0.425);
    const maxY = (z - 1) * (window.innerHeight * 0.4);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  }, []);

  const zoomAtDelta = useCallback(
    (deltaY: number, sensitivity: number) => {
      setZoom((z) => {
        const next = Math.min(5, Math.max(1, z - deltaY * sensitivity));
        setPan((p) => clampPan(p.x, p.y, next));
        return next;
      });
    },
    [clampPan]
  );

  const nativeWheelHandler = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const sensitivity = e.ctrlKey ? 0.012 : 0.001;
      zoomAtDelta(e.deltaY, sensitivity);
    },
    [zoomAtDelta]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom > 1) {
        setDragging(true);
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      }
    },
    [zoom, pan]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      setPan(clampPan(e.clientX - dragStart.x, e.clientY - dragStart.y, zoom));
    },
    [dragging, dragStart, zoom, clampPan]
  );

  const stopDragging = useCallback(() => setDragging(false), []);

  // ── Touch (mobile) ──
  const pinchStateRef = useRef<{
    startDist: number;
    startZoom: number;
  } | null>(null);
  const touchPanStartRef = useRef<{ x: number; y: number } | null>(null);

  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const panRef = useRef(pan);
  panRef.current = pan;

  const dist = (t1: Touch, t2: Touch) =>
    Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      touchPanStartRef.current = null;
      const [t1, t2] = [e.touches[0], e.touches[1]];
      pinchStateRef.current = {
        startDist: dist(t1, t2),
        startZoom: zoomRef.current
      };
    } else if (e.touches.length === 1) {
      pinchStateRef.current = null;
      const touch = e.touches[0];

      if (zoomRef.current > 1) {
        touchPanStartRef.current = {
          x: touch.clientX - panRef.current.x,
          y: touch.clientY - panRef.current.y
        };
      }
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStateRef.current) {
        e.preventDefault();
        const [t1, t2] = [e.touches[0], e.touches[1]];
        const newDist = dist(t1, t2);
        const { startDist, startZoom } = pinchStateRef.current;
        const next = Math.min(
          5,
          Math.max(1, startZoom * (newDist / startDist))
        );
        setZoom(next);
        setPan((p) => clampPan(p.x, p.y, next));
      } else if (e.touches.length === 1 && touchPanStartRef.current) {
        e.preventDefault();
        const touch = e.touches[0];
        setPan(
          clampPan(
            touch.clientX - touchPanStartRef.current.x,
            touch.clientY - touchPanStartRef.current.y,
            zoomRef.current
          )
        );
      }
    },
    [clampPan]
  );

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (e.touches.length < 2) pinchStateRef.current = null;
    if (e.touches.length === 0) touchPanStartRef.current = null;
  }, []);

  const targetElRef = useRef<HTMLElement | null>(null);
  const targetRef = useCallback(
    (el: HTMLElement | null) => {
      const prev = targetElRef.current;
      if (prev) {
        prev.removeEventListener("wheel", nativeWheelHandler);
        prev.removeEventListener("touchstart", handleTouchStart);
        prev.removeEventListener("touchmove", handleTouchMove);
        prev.removeEventListener("touchend", handleTouchEnd);
        prev.removeEventListener("touchcancel", handleTouchEnd);
      }
      targetElRef.current = el;
      if (el) {
        el.addEventListener("wheel", nativeWheelHandler, { passive: false });
        el.addEventListener("touchstart", handleTouchStart, {
          passive: false
        });
        el.addEventListener("touchmove", handleTouchMove, {
          passive: false
        });
        el.addEventListener("touchend", handleTouchEnd, { passive: false });
        el.addEventListener("touchcancel", handleTouchEnd, {
          passive: false
        });
      }
    },
    [nativeWheelHandler, handleTouchStart, handleTouchMove, handleTouchEnd]
  );

  return {
    zoom,
    pan,
    dragging,
    resetZoom,
    wheelRef: targetRef,
    handleMouseDown,
    handleMouseMove,
    stopDragging
  };
}
