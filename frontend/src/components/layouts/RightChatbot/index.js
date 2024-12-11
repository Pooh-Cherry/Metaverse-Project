import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import clsx from "clsx";

import { AnimTypingIcon } from "@icons";
import ChatPanel from "./chatpanel";
import { useAuth } from "@contexts/AuthContext";
import { getSelectedUser, clearMessagesContent } from "@redux/messageSlice";
import { MarkIcon, RefreshIcon, ExitIcon } from "@icons";

const InboxMessages = ({ onClose }) => {
  return (
    <div className="h-screen min-h-screen max-h-screen py-2 pr-2 w-[25%]">
      <div className="w-full bg-white rounded-tr-xl rounded-tl-xl flex items-center justify-between py-[18px] px-[20px] h-[7%]">
        <UserHeadItem onClose={onClose} />
      </div>
      <div className="w-full h-[93%] flex flex-col">
        <ChatPanel />
      </div>
    </div>
  );
};

export default InboxMessages;

export const UserHeadItem = ({ onClose }) => {
  const { isAdmin } = useAuth();
  const { status, lastViewed } = useSelector((state) => state.message);
  const selectedUser = useSelector(getSelectedUser);

  const dispatch = useDispatch();

  // Function to handle refresh icon click
  const handleRefreshClick = () => {
    dispatch(clearMessagesContent()); // Dispatch the clearMessage action
  };

  const _status = useMemo(() => {
    if (isAdmin) return selectedUser?.status;
    return status;
  }, [isAdmin, status, selectedUser]);

  return (
    selectedUser && (
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2.5">
          <UserAvatar avatar={selectedUser.avatar} status={_status} />
          <div className="flex flex-col">
            <div className="text-[#2D396B] font-bold text-nowrap">Bot</div>
            <div
              className={clsx("text-sm text-nowrap", {
                "text-[#24D164]": _status === 3 || (!isAdmin && _status === 0),
                "text-[#34335B]":
                  _status === 1 || _status === 2 || (isAdmin && _status !== 3),
              })}
            >
              {_status === 0 && !isAdmin && "online"}
              {(_status === 1 ||
                _status === 2 ||
                _status > 3 ||
                (_status === 0 && isAdmin)) &&
                moment
                  .utc(isAdmin ? selectedUser.updated_at : lastViewed)
                  .local()
                  .fromNow()}
              {_status === 3 && (
                <span className="flex items-center">
                  <AnimTypingIcon color="#24D164" width={32} /> Typing
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div
            className="transition-all rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={handleRefreshClick}
          >
            <RefreshIcon color={true ? "black" : "#64748B"} />
          </div>
          <div
            className="transition-all rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={onClose}
          >
            <ExitIcon color={true ? "black" : "#64748B"} />
          </div>
        </div>
      </div>
    )
  );
};

export const UserAvatar = () => {
  return (
    <div>
      <div className="transition-all rounded-lg flex items-center gap-2">
        <MarkIcon />
      </div>
    </div>
  );
};
