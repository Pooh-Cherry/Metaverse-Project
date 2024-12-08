import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import moment from "moment";

import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@contexts/AuthContext";
import useOnScreen from "@hooks/useOnScreen";
import {
  getSelectedUser,
  setMessagePin,
  setMessageStatus,
} from "@redux/messageSlice";
import StatusMonitor from "./StatusMonitor";
import { useWebSocket } from "@contexts/WebSocketContext";
import { SERVER_ADDRESS } from "@constants/config";
import { MEDIA_TYPES } from "@constants";
import { v4 as uuidv4 } from "uuid";
import { MarkIcon } from "@icons";

const ChatPanel = ({ hide }) => {
  const user = useAuth();
  const { messages, selectedUser } = useSelector((state) => state.message);

  const lastShow = useRef(null);

  const displayingMessages = useMemo(() => {
    let result = [];
    let dt = "";

    let _messages = [];
    if (user.isAdmin)
      _messages = messages
        .filter((item) => item.room === selectedUser)
        .sort((a, b) => {
          if (a.created_at > b.created_at) return 1;
          if (a.created_at < b.created_at) return -1;
          return 0;
        });
    else _messages = messages;

    _messages.forEach((item) => {
      const date = new Date(item.created_at).toLocaleDateString();
      if (dt !== date) {
        dt = date;
        result.push({
          type: "day",
          item: { id: `${date}-${item.id}`, text: date },
        });
      }
      result.push({ type: "message", item });
    });
    return result;
  }, [messages, selectedUser, user]);

  useEffect(() => {
    if (lastShow.current)
      lastShow.current.scrollIntoView({ behavior: "smooth" });
  }, [displayingMessages]);

  return (
    <>
      <div
        className={clsx(
          "w-full h-full bg-[#EAEEF3] border border-[#E0E5F2] relative transition-all overflow-x-hidden",
          { "w-0 max-w-0 border-0": hide },
        )}
      >
        <div className="flex flex-col h-full overflow-y-scroll p-5 gap-6">
          {displayingMessages.map(({ type, item }) =>
            type === "message" ? (
              <ChatItem
                key={item.id}
                mine={user.id.toString() === item.from.toString()}
                message={item}
                me={user}
              />
            ) : (
              <DayDivider date={item} key={item.id} />
            ),
          )}
          <div className="invisible" ref={lastShow}></div>
        </div>
      </div>
      <ChatInput />
      <StatusMonitor />
    </>
  );
};

export default ChatPanel;

const ChatItem = ({ message, mine, me }) => {
  const oppo = useSelector(getSelectedUser);
  const dispatch = useDispatch();
  const { socket } = useWebSocket();
  const { isAdmin } = useAuth();
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  const attachments =
    typeof message.attachments === "string"
      ? JSON.parse(message.attachments)
      : message.attachments;

  const createMarkup = () => {
    return { __html: message.text || "" };
  };

  useEffect(() => {
    if (isAdmin && !mine && message.status === "unread" && isVisible) {
      dispatch(setMessageStatus({ id: message.id }));
    }
  }, [isAdmin, isVisible, mine, message, dispatch]);

  const handlePin = useCallback(() => {
    const id = uuidv4();
    dispatch(setMessagePin({ id, message }));
    socket.send(
      JSON.stringify({
        room: "admin-room",
        type: "pin",
        data: { room: message.room, id, message },
      }),
    );
  }, [message, dispatch, socket]);

  return (
    <>
      <div
        className={clsx("w-full flex", `justify-${mine ? "end" : "start"}`)}
        ref={ref}
      >
        <div className="sm:max-w-[75%] flex flex-col">
          <div className="flex justify-stretch">
            {/* {mine && (
              <div className="min-w-8 flex justify-start items-start">
                <div className="cursor-pointer" onClick={handlePin}>
                  <MoreIcon />
                </div>
              </div>
            )} */}
            <div className="flex flex-col w-full">
              <div className="flex flex-col">
                {mine ? (
                  <div className="min-w-12 flex justify-end font-semibold gap-2 items-center pb-2">
                    <p>You</p>
                  </div>
                ) : (
                  <div className="min-w-12 flex font-semibold gap-2 items-center pb-2">
                    <MarkIcon width={20} height={20} />
                    <p>Bot</p>
                  </div>
                )}
                {message.text && (
                  <div
                    className={clsx(
                      "p-3 rounded-lg text-lg font-normal break-words flex-wrap",
                      mine
                        ? "bg-[#0044E9] text-white rounded-br-none m-0"
                        : "bg-white text-black rounded-bl-none",
                    )}
                  >
                    <span dangerouslySetInnerHTML={createMarkup()}></span>
                  </div>
                )}
              </div>
              <div
                className={clsx("text-sm text-[#34335B90]", {
                  "flex justify-end": !mine,
                })}
              >
                {moment.utc(message.created_at).local().format("HH:mm")}
              </div>
            </div>
            {/* {!mine && (
              <div className="min-w-8 flex justify-end items-start">
                <div className="cursor-pointer" onClick={handlePin}>
                  <MoreIcon />
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div
        className={clsx("w-full flex", {
          "justify-end": mine,
          "justify-start": !mine,
        })}
        ref={ref}
      >
        {attachments && (
          <div
            className={clsx("flex mt-2 gap-4 flex-wrap", {
              "justify-end mr-12": mine,
              "justify-start ml-12": !mine,
            })}
          >
            <div className="sm:max-w-[10%] flex gap-1">
              {attachments.map((item, index) => (
                <FileItem key={index} src={item.path} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const DayDivider = ({ date }) => {
  return (
    <div className="mt-2 mb-1 flex justify-stretch items-center">
      <div className="border-t-2 border-[#34335B10] w-full"></div>
      <div className="text-[#34335BA0] font-[500] text-nowrap mx-4">
        {moment.utc(date.text).local().format("D MMMM YYYY")}
      </div>
      <div className="border-t-2 border-[#34335B10] w-full"></div>
    </div>
  );
};

const FileItem = ({ src }) => {
  const ext = src.substring(src.lastIndexOf(".") + 1);
  const type = MEDIA_TYPES.includes(ext.toLowerCase()) ? "media" : "file";
  const title = src.substring(src.indexOf("-") + 1);

  return (
    <div className="h-20 w-24 overflow-hidden flex justify-center items-center border rounded-lg">
      {type === "file" && (
        <div className="flex flex-col">
          <span className="text-center font-bold">{ext}</span>
          <span className="text-center text-xs w-16 break-words overflow-hidden">
            {title.length > 15 ? `${title.substring(0, 15)}...` : title}
          </span>
        </div>
      )}
      {type === "media" && (
        <img
          alt="file"
          src={`${SERVER_ADDRESS}/${src}`}
          width={96}
          height={80}
          className="w-full"
        />
      )}
    </div>
  );
};
