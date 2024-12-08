import { useFlow } from "@contexts/FlowContext";
import { faMailBulk, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";

const MenuModal = ({ parent, onClose }) => {
  const { setType, handleRemoteNode } = useFlow();
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

  const handleClick = () => {};

  const handleOpenSelectEmailModal = useCallback(
    () => setType(parent),
    [setType, parent],
  );

  const handleRemove = useCallback(
    () => handleRemoteNode(parent),
    [handleRemoteNode, parent],
  );

  return (
    <div
      className="absolute right-0 -top-12 w-40 flex flex-col bg-white text-[#444] rounded-lg shadow-[0_2px_8px_#0008] animate-fadeIn"
      ref={modal}
      onMouseOver={handleHover}
      onMouseLeave={handleClearHover}
    >
      <MenuItem
        title={"Set Mail"}
        onClick={handleOpenSelectEmailModal}
        icon={faMailBulk}
      />
      <MenuItem title={"Delete"} onClick={handleRemove} icon={faTrashCan} />
    </div>
  );
};

const MenuItem = ({ title, icon, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className="flex px-4 py-1 cursor-pointer hover:text-[#55F] items-center gap-2"
      onClick={handleClick}
    >
      <div className="w-6">
        <FontAwesomeIcon icon={icon} />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default MenuModal;
