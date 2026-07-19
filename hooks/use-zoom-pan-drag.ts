import { useCallback, useState } from "react";

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
    const maxX = (z - 1) * (window.innerWidth * 0.425); // 85vw / 2
    const maxY = (z - 1) * (window.innerHeight * 0.4); // 80vh / 2
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      setZoom((z) => {
        const next = Math.min(5, Math.max(1, z - e.deltaY * 0.001));
        setPan((p) => clampPan(p.x, p.y, next));
        return next;
      });
    },
    [clampPan]
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

  return {
    zoom,
    pan,
    dragging,
    resetZoom,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    stopDragging
  };
}
