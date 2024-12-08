import { useFlow } from "@contexts/FlowContext";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NODE_LABELS } from "./NodeItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faGrip,
  faGripVertical,
  faHandDots,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { AddTrigger } from "../../apis";
import { SERVER_ADDRESS } from "@constants/config";

const RightSidePanel = ({ open }) => {
  const modal = useRef(null);
  const { nodes, setMenuOpen, contents, setContents } = useFlow();
  const [node, setNode] = useState(null);
  const [show, setShow] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");

  const onClose = useCallback(() => {
    const timer = setTimeout(() => {
      setMenuOpen(null);
    }, 300);
    return () => clearTimeout(timer);
  }, [setMenuOpen]);

  useEffect(() => {
    const node = nodes.find(({ id }) => id === open);
    setNode(node);
    setTitle(contents[open]?.title || "");
    setContent(contents[open]?.content || "");
    const fullURL = SERVER_ADDRESS + "/" + contents[open]?.file || "";
    const lastSegment = fullURL.substring(fullURL.lastIndexOf("/") + 1);
    setUrl(lastSegment);
  }, [open, nodes, contents]);

  const handleClose = useCallback(() => {
    setShow(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modal.current && !modal.current.contains(event.target)) {
        setShow(false);
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleTitleChange = useCallback(
    ({ target: { value } }) => setTitle(value),
    [],
  );

  const handleSave = async () => {
    let file_path = "";
    const node = nodes.find(({ id }) => id === open);
    const response = await AddTrigger(node?.type, title, content, file);
    if (response["file_path"]) {
      file_path = response["file_path"];
    }
    setContents({
      ...contents,
      [open]: { ...contents[open], title, content, file: file_path },
    });
    setShow(false);
    onClose();
  };

  const handleFileChange = async ({ target: { files: newfiles } }) => {
    const file = newfiles[0];
    setFile(file);
  };

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-screen h-screen bg-[#0003] animate-fadeIn",
        { "animate-fadeOut": !show },
      )}
    >
      <div
        className={clsx(
          "absolute top-24 right-4 w-96 rounded-lg shadow-[0_2px_8px_#0008] animate-right-modal-in",
          { "animate-right-modal-out": !show },
        )}
        ref={modal}
      >
        <div className="flex flex-col p-6 gap-4 bg-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm text-[#444] font-bold">
              {node && NODE_LABELS[node.type]}
            </div>
            <div className="flex gap-1">
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-sm bg-[#0002]"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
              <button
                onClick={handleSave}
                className="w-8 h-8 rounded-sm bg-[#0002]"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Type block title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-[#1111] focus:bg-white"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex flex-col rounded-b-lg">
          <TextContent content={content} setContent={setContent} />
        </div>
        <div className="flex items-center justify-center w-full px-6 py-8">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {!file && !url ? (
                <>
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    width="64"
                    height="64"
                  >
                    <path
                      d="M12 2h28l16 16v44c0 2.21-1.79 4-4 4H12c-2.21 0-4-1.79-4-4V6c0-2.21 1.79-4 4-4z"
                      fill="#90CAF9"
                    />
                    <path d="M40 2v16h16" fill="#BBDEFB" />
                    <rect
                      x="16"
                      y="28"
                      width="32"
                      height="4"
                      rx="2"
                      ry="2"
                      fill="#fff"
                    />
                    <rect
                      x="16"
                      y="36"
                      width="32"
                      height="4"
                      rx="2"
                      ry="2"
                      fill="#fff"
                    />
                    <rect
                      x="16"
                      y="44"
                      width="20"
                      height="4"
                      rx="2"
                      ry="2"
                      fill="#fff"
                    />
                  </svg>
                  <div>{file.name || url}</div>
                </>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default RightSidePanel;

const TextContent = ({ content, setContent }) => {
  const [hover, setHover] = useState(false);

  const handleHover = useCallback(() => setHover(true), []);
  const handleClearHover = useCallback(() => setHover(false), []);

  return (
    <div
      className="w-full relative bg-[#DCDCDC] px-6 py-8"
      onMouseOver={handleHover}
      onMouseLeave={handleClearHover}
    >
      <textarea
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder=""
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      {hover && (
        <div className="absolute -left-4 top-0 h-full flex flex-col items-center justify-center gap-2 animate-fadeIn">
          <button className="w-8 h-8 rounded-full bg-white hover:bg-[#006CFF] hover:text-white transition-all">
            <FontAwesomeIcon icon={faGripVertical} />
          </button>
          <button className="w-8 h-8 rounded-full bg-white hover:bg-[#006CFF] hover:text-white transition-all">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      )}
    </div>
  );
};
