import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Handle, Position } from "@xyflow/react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faComment,
  faContactCard,
  faGripHorizontal,
  faHome,
  faMailBulk,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import NewNodeModal from "./NewNodeModal";
import { useFlow } from "@contexts/FlowContext";
import MenuModal from "./MenuModal";
import { useNavigate } from "react-router-dom";

export const NODE_LABELS = {
  start: "Start Point",
  welcome: "Bot Response",
  contact_us: "Contact Us",
  faq: "FAQ",
  fallback: "Default Fallback",
};

const BasicNode = ({
  isConnectable,
  source = "Right",
  target = "Left",
  start = false,
  type,
  id,
}) => {
  const label = NODE_LABELS[type];
  const { setType, trigger, contents } = useFlow();
  const [hover, setHover] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [menu, setMenu] = useState(false);
  const title = useMemo(() => contents[id]?.title || "", [contents, id]);

  const handleHover = useCallback(() => setHover(true), []);
  const handleClearHover = useCallback(() => setHover(false), []);

  const handleClickAdd = useCallback((e) => {
    e.stopPropagation();
    setNewOpen(true);
  }, []);

  const handleOpenMenu = useCallback(() => setMenu(true), []);

  return (
    <>
      <div
        className="w-full h-full ps-4 pe-8"
        onMouseOver={handleHover}
        onMouseLeave={handleClearHover}
      >
        {target && (
          <Handle
            type="target"
            position={Position[target]}
            isConnectable={isConnectable}
          />
        )}
        {source && (
          <Handle
            type="source"
            position={Position[source]}
            isConnectable={isConnectable}
          />
        )}
        <div
          className={clsx("flex justify-center font-bold", {
            "h-full items-center": !trigger[id],
          })}
        >
          {label}
        </div>
        {trigger[id] && (
          <div className="text-xs text-center">{trigger[id]}</div>
        )}

        {hover && (
          <div className="absolute top-0 -right-10 w-10 h-full flex justify-end items-center">
            <div
              className="w-8 h-8 bg-white rounded-full flex justify-center items-center cursor-pointer shadow-[0_0_8px_#0004]"
              onClick={handleClickAdd}
            >
              <FontAwesomeIcon icon={faPlus} color="#444" size="lg" />
            </div>
          </div>
        )}
        {(edit || hover) && !start && (
          <div
            className="absolute -top-12 right-0 h-12 text-[#666]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shadow-[0_0_8px_#0004] rounded-lg bg-white border">
              <EditName node={id} edit={edit} setEdit={setEdit} />
              {!edit && (
                <button
                  className="w-8 h-8 flex justify-center items-center border-s"
                  onClick={handleOpenMenu}
                >
                  <FontAwesomeIcon icon={faGripHorizontal} />
                </button>
              )}
            </div>
          </div>
        )}
        {title && !hover && !edit && !start && (
          <div className="absolute -top-6 right-0 h-6 text-[#777] text-xs font-semibold w-full flex justify-center">
            {title}
          </div>
        )}
      </div>
      {newOpen && <NewNodeModal parent={id} onClose={setNewOpen} />}
      {menu && <MenuModal parent={id} onClose={setMenu} />}
    </>
  );
};

const EditName = ({ node, edit, setEdit }) => {
  const { contents, setContents } = useFlow();
  const [originalTitle, setOriginalTitle] = useState("");
  const [title, setTitle] = useState("");

  const handleClickEdit = useCallback(() => setEdit(true), []);

  useEffect(() => {
    const _title = contents[node]?.title || "";
    setOriginalTitle(_title);
    setTitle(_title);
  }, [contents, node]);

  const handleChange = useCallback(
    ({ target: { value } }) => setTitle(value),
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (originalTitle !== title) {
        setContents({ ...contents, [node]: { ...contents[node], title } });
      }
      setEdit(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setContents, node, title, setEdit, originalTitle]);

  return (
    <>
      {!edit && (
        <button className="w-28" onClick={handleClickEdit}>
          Edit Name
        </button>
      )}
      {edit && (
        <input
          className="w-36 h-8 flex justify-center px-1 rounded-lg"
          value={title}
          onChange={handleChange}
        />
      )}
    </>
  );
};

const ToolTipModal = ({ onClick }) => {
  const modal = useRef(null);

  const [hover, setHover] = useState(false);

  const handleHover = useCallback(() => setHover(true), []);
  const handleClearHover = useCallback(() => setHover(false), []);

  const navigate = useNavigate();

  useEffect(() => {
    if (hover) return;
    const timer = setTimeout(() => {
      onClick(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [hover, onClick]);

  const handleClick = useCallback(() => onClick(false), [onClick]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modal.current && !modal.current.contains(event.target)) {
        onClick(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick]);

  return (
    <div
      className="bg-[#000d] w-60 absolute -top-8 -left-64 rounded flex flex-col gap-2 p-2 animate-fadeIn"
      onClick={handleClick}
      ref={modal}
      onMouseOver={handleHover}
      onMouseLeave={handleClearHover}
    >
      <div className="text-white text-sm">
        This module enables your chatbot to utilize the AI Knowledge...
      </div>
      <button
        className="bg-white rounded-lg px-2 py-1"
        onClick={() => navigate("/embeddings")}
      >
        Edit AI Knowledge
      </button>
    </div>
  );
};

const StartNode = ({ id, ...rest }) => {
  // const [showToolTip, setShowToopTip] = useState(false)
  // const handleClick = useCallback(
  //   () => setShowToopTip(!showToolTip),
  //   [showToolTip]
  // )

  return (
    <>
      <div
        className="bg-[#566e8a] text-white min-w-44 h-12 rounded-full shadow-[0_0_8px_#0004] flex items-center ps-6"
        // onClick={handleClick}
      >
        <FontAwesomeIcon icon={faHome} />
        <BasicNode id={id} target={null} start {...rest} />
      </div>
      {/* {showToolTip && <ToolTipModal onClick={setShowToopTip} />} */}
    </>
  );
};

const FaqNode = ({ id, ...rest }) => {
  // const [showToolTip, setShowToopTip] = useState(false)
  // const handleClick = useCallback(
  //   () => setShowToopTip(!showToolTip),
  //   [showToolTip]
  // )

  return (
    <>
      <div
        className="bg-[#797B8C] text-white min-w-44 h-12 rounded-full shadow-[0_0_8px_#0004] flex items-center ps-6"
        // onClick={handleClick}
      >
        <FontAwesomeIcon icon={faComment} />
        <BasicNode id={id} {...rest} />
      </div>
      {/* {showToolTip && <ToolTipModal onClick={setShowToopTip} />} */}
    </>
  );
};

const ContactNode = ({ id, ...rest }) => {
  const [showToolTip, setShowToopTip] = useState(false);
  const handleClick = useCallback(
    () => setShowToopTip(!showToolTip),
    [showToolTip],
  );

  return (
    <>
      <div
        className="bg-[#1D47EF] text-white min-w-44 h-12 rounded-full shadow-[0_0_8px_#0004] flex items-center ps-6"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faContactCard} />
        <BasicNode id={id} {...rest} />
      </div>
      {showToolTip && <ToolTipModal onClick={setShowToopTip} />}
    </>
  );
};

const WelcomeNode = ({ id, ...rest }) => {
  const { setMenuOpen } = useFlow();
  const handleClick = () => setMenuOpen(id);

  return (
    <div
      className="bg-white text-[#444] h-12 rounded-full shadow-[0_0_8px_#0004] flex items-center ps-6"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faPaperPlane} />
      <BasicNode id={id} {...rest} />
    </div>
  );
};

const FallbackNode = ({ id, ...rest }) => {
  const { setMenuOpen } = useFlow();
  const handleClick = () => setMenuOpen(id);

  return (
    <div
      className="bg-[#B3D6FF] text-[#444] h-12 rounded-full shadow-[0_0_8px_#0004] flex items-center ps-6"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faHome} />
      <BasicNode id={id} {...rest} />
    </div>
  );
};

export { StartNode, FaqNode, WelcomeNode, ContactNode, FallbackNode };
