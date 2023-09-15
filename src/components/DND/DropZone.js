import React from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ data, onDrop }) => {
  const [{ canDrop }, drop] = useDrop({
    accept: ["component"],
    drop: (item, monitor) => {
      onDrop(data, item);
    },
    canDrop: (item, monitor) => {
      if (data.path === item.path) return false;
      return true;
    },

    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop;
  return (
    <div
      ref={drop}
      style={{
        height: "100%",
        position: "absolute",
        width: isActive ? "100%" : "",
        border: isActive ? "2px dashed black" : "",
        background: isActive ? "rgba(0, 0, 0, 0.1)" : "white",
        zIndex: isActive ? 1 : 0,
      }}
    />
  );
};
export default DropZone;
