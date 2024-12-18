import React, { useEffect, useState } from "react";
import InboxMessages from "../components/inbox";
import Contacts from "../components/inbox/contacts";
import RightBar from "../components/inbox/rightbar";

const Inbox = () => {
  const [userList, setUserList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [showRightBar, setShowRightBar] = useState(true);

  useEffect(() => {
    const fetchedUserList = [
      {
        id: 1,
        contact_info: "+1 503 304 4234",
        name: "Alice Johnson",
        avartar_url: "user4.png",
        last_message: "Good morning!",
        updated_at: "2024-12-12 08:00:00",
        cnt_new_msg: 300,
        cnt_msg: 22,
        social: "whatsapp",
        label: "ai sent",
      },
      {
        id: 2,
        contact_info: "charlie@domain.com",
        name: "Charlie Davis",
        avartar_url: "user0.png",
        last_message: "See you soon.",
        updated_at: "2024-12-10 06:30:00",
        cnt_new_msg: 600,
        cnt_msg: 35,
        social: "email",
        label: "replied",
      },
      {
        id: 3,
        contact_info: "@dianap2025",
        name: "Diana Prince",
        avartar_url: "user7.png",
        last_message: "At the venue.",
        updated_at: "2024-12-09 18:17:00",
        cnt_new_msg: 10,
        cnt_msg: 55,
        social: "messenger",
        label: "human sent",
      },
      {
        id: 4,
        contact_info: "+1 503 301 8976",
        name: "Bruce Stevenson",
        avartar_url: "user2.png",
        last_message: "Ready to go?",
        updated_at: "2024-12-08 10:45:00",
        cnt_new_msg: 180,
        cnt_msg: 40,
        social: "whatsapp",
        label: "ai sent",
      },
      {
        id: 5,
        contact_info: "lois@dailyplanet.com",
        name: "Lois Lane",
        avartar_url: "user6.png",
        last_message: "Emailed you.",
        updated_at: "2024-07-04 08:20:00",
        cnt_new_msg: 4,
        cnt_msg: 50,
        social: "email",
        label: "replied",
      },
      {
        id: 6,
        contact_info: "@clarkkent2024",
        name: "Clark Kent",
        avartar_url: "user1.png",
        last_message: "Can't wait!",
        updated_at: "2024-06-09 14:15:00",
        cnt_new_msg: 0,
        cnt_msg: 62,
        social: "instagram",
        label: "human sent",
      },
      {
        id: 7,
        contact_info: "+1 503 305 5566",
        name: "Barry Allen",
        avartar_url: "user3.png",
        last_message: "On my way.",
        updated_at: "2024-03-29 16:50:00",
        cnt_new_msg: 90,
        cnt_msg: 70,
        social: "whatsapp",
        label: "ai sent",
      },
      {
        id: 8,
        contact_info: "tony@starkindustries.com",
        name: "Tony Stark",
        avartar_url: "user5.png",
        last_message: "Let's meet.",
        updated_at: "2024-01-10 11:05:00",
        cnt_new_msg: 7,
        cnt_msg: 26,
        social: "email",
        label: "human sent",
      },
      {
        id: 9,
        contact_info: "@natasha2025",
        name: "Natasha Romanoff",
        avartar_url: "user0.png",
        last_message: "In position.",
        updated_at: "2024-10-14 21:30:00",
        cnt_new_msg: 0,
        cnt_msg: 49,
        social: "messenger",
        label: "replied",
      },
      {
        id: 10,
        contact_info: "@wonderwoman203",
        name: "Wonder Woman",
        avartar_url: "user2.png",
        last_message: "Almost there.",
        updated_at: "2024-06-05 14:25:00",
        cnt_new_msg: 13,
        cnt_msg: 42,
        social: "instagram",
        label: "replied",
      },
      {
        id: 11,
        contact_info: "peterparker@dailybugle.net",
        name: "Peter Parker",
        avartar_url: "user7.png",
        last_message: "Article ready.",
        updated_at: "2024-12-27 11:40:00",
        cnt_new_msg: 14,
        cnt_msg: 54,
        social: "email",
        label: "human sent",
      },
      {
        id: 12,
        contact_info: "+1 503 302 2299",
        name: "Steve Rogers",
        avartar_url: "user4.png",
        last_message: "All set.",
        updated_at: "2024-08-31 04:55:00",
        cnt_new_msg: 11,
        cnt_msg: 33,
        social: "whatsapp",
        label: "ai sent",
      },
      {
        id: 13,
        contact_info: "harley@dcuniverse.com",
        name: "Harley Quinn",
        avartar_url: "user1.png",
        last_message: "Surprise!",
        updated_at: "2024-04-12 09:50:00",
        cnt_new_msg: 15,
        cnt_msg: 59,
        social: "email",
        label: "ai sent",
      },
      {
        id: 14,
        contact_info: "@selinakyle2023",
        name: "Selina Kyle",
        avartar_url: "user6.png",
        last_message: "Catch up later.",
        updated_at: "2024-02-24 16:00:00",
        cnt_new_msg: 7,
        cnt_msg: 64,
        social: "instagram",
        label: "human sent",
      },
      {
        id: 15,
        contact_info: "@aqualord2035",
        name: "Aquaman",
        avartar_url: "user5.png",
        last_message: "Dive in.",
        updated_at: "2024-11-18 07:30:00",
        cnt_new_msg: 2,
        cnt_msg: 39,
        social: "instagram",
        label: "replied",
      },
    ];
    setUserList(fetchedUserList);

    const fetchedMessageHistory = [
      {
        id: 1,
        in_out: "request",
        text: "",
        attachments: [],
        datetime: "2024-06-14 02:51:00",
        label: "",
      },
      {
        id: 2,
        in_out: "in",
        text: "Random text 17",
        attachments: ["https://example.com/file2.pdf"],
        datetime: "2024-06-15 02:51:00",
        label: "replied",
      },
      {
        id: 3,
        in_out: "out",
        text: "Random text 45",
        attachments: [],
        datetime: "2024-06-15 13:20:00",
        label: "ai sent",
      },
      {
        id: 4,
        in_out: "out",
        text: "Random text 24",
        attachments: [
          "https://example.com/file1.jpg",
          "https://example.com/file3.png",
        ],
        datetime: "2024-06-16 22:05:00",
        label: "human sent",
      },
      {
        id: 5,
        in_out: "in",
        text: "Random text 39",
        attachments: ["https://example.com/file3.png"],
        datetime: "2024-09-08 16:34:00",
        label: "replied",
      },
      {
        id: 6,
        in_out: "in",
        text: "Random text 93",
        attachments: [],
        datetime: "2024-09-09 07:47:00",
        label: "replied",
      },
      {
        id: 7,
        in_out: "out",
        text: "Random text 67",
        attachments: ["https://example.com/file2.pdf"],
        datetime: "2024-09-30 19:11:00",
        label: "ai sent",
      },
      {
        id: 8,
        in_out: "out",
        text: "Random text 81",
        attachments: ["https://example.com/file1.jpg"],
        datetime: "2024-12-09 10:29:00",
        label: "human sent",
      },
      {
        id: 9,
        in_out: "in",
        text: "Random text 59",
        attachments: [],
        datetime: "2024-12-10 08:46:00",
        label: "replied",
      },
      {
        id: 10,
        in_out: "out",
        text: "Random text 31",
        attachments: ["https://example.com/file3.png"],
        datetime: "2024-10-10 09:08:00",
        label: "ai sent",
      },
      {
        id: 11,
        in_out: "in",
        text: "Random text 12",
        attachments: ["https://example.com/file1.jpg"],
        datetime: "2024-12-10 09:57:00",
        label: "replied",
      },
      {
        id: 12,
        in_out: "out",
        text: "New text 112",
        attachments: ["https://example.com/file4.pdf"],
        datetime: "2025-01-05 14:20:00",
        label: "human sent",
      },
      {
        id: 13,
        in_out: "in",
        text: "New text 57",
        attachments: [],
        datetime: "2025-01-07 11:30:00",
        label: "replied",
      },
      {
        id: 14,
        in_out: "out",
        text: "New text 99",
        attachments: ["https://example.com/file2.pdf"],
        datetime: "2025-02-03 15:25:00",
        label: "ai sent",
      },
      {
        id: 15,
        in_out: "in",
        text: "New text 77",
        attachments: ["https://example.com/file3.png"],
        datetime: "2025-02-14 13:45:00",
        label: "replied",
      },
      {
        id: 16,
        in_out: "out",
        text: "New text 120",
        attachments: [],
        datetime: "2025-02-20 09:00:00",
        label: "human sent",
      },
      {
        id: 17,
        in_out: "in",
        text: "New text 134",
        attachments: ["https://example.com/file1.jpg"],
        datetime: "2025-03-01 17:20:00",
        label: "replied",
      },
      {
        id: 18,
        in_out: "out",
        text: "New text 188",
        attachments: ["https://example.com/file9.png"],
        datetime: "2025-03-05 08:55:00",
        label: "ai sent",
      },
      {
        id: 19,
        in_out: "in",
        text: "New text 201",
        attachments: [],
        datetime: "2025-03-15 12:33:00",
        label: "replied",
      },
      {
        id: 20,
        in_out: "out",
        text: "New text 219",
        attachments: ["https://example.com/file7.doc"],
        datetime: "2025-03-22 16:48:00",
        label: "human sent",
      },
      {
        id: 21,
        in_out: "out",
        text: "New text 233",
        attachments: [],
        datetime: "2025-04-04 10:10:00",
        label: "ai sent",
      },
      {
        id: 22,
        in_out: "in",
        text: "New text 245",
        attachments: ["https://example.com/file5.pdf"],
        datetime: "2025-04-11 09:28:00",
        label: "replied",
      },
      {
        id: 23,
        in_out: "out",
        text: "New text 259",
        attachments: ["https://example.com/file6.png"],
        datetime: "2025-04-29 07:45:00",
        label: "human sent",
      },
      {
        id: 24,
        in_out: "in",
        text: "New text 276",
        attachments: [],
        datetime: "2025-05-10 14:40:00",
        label: "replied",
      },
      {
        id: 25,
        in_out: "out",
        text: "New text 291",
        attachments: ["https://example.com/file8.doc"],
        datetime: "2025-05-20 22:30:00",
        label: "ai sent",
      },
      {
        id: 26,
        in_out: "out",
        text: "New text 305",
        attachments: [],
        datetime: "2025-05-25 11:15:00",
        label: "human sent",
      },
      {
        id: 27,
        in_out: "in",
        text: "New text 314",
        attachments: ["https://example.com/file1.jpg"],
        datetime: "2025-05-30 03:50:00",
        label: "replied",
      },
      {
        id: 28,
        in_out: "out",
        text: "New text 329",
        attachments: [],
        datetime: "2025-06-06 14:10:00",
        label: "ai sent",
      },
      {
        id: 29,
        in_out: "in",
        text: "New text 344",
        attachments: ["https://example.com/file9.png"],
        datetime: "2025-06-10 04:20:00",
        label: "replied",
      },
      {
        id: 30,
        in_out: "out",
        text: "New text 358",
        attachments: [],
        datetime: "2025-06-15 16:55:00",
        label: "human sent",
      },
      {
        id: 31,
        in_out: "in",
        text: "New text 371",
        attachments: ["https://example.com/file4.pdf"],
        datetime: "2025-06-18 13:20:00",
        label: "replied",
      },
      {
        id: 32,
        in_out: "out",
        text: "New text 389",
        attachments: ["https://example.com/file3.png"],
        datetime: "2025-06-22 08:44:00",
        label: "ai sent",
      },
      {
        id: 33,
        in_out: "in",
        text: "New text 402",
        attachments: [],
        datetime: "2025-07-05 20:10:00",
        label: "replied",
      },
      {
        id: 34,
        in_out: "out",
        text: "New text 418",
        attachments: ["https://example.com/file5.pdf"],
        datetime: "2025-07-12 14:05:00",
        label: "human sent",
      },
      {
        id: 35,
        in_out: "in",
        text: "New text 432",
        attachments: ["https://example.com/file6.png"],
        datetime: "2025-07-20 09:25:00",
        label: "replied",
      },
      {
        id: 36,
        in_out: "out",
        text: "New text 446",
        attachments: ["https://example.com/file7.doc"],
        datetime: "2025-07-27 22:11:00",
        label: "ai sent",
      },
    ];
    setMessageHistory(fetchedMessageHistory);
  }, []);

  return (
    <div className={`h-screen py-2 pr-2 w-full`}>
      <div
        className={`w-full h-full flex rounded-xl ${selectedId ? "bg-[#1B1B20]" : "bg-[#F6F6F6]"}`}
      >
        <div
          className={`w-full lg:w-[350px] bg-[#F6F6F6] ${selectedId !== null && "hidden lg:block"}`}
        >
          <Contacts
            userList={userList}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
            setShowRightBar={setShowRightBar}
          />
        </div>
        <div className="flex flex-1 min-w-0">
          <div
            className={`flex gap-2 ${selectedId === null ? "hidden" : "w-full"}  z-20`}
          >
            <div className="flex flex-1 min-w-0">
              <InboxMessages
                selectedUser={userList.find((user) => user.id === selectedId)}
                messageHistory={messageHistory}
                setMessageHistory={setMessageHistory}
                setSelectedId={setSelectedId}
              />
            </div>
            {showRightBar && selectedId && (
              <div className="flex w-[370px] hidden xl:flex">
                <RightBar
                  selectedUser={userList.find((user) => user.id === selectedId)}
                  onClose={() => setShowRightBar(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
