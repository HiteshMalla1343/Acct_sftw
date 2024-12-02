import React, { useState, useEffect } from "react";
import "../css/DraggableWindow.css";

const DraggableResizableWindow = ({ onClose, title, children, initialSize  }) => {
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 400, height: 300 });
  const [windowState, setWindowState] = useState({
    x: 200,
    y: 150,
    width: initialSize?.width || 400,
    height: initialSize?.height || 300,
    
  });

  // Dragging functionality
  const handleDragMouseDown = (e) => {
    setDragging(true);
    setDragStart({
      x: e.clientX - windowState.x,
      y: e.clientY - windowState.y,
    });
    document.body.classList.add('no-select');
  };

  const handleDragMouseMove = (e) => {
    if (dragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
  
      // Calculate boundaries
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
    document.body.classList.add('no-select');
  };
  

  const handleDragMouseUp = () => {
    setDragging(false);
    document.body.classList.add('no-select');
  };

  // Resizing functionality
  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    // setResizing(true);
    setResizeStart({
      width: windowState.width,
      height: windowState.height,
      x: e.clientX,
      y: e.clientY,
    });
    document.body.classList.add('no-select');
  };

  const handleResizeMouseMove = (e) => {
    if (resizing) {
      const newWidth = Math.max(200, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(150, resizeStart.height + (e.clientY - resizeStart.y));
  
      // Constrain dimensions within the screen boundaries
      const maxWidth = window.innerWidth - windowState.x; // Remaining width based on position
      const maxHeight = window.innerHeight - windowState.y; // Remaining height based on position
  
      setWindowState((prev) => ({
        ...prev,
        width: Math.min(newWidth, maxWidth),
        height: Math.min(newHeight, maxHeight),
      }));
    }
    document.body.classList.add('no-select');
  };
  

  const handleResizeMouseUp = () => {
    setResizing(false);
    document.body.classList.add('no-select');
  };

  useEffect(() => {
    if (dragging || resizing) {
      document.addEventListener("mousemove", dragging ? handleDragMouseMove : handleResizeMouseMove);
      document.addEventListener("mouseup", dragging ? handleDragMouseUp : handleResizeMouseUp);
    } else {
      document.removeEventListener("mousemove", dragging ? handleDragMouseMove : handleResizeMouseMove);
      document.removeEventListener("mouseup", dragging ? handleDragMouseUp : handleResizeMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", dragging ? handleDragMouseMove : handleResizeMouseMove);
      document.removeEventListener("mouseup", dragging ? handleDragMouseUp : handleResizeMouseUp);
    };
  }, [dragging, resizing]);

  return (
    <div
      className="draggable-resizable-window"
      style={{
        top: `${windowState.y}px`,
        left: `${windowState.x}px`,
        width: `${windowState.width}px`,
        height: `${windowState.height}px`,
      }}
    >
      <div
        className="window-header"
        onMouseDown={handleDragMouseDown}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        <span>{title || "Window"}</span>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="window-content">{children}</div>
      <div
        className="resize-handle"
        onMouseDown={handleResizeMouseDown}
      ></div>
    </div>
  );
};

export default DraggableResizableWindow;
