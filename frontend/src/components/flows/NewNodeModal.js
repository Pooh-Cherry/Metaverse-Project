import { useFlow } from "@contexts/FlowContext";
import React, { useCallback, useEffect, useRef, useState } from "react";

function generateRandomId(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

const NewNodeModal = ({ parent, onClose }) => {
  const { nodes, setNodes, edges, setEdges } = useFlow();
  const modal = useRef(null);

  const [hover, setHover] = useState(false);

  const handleHover = useCallback(() => setHover(true), []);
  const handleClearHover = useCallback(() => setHover(false), []);

  useEffect(() => {
    if (hover) return;
    const timer = setTimeout(() => {
      onClose(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [hover, onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modal.current && !modal.current.contains(event.target)) {
        onClose(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClick = (type) => {
    const id = generateRandomId();
    const _parent = nodes.find(({ id }) => id === parent);
    if (_parent) {
      const newNode = {
        id,
        type,
        position: { x: _parent.position.x + 300, y: _parent.position.y },
        data: {},
      };
      setNodes([...nodes, newNode]);
      setEdges([
        ...edges,
        { id: generateRandomId(), source: parent, target: id },
      ]);
    }

    onClose(false);
  };

  return (
    <div
      className="absolute -right-64 -top-8 w-60 flex flex-col bg-white text-[#444] rounded-lg shadow-[0_2px_8px_#0008] animate-fadeIn"
      ref={modal}
      onMouseOver={handleHover}
      onMouseLeave={handleClearHover}
    >
      <NewItem title={"Bot response"} type={"welcome"} onClick={handleClick} />
      <NewItem title={"Contact Us"} type={"contact_us"} onClick={handleClick} />
      <NewItem
        title={"Default Fallback"}
        type={"fallback"}
        onClick={handleClick}
      />
      <NewItem title={"FAQ"} type={"faq"} onClick={handleClick} />
    </div>
  );
};

const NewItem = ({ title, icon, type, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(type);
  };

  return (
    <div
      className="flex px-4 py-2 cursor-pointer hover:text-[#55F]"
      onClick={handleClick}
    >
      <span>{title}</span>
    </div>
  );
};

export default NewNodeModal;
