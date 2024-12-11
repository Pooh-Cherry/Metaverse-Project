import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import UserBoard from "../components/messages/UserBoard";
import AdminMessage from "../components/messages/AdminMessage";

const AdminMessages = () => {
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const [showUsersPanel, setShowUsersPanel] = useState(false);

  const handleClickUsersPanelView = useCallback(
    () => setShowUsersPanel(!showUsersPanel),
    [showUsersPanel],
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) setShowUsersPanel(false);
      else setShowUsersPanel(true);
    };
    if (window.innerWidth > 1280) setShowUsersPanel(false);
    else setShowUsersPanel(true);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen min-h-screen max-h-screen relative flex justify-center py-2 w-full">
      <div className="h-full w-full flex px-10 justify-center flex-col">
        <div className="w-full h-[calc(100vh_-_172px)] flex">
          <UserBoard show={showUsersPanel} setShow={setShowUsersPanel} />

          <div
            className={clsx(
              "flex-grow h-full w-full flex flex-col border rounded-e-[12px]",
              {
                "w-[calc(100vw_-_508px)] overflow-hidden border rounded-[12px]":
                  showUsersPanel,
              },
            )}
          >
            {selectedUser && (
              <AdminMessage
                hide={showUsersPanel}
                setShowUsersPanel={handleClickUsersPanelView}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
