import React, { useState, useEffect, useRef } from "react";
import "../css/DraggableWindow.css";

const DraggableWindow = ({ onClose, title, children, initialSize, onFocus }) => {
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [windowState, setWindowState] = useState({
    x: 200,
    y: 150,
    width: initialSize?.width || 400,
    height: initialSize?.height || 300,
  });

  const windowRef = useRef(null);

  const handleDragMouseDown = (e) => {
    onFocus();
    setDragging(true);
    setDragStart({
      x: e.clientX - windowState.x,
      y: e.clientY - windowState.y,
    });
    document.body.classList.add("no-select");
  };

  const handleDragMouseMove = (e) => {
    if (dragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Constrain movement within screen boundaries
      const windowWidth = windowState.width;
      const windowHeight = windowState.height;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const constrainedX = Math.min(Math.max(0, newX), screenWidth - windowWidth);
      const constrainedY = Math.min(Math.max(0, newY), screenHeight - windowHeight);

      setWindowState((prev) => ({
        ...prev,
        x: constrainedX,
        y: constrainedY,
      }));
    }
  };

  const handleDragMouseUp = () => {
    setDragging(false);
    document.body.classList.remove("no-select");
  };

  useEffect(() => {
    if (dragging) {
      const handleMouseMove = (e) => handleDragMouseMove(e);
      const handleMouseUp = () => handleDragMouseUp();

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, dragStart, windowState]);

  return (
    <div
      ref={windowRef}
      className="draggable-resizable-window"
      onMouseDown={onFocus} // Focus when window is clicked
      style={{
        top: `${windowState.y}px`,
        left: `${windowState.x}px`,
        width: `${windowState.width}px`,
        height: `${windowState.height}px`,
        zIndex: initialSize.zIndex || 1,
      }}
    >
      <div
        className="window-header"
        onMouseDown={handleDragMouseDown}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        <span>{title}</span>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
};

DraggableWindow.defaultProps = {
  title: "Window",
  initialSize: { width: 400, height: 300 },
  onFocus: () => {}, // Default no-op function
};

export default DraggableWindow;
