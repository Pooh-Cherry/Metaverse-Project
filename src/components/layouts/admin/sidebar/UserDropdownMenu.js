import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@redux/authSlice";
import { useWebSocket } from "@contexts/WebSocketContext";

const UserDropdownMenu = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { setLogout } = useWebSocket();
  const dropdownRef = useRef(null);

  const handleSignout = useCallback(() => {
    setLogout((prev) => !prev);
    dispatch(logout());
  }, [dispatch, setLogout]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block text-left text-black"
      ref={dropdownRef}
    >
      <button
        id="dropdownUserAvatarButton"
        onClick={toggleDropdown}
        className="w-[40px] h-[40px] transition-all rounded-lg items-center text-lg text-white bg-[#9222DC] rounded-full hover:bg-[#9222DC90]"
        type="button"
      >
        <div alt="user avatar">{user?.name[0].toUpperCase()}</div>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownAvatar"
          className="absolute left-14 bottom-2 bg-white divide-y divide-gray-100 rounded-lg shadow-[0_0_8px_#0004] w-44 max-h-[166px] w-[318px]"
        >
          <div className="px-4 py-3 text-sm text-black font-bold w-full flex gap-4 cursor-default	">
            <div>
              <div className="w-[40px] h-[40px] transition-all rounded-lg items-center text-lg text-white bg-[#9222DC] rounded-full flex text-center align-center justify-center">
                <div alt="user avatar">{user?.name[0].toUpperCase()}</div>
              </div>
            </div>
            <div>
              <div className="font-medium truncate">
                {user?.name || "Bonnie Green"}
              </div>
              <div className="font-bold">
                {user?.email || "Bonnie Green@gmail.com"}
              </div>
            </div>
          </div>
          <ul className="text-lg" aria-labelledby="dropdownUserAvatarButton">
            <li>
              <button className="bg-[#EAEEF3] w-full text-left border-[#BFCBD9] border-t px-4 py-3 text-lg font-bold hover:bg-gray-100">
                Settings
              </button>
            </li>
            <li>
              <button
                className="bg-[#EAEEF3] w-full text-left border-[#BFCBD9] border-t px-4 py-3 text-lg font-bold rounded-b-lg hover:bg-gray-100"
                onClick={handleSignout}
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdownMenu;
