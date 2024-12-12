import React, { useState } from "react";
import Slider from "react-slick";
import InboxLabel from "../label/label";
import { RefreshIcon } from "@icons/other";
import SocialChannel from "../socialchannel";
import User from "../user";

const Contacts = ({ userList, setSelectedId, selectedId, setShowRightBar }) => {
  // const [socialScrollPosition, setSocialScrollPosition] = useState(0);
  // const socialScrollRef = useRef(null);
  const [searchUser, setSearchUser] = useState("");

  // const handleSocialScroll = () => {
  //   if (socialScrollRef.current) {
  //     const scrollLeft = socialScrollRef.current.scrollLeft;
  //     setSocialScrollPosition(scrollLeft);
  //   }
  // };

  // const isAtEndOfSocialScroll = () => {
  //   if (socialScrollRef.current) {
  //     const { scrollLeft, clientWidth, scrollWidth } = socialScrollRef.current;
  //     return scrollLeft + clientWidth >= scrollWidth;
  //   }
  //   return false;
  // };

  // const scrollLeft = () => {
  //   if (socialScrollRef.current) {
  //     socialScrollRef.current.scrollBy({ left: -30, behavior: "smooth" });
  //   }
  // };

  // const scrollRight = () => {
  //   if (socialScrollRef.current) {
  //     socialScrollRef.current.scrollBy({ left: 30, behavior: "smooth" });
  //   }
  // };

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchUser.toLowerCase()),
  );

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#EAEEF3",
          borderRadius: "20px",
        }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#EAEEF3",
          borderRadius: "20px",
        }}
        onClick={onClick}
      />
    );
  };

  const socialSettings = {
    infinite: true,
    swipeToSlide: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="h-[100%] border-[#D3D3D3] border-r">
      <div className="flex flex-col p-[10px] border-b border-[#D3D3D3] gap-2.5 justify-between h-[16%]">
        <div className="flex w-full min-w-0 px-[25px]">
          <div className="w-full px-2">
            <Slider {...socialSettings}>
              <SocialChannel socialName="Email" messageCnt={1200} />
              <SocialChannel socialName="Phone" active={false} />
              <SocialChannel socialName="SMS" messageCnt={99} />
              <SocialChannel socialName="Chatbot" messageCnt={1200} />
              <SocialChannel socialName="Whatsapp" messageCnt={34} />
              <SocialChannel socialName="Instagram" messageCnt={23} />
            </Slider>
          </div>
        </div>
        <div className="flex justify-between gap-2.5">
          <div className="w-full">
            <input
              className="w-full outline-none font-base p-[10px] rounded-[5px]"
              placeholder="Search..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </div>
          <div
            className="w-[45px] h-[45px] bg-white flex justify-center cursor-pointer items-center rounded-[5px] hover:bg-[#E2E8F0]"
            onClick={() => setSearchUser("")}
          >
            <RefreshIcon />
          </div>
        </div>
        <div className="flex justify-between flex-wrap">
          <InboxLabel content="AI Sent" />
          <InboxLabel backgroundColor="#EC7E11" content="Human Sent" />
          <InboxLabel backgroundColor="#20AE36" content="Replied" />
          <InboxLabel backgroundColor="#43435A" content="Scheduled" />
          <InboxLabel backgroundColor="#9747FF" content="Sold" />
          <InboxLabel backgroundColor="#F43033" content="Cancelled" />
        </div>
      </div>
      <div
        className="flex flex-col p-[10px] overflow-auto h-[84%]"
        onDoubleClick={() => setShowRightBar(true)}
      >
        {filteredUsers.map((user) => (
          <User
            key={user.id}
            user={user}
            setSelectedId={setSelectedId}
            selectedId={selectedId} // Pass the selectedId prop
          />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
