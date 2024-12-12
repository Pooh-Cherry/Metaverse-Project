import React from "react";
import {
  InstagramIcon,
  MessengerIcon,
  PhoneIcon,
  EmailIcon,
  WhatsappIcon,
  ChatbotIcon,
  SMSIcon,
} from "@icons";

const iconMap = {
  Instagram: InstagramIcon,
  Messenger: MessengerIcon,
  Phone: PhoneIcon,
  Email: EmailIcon,
  Whatsapp: WhatsappIcon,
  Chatbot: ChatbotIcon,
  SMS: SMSIcon,
};

const SocialChannel = ({
  socialName = "Email",
  active = true,
  messageCnt = "0",
}) => {
  const IconComponent = iconMap[socialName];

  return (
    <div className="w-[62px] h-[62px]">
      <div className="w-full">
        <div className="flex justify-end">
          {!messageCnt && (
            <div
              className={`bg-[#525252] rounded-[3px] px-[5px] text-white text-xs mb-[-14px] mr-[-4px] z-10 ${!active && "invisible"}`}
            >
              <p>{messageCnt > 999 ? "999+" : messageCnt}</p>
            </div>
          )}
        </div>
        <div
          className={`w-[58px] h-[58px] bg-white rounded-[5px] flex justify-center items-center ${active ? "shadow-[0_0_4px_#0008] cursor-pointer hover:bg-[#E2E8F0]" : "opacity-90"}`}
        >
          <IconComponent width={25} height={25} opacity={active ? 1 : 0.5} />
        </div>
      </div>
    </div>
  );
};

export default SocialChannel;
