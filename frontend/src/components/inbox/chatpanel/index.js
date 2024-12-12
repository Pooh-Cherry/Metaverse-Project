import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import moment from "moment";

import ChatInput from "./ChatInput";
// import { useDispatch, useSelector } from "react-redux";
// import { useAuth } from "@contexts/AuthContext";
// import useOnScreen from "@hooks/useOnScreen";
// import { setMessageStatus } from "@redux/messageSlice";
import StatusMonitor from "./StatusMonitor";
import { SERVER_ADDRESS } from "@constants/config";
import InboxLabel from "../label/label";

const ChatPanel = ({ messageHistory, setMessageHistory }) => {
  const lastShow = useRef(null);
  const displayedDates = new Set();

  useEffect(() => {
    if (lastShow.current)
      lastShow.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <>
      <div className="w-full h-full bg-white border-t border-[#E0E5F2] relative transition-all overflow-x-hidden">
        <div className="flex flex-col h-full overflow-y-scroll p-5 gap-2.5">
          {messageHistory.map((item, index) => {
            // Get current item's date (ignoring time)
            const currentDate = new Date(item.datetime).toLocaleDateString();

            // Determine if day divider is needed
            const showDayDivider = !displayedDates.has(currentDate);

            // If needed, add the current date to the set
            if (showDayDivider) {
              displayedDates.add(currentDate);
            }

            return (
              <React.Fragment key={item.id}>
                {showDayDivider && <DayDivider date={currentDate} />}
                {item.id === 1 ? (
                  <ChatItem
                    mine={"human sent"}
                    message={"Start Chat Request Sent"}
                    date={item.datetime}
                    attachments={""}
                  />
                ) : (
                  <ChatItem
                    mine={
                      item.label.toLowerCase() === "ai sent"
                        ? "ai sent"
                        : item.label.toLowerCase() === "human sent"
                          ? "human sent"
                          : null
                    }
                    message={item.text}
                    date={item.datetime}
                    attachments={item.attachments}
                  />
                )}
              </React.Fragment>
            );
          })}

          <div className="invisible" ref={lastShow}></div>
        </div>
      </div>
      <ChatInput
        messageHistory={messageHistory}
        setMessageHistory={setMessageHistory}
      />
      <StatusMonitor />
    </>
  );
};

export default ChatPanel;

const ChatItem = ({ message, mine, date, attachments }) => {
  const ref = useRef();

  const attachmentFiles = attachments;

  const createMarkup = () => {
    return { __html: message || "" };
  };

  return (
    <>
      <div
        className={clsx("w-full flex", `justify-${mine ? "end" : "start"}`)}
        ref={ref}
      >
        <div className="sm:max-w-[40%] flex flex-col">
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
                {message && (
                  <div
                    className={clsx(
                      "p-3 rounded-lg text-lg font-normal break-words flex-wrap",
                      mine
                        ? "bg-[#0044E9] text-white rounded-br-none m-0"
                        : "bg-[#EAEEF3] text-black rounded-bl-none",
                    )}
                  >
                    <span dangerouslySetInnerHTML={createMarkup()}></span>
                    <div className="text-sm flex justify-between gap-4 pt-4">
                      <div
                        className={`${mine ? "text-white" : "text-[#525252]"}`}
                      >
                        {moment
                          .utc(date)
                          .local()
                          .format("hh:mm A - DD MMM, YYYY")}
                      </div>
                      {mine === "ai sent" && (
                        <InboxLabel
                          backgroundColor="white"
                          textColor="#0066FF"
                          content="AI Response"
                        />
                      )}
                      {mine === "human sent" && (
                        <InboxLabel
                          backgroundColor="white"
                          textColor="#0066FF"
                          content="Human Response"
                        />
                      )}
                    </div>
                  </div>
                )}
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
        {attachmentFiles && (
          <div
            className={clsx("flex mt-2 gap-4 flex-wrap", {
              "justify-end mr-12": mine,
              "justify-start ml-12": !mine,
            })}
          >
            <div className="sm:max-w-[10%] flex gap-1">
              {attachmentFiles.map((item, index) => (
                <FileItem key={index} src={item} />
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
        {moment.utc(date).local().format("D MMMM YYYY")}
      </div>
      <div className="border-t-2 border-[#34335B10] w-full"></div>
    </div>
  );
};

const FileItem = ({ src }) => {
  const ext = src.substring(src.lastIndexOf(".") + 1).toLowerCase();
  const MEDIA_TYPES = ["jpg", "jpeg", "png", "gif", "bmp", "svg"]; // Ensure MEDIA_TYPES is defined
  const type = MEDIA_TYPES.includes(ext) ? "media" : "file";

  // Extracts the filename from the URL
  const filename = src.substring(src.lastIndexOf("/") + 1);
  // Determines the title by removing the extension from the filename
  const title = filename.substring(0, filename.lastIndexOf(".")) || filename;

  return (
    <div className="h-20 w-24 overflow-hidden flex justify-center items-center border rounded-lg">
      {type === "file" && (
        <div className="flex flex-col text-center">
          <span className="font-bold">{ext.toUpperCase()}</span>
          <span className="text-xs w-16 break-words overflow-hidden">
            {title.length > 15 ? `${title.substring(0, 15)}...` : title}
          </span>
        </div>
      )}
      {type === "media" && (
        <img
          alt={filename} // Use filename as alt text for better accessibility
          src={`${SERVER_ADDRESS}/${src}`}
          width={96}
          height={80}
          className="w-full"
        />
      )}
    </div>
  );
};
