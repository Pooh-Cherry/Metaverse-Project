import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import clsx from "clsx";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import "@xyflow/react/dist/style.css";
import RightSidePanel from "./RightSidePanel";
import AwesomeModal from "./modal";
import {
  AddTriggerEmail,
  GetBotEmails,
  GetComponents,
  getTriggerEmails,
  getTriggers,
  saveComponents,
} from "../../apis";
import {
  ContactNode,
  FallbackNode,
  FaqNode,
  StartNode,
  WelcomeNode,
} from "./NodeItems";
import { useFlow } from "@contexts/FlowContext";
import {
  ActionIcon,
  IntegrationIcon,
  SearchIcon,
  UsersIcon,
  VhistoryIcon,
  SettingsIcon,
  ExitIcon,
  MarkIcon,
  MessageIcon,
  RefreshIcon,
  SalesIcon,
  ServiceIcon,
  WarningIcon,
  PencilIcon,
  EmailIcon,
  InstagramIcon,
  MessengerIcon,
  WhatsappIcon,
} from "@icons";

export default function Flow() {
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    trigger,
    setTrigger,
    menuOpen,
    type,
    setType,
    setContents,
  } = useFlow();

  const [records, setRecords] = useState([]);
  const [select, setSelect] = useState(0);
  const [fetchedSocialConntedStates, setFetchedSocialConntedStates] = useState(
    {},
  );

  const [fetchedUsersList, setFetchedUsersList] = useState([]);
  const [fetchedVersionHistoryList, setFetchedVersionHistoryList] = useState(
    [],
  );
  const [versionSelect, setVersionSelect] = useState(0);
  const [isFallbackChecked, setIsfuallbackChecked] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(0);

  const handleConfidenceScore = (e) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value)));
    setConfidenceScore(value);
  };

  const nodeTypes = {
    start: StartNode,
    contact_us: ContactNode,
    faq: FaqNode,
    welcome: WelcomeNode,
    fallback: FallbackNode,
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const selectEmail = async (email, emailStr) => {
    await AddTriggerEmail(type, email);
    setTrigger({ ...trigger, [type]: emailStr });
    setType(null);
  };

  const getRecords = useCallback(async () => {
    const response = await GetBotEmails();
    const trigger_response = await getTriggerEmails();
    setRecords(response.emails);
    const trigger_list = trigger_response.email_triggers;
    setTrigger(trigger_list);
  }, [setRecords, setTrigger]);

  const getContents = useCallback(async () => {
    const response = await getTriggers();
    const triggers = response.triggers;

    let contents = {};
    triggers.forEach((trigger) => {
      contents[trigger["trigger_type"]] = {
        title: trigger["title"],
        content: trigger["response"],
        file: trigger["file"],
      };
    });
    setContents(contents);
  }, [setContents]);

  const getComponents = useCallback(async () => {
    let newNodes = [];
    const response = await GetComponents();
    response.nodes.forEach((node) => {
      newNodes.push({
        id: node["id"],
        type: node["type"],
        position: {
          x: parseInt(node["x"]),
          y: parseInt(node["y"]),
        },
      });
    });
    setNodes(newNodes);
    setEdges(response.edges);
  }, [setNodes, setEdges]);

  const saveStatus = async () => {
    await saveComponents(nodes, edges);
    NotificationManager.success("Success message", "Saved successfully!");
  };

  const formatVersionUpdatedDateTime = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    // Check if the date is today
    const isToday =
      today.getUTCFullYear() === date.getUTCFullYear() &&
      today.getUTCMonth() === date.getUTCMonth() &&
      today.getUTCDate() === date.getUTCDate();

    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = isToday
      ? "Today"
      : date.toLocaleDateString("en-US", options);

    // Format time to include hours and minutes
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;

    return `${formattedDate} ${formattedTime} by `;
  };

  useEffect(() => {
    getRecords();
    getContents();
    getComponents();
    setFetchedSocialConntedStates({
      email: true,
      instagram: false,
      whatsapp: true,
      messenger: false,
    });
    setFetchedUsersList([
      {
        id: "1",
        email: "user1234@gmail.com",
        avatar: "user3.png",
        isOnline: true,
      },
      {
        id: "2",
        email: "test5678@yahoo.com",
        avatar: "user5.png",
        isOnline: false,
      },
      {
        id: "3",
        email: "email9012@outlook.com",
        avatar: "user1.png",
        isOnline: true,
      },
      {
        id: "4",
        email: "sample3456@example.com",
        avatar: "user7.png",
        isOnline: false,
      },
      {
        id: "5",
        email: "random7890@gmail.com",
        avatar: "user6.png",
        isOnline: true,
      },
      {
        id: "6",
        email: "contact2345@yahoo.com",
        avatar: "user0.png",
        isOnline: true,
      },
      {
        id: "7",
        email: "info6789@outlook.com",
        avatar: "user2.png",
        isOnline: false,
      },
      {
        id: "8",
        email: "admin0987@example.com",
        avatar: "user4.png",
        isOnline: true,
      },
      {
        id: "9",
        email: "hello4567@gmail.com",
        avatar: "user1.png",
        isOnline: false,
      },
      {
        id: "10",
        email: "query1234@yahoo.com",
        avatar: "user7.png",
        isOnline: true,
      },
    ]);

    const fetchedHistoryListTemp = [
      // it must be fetch from Database
      {
        id: 1,
        name: "v3",
        state: "Draft",
        preview: false,
        created_at: "2024-10-28 14:41:06",
        updated_at: "2024-12-08 14:41:06",
        builder: "Jack Doe",
      },
      {
        id: 2,
        name: "v2",
        state: "Published",
        preview: false,
        created_at: "2024-12-06 15:35:01",
        updated_at: "2024-12-06 15:35:01",
        builder: "Linda Sonya",
      },
      {
        id: 3,
        name: "v1",
        state: "",
        preview: true,
        created_at: "2024-12-06 16:13:49",
        updated_at: "2024-12-06 16:13:49",
        builder: "John Smith",
      },
      {
        id: 4,
        name: "testing",
        state: "",
        preview: false,
        created_at: "2024-12-06 17:11:58",
        updated_at: "2024-12-06 17:11:58",
        builder: "Tomy Doe",
      },
    ];
    setFetchedVersionHistoryList(fetchedHistoryListTemp);

    setVersionSelect(
      fetchedHistoryListTemp.findIndex((version) => version.preview === true),
    );
  }, [getRecords, getContents, getComponents]);

  return (
    <div className="h-screen min-h-screen max-h-screen py-2 pr-2 w-full">
      <div className="w-full h-full bg-[#F6F6F6] flex flex-col rounded-xl">
        <div
          style={{
            width: "100%",
            height: "100vh",
            borderRadius: 10,
            position: "relative",
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            style={{
              backgroundColor: "#F6F6F6",
              borderRadius: "10px",
              paddingRight: "8px",
              width: "calc(100% - 56px)",
            }}
            // fitView
            nodesConnectable={false}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
          <div className="absolute top-[2%] left-[calc(100%_-_390px)] bg-white p-1 flex items-center shadow-[0_8px_8px_#00000026] rounded-[10px]">
            <div
              className="cursor-pointer p-2.5 transition-all rounded-lg bg-transparent hover:bg-[#E8E8E8] gap-2 w-[40px] h-[40px] flex justify-center"
              onClick={() => (select !== 1 ? setSelect(1) : setSelect(0))}
            >
              <ActionIcon color={select === 1 ? "#0066FF" : "black"} />
            </div>
            <div
              className="cursor-pointer p-2.5 transition-all rounded-lg bg-transparent hover:bg-[#E8E8E8] gap-2 w-[40px] h-[40px] flex justify-center"
              onClick={() => (select !== 2 ? setSelect(2) : setSelect(0))}
            >
              <SearchIcon color={select === 2 ? "#0066FF" : "black"} />
            </div>
            <div
              className="cursor-pointer p-2.5 transition-all rounded-lg bg-transparent hover:bg-[#E8E8E8] gap-2 w-[40px] h-[40px] flex justify-center"
              onClick={() => (select !== 3 ? setSelect(3) : setSelect(0))}
            >
              <IntegrationIcon color={select === 3 ? "#0066FF" : "black"} />
            </div>
            <div
              className="cursor-pointer p-2.5 transition-all rounded-lg bg-transparent hover:bg-[#E8E8E8] gap-2 w-[40px] h-[40px] flex justify-center"
              onClick={() => (select !== 4 ? setSelect(4) : setSelect(0))}
            >
              <UsersIcon color={select === 4 ? "#0066FF" : "black"} />
            </div>
            <div
              className="cursor-pointer p-2.5 transition-all rounded-lg bg-transparent hover:bg-[#E8E8E8] gap-2 w-[40px] h-[40px] flex justify-center"
              onClick={() => (select !== 5 ? setSelect(5) : setSelect(0))}
            >
              <VhistoryIcon color={select === 5 ? "#0066FF" : "black"} />
            </div>
            <div
              className="cursor-pointer p-2.5 transition-all rounded-lg bg-transparent hover:bg-[#E8E8E8] gap-2 w-[40px] h-[40px] flex justify-center"
              onClick={() => (select !== 6 ? setSelect(6) : setSelect(0))}
            >
              <SettingsIcon color={select === 6 ? "#0066FF" : "black"} />
            </div>
          </div>
          <div
            className={clsx(
              "absolute top-[10%] w-[520px] left-[calc(100%_-_540px)] transform overflow-hidden transition-max-height duration-300 ease-out bg-white shadow-md rounded-lg",
              {
                "max-h-0 opacity-0 transition ease duration-3000": select === 0,
                "max-h-screen opacity-100 transition ease duration-3000":
                  select !== 0,
              },
            )}
          >
            {select === 1 ? (
              <div className="flex flex-col p-5 w-full">
                <div className="flex justify-between">
                  <span className="font-bold font-[#FFFFFF] text-2xl font-sans">
                    Actions
                  </span>
                  <div onClick={() => setSelect(0)}>
                    <ExitIcon wight={30} height={30} color={"#00000099"} />
                  </div>
                </div>
                <div className="flex flex-wrap pt-5 w-full">
                  <div className="flex w-[50%] items-center gap-3 text-lg font-semibold pb-3">
                    <div className="cursor-pointer p-2.5 transition-all rounded-lg bg-[#E8E8E8] gap-2 w-[44px] h-[44px] flex justify-center items-center">
                      <MessageIcon />
                    </div>
                    Message Relation
                  </div>
                  <div className="flex w-[50%] items-center gap-3 text-lg font-semibold pb-3">
                    <div className="cursor-pointer p-2.5 transition-all rounded-lg bg-[#E8E8E8] gap-2 w-[44px] h-[44px] flex justify-center items-center">
                      <SalesIcon />
                    </div>
                    Sales
                  </div>
                  <div className="flex w-[50%] items-center gap-3 text-lg font-semibold pb-3">
                    <div className="cursor-pointer p-2.5 transition-all rounded-lg bg-[#E8E8E8] gap-2 w-[44px] h-[44px] flex justify-center items-center">
                      <ServiceIcon />
                    </div>
                    Service
                  </div>
                  <div className="flex w-[50%] items-center gap-3 text-lg font-semibold pb-3">
                    <div className="cursor-pointer p-2.5 transition-all rounded-lg bg-[#E8E8E8] gap-2 w-[44px] h-[44px] flex justify-center items-center">
                      <EmailIcon color={"white"} />
                    </div>
                    Email
                  </div>
                  <div className="flex w-[50%] items-center gap-3 text-lg font-semibold pb-3">
                    <div className="cursor-pointer p-2.5 transition-all rounded-lg bg-[#67676C] gap-2 w-[44px] h-[44px] flex justify-center items-center">
                      <WarningIcon />
                    </div>
                    Default Fallback
                  </div>
                  <div className="flex w-[50%] items-center gap-3 text-lg font-semibold pb-3">
                    <div className="cursor-pointer p-2.5 transition-all rounded-lg bg-[#E8E8E8] gap-2 w-[44px] h-[44px] flex justify-center items-center">
                      <MarkIcon />
                    </div>
                    Ai Response
                  </div>
                </div>
              </div>
            ) : select === 2 ? (
              <div className="flex flex-col p-5 w-full">
                <div className="flex justify-between gap-4">
                  <div className="flex justify-center items-center">
                    <SearchIcon weidth={25} height={25} />
                  </div>
                  <input
                    className="w-full outline-none"
                    placeholder="Search..."
                  />
                  <div onClick={() => setSelect(0)}>
                    <ExitIcon wight={30} height={30} color={"#00000099"} />
                  </div>
                </div>
              </div>
            ) : select === 3 ? (
              <div className="flex flex-col p-5 w-full">
                <div className="flex justify-between">
                  <span className="font-bold font-[#FFFFFF] text-2xl font-sans">
                    Integration
                  </span>
                  <div onClick={() => setSelect(0)}>
                    <ExitIcon wight={30} height={30} color={"#00000099"} />
                  </div>
                </div>
                <div className="flex pt-5 w-full flex-col gap-3">
                  <div className="flex w-full items-center justify-between text-lg font-semibold p-2 rounded-[5px] border border-slate-400">
                    <div className="flex justify-center items-center gap-2.5 items-center">
                      <div className="cursor-pointer p-2.5 transition-all rounded-lg bg-[#E8E8E8] gap-2 w-[44px] h-[44px] flex justify-center items-center">
                        <EmailIcon color={"white"} />
                      </div>
                      Emails
                    </div>
                    <div
                      className={`px-[10px] py-[6px] rounded-[5px] text-white text-sm cursor-pointer ${
                        fetchedSocialConntedStates.email
                          ? "bg-[#0066FF]"
                          : "bg-[#67676C]"
                      }`}
                      onClick={() =>
                        setFetchedSocialConntedStates({
                          ...fetchedSocialConntedStates,
                          email: !fetchedSocialConntedStates.email,
                        })
                      }
                    >
                      {fetchedSocialConntedStates.email
                        ? "Connected"
                        : "Connect"}
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between text-lg font-semibold p-2 rounded-[5px] border border-slate-400">
                    <div className="flex justify-center items-center gap-2.5 items-center">
                      <div className="cursor-pointer p-2.5 transition-all rounded-lg bg-[#E8E8E8] gap-2 w-[44px] h-[44px] flex justify-center items-center">
                        <InstagramIcon />
                      </div>
                      Instagram
                    </div>
                    <div
                      className={`px-[10px] py-[6px] rounded-[5px] text-white text-sm cursor-pointer ${
                        fetchedSocialConntedStates.instagram
                          ? "bg-[#0066FF]"
                          : "bg-[#67676C]"
                      }`}
                      onClick={() =>
                        setFetchedSocialConntedStates({
                          ...fetchedSocialConntedStates,
                          instagram: !fetchedSocialConntedStates.instagram,
                        })
                      }
                    >
                      {fetchedSocialConntedStates.instagram
                        ? "Connected"
                        : "Connect"}
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between text-lg font-semibold p-2 rounded-[5px] border border-slate-400">
                    <div className="flex justify-center items-center gap-2.5 items-center">
                      <div className="cursor-pointer p-2.5 transition-all rounded-lg bg-[#E8E8E8] gap-2 w-[44px] h-[44px] flex justify-center items-center">
                        <WhatsappIcon />
                      </div>
                      Whatsapp
                    </div>
                    <div
                      className={`px-[10px] py-[6px] rounded-[5px] text-white text-sm cursor-pointer ${
                        fetchedSocialConntedStates.whatsapp
                          ? "bg-[#0066FF]"
                          : "bg-[#67676C]"
                      }`}
                      onClick={() =>
                        setFetchedSocialConntedStates({
                          ...fetchedSocialConntedStates,
                          whatsapp: !fetchedSocialConntedStates.whatsapp,
                        })
                      }
                    >
                      {fetchedSocialConntedStates.whatsapp
                        ? "Connected"
                        : "Connect"}
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between text-lg font-semibold p-2 rounded-[5px] border border-slate-400">
                    <div className="flex justify-center items-center gap-2.5 items-center">
                      <div className="cursor-pointer p-2.5 transition-all rounded-lg bg-[#E8E8E8] gap-2 w-[44px] h-[44px] flex justify-center items-center">
                        <MessengerIcon />
                      </div>
                      Messenger
                    </div>
                    <div
                      className={`px-[10px] py-[6px] rounded-[5px] text-white text-sm cursor-pointer ${
                        fetchedSocialConntedStates.messenger
                          ? "bg-[#0066FF]"
                          : "bg-[#67676C]"
                      }`}
                      onClick={() =>
                        setFetchedSocialConntedStates({
                          ...fetchedSocialConntedStates,
                          messenger: !fetchedSocialConntedStates.messenger,
                        })
                      }
                    >
                      {fetchedSocialConntedStates.messenger
                        ? "Connected"
                        : "Connect"}
                    </div>
                  </div>
                </div>
              </div>
            ) : select === 4 ? (
              <div className="flex flex-col p-5 w-full">
                <div
                  className="flex justify-between"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  <span className="font-bold font-[#FFFFFF] text-2xl font-sans">
                    Users
                  </span>
                  <div onClick={() => setSelect(0)}>
                    <ExitIcon wight={30} height={30} color={"#00000099"} />
                  </div>
                </div>
                <div className="flex pt-5 w-full flex-col gap-3 max-h-[400px] overflow-y-auto">
                  {fetchedUsersList.map((user, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center justify-between text-lg font-semibold p-2 rounded-[5px] border border-slate-400"
                    >
                      <div className="flex justify-center items-center gap-2.5">
                        <img
                          src={`/avatars/${user.avatar}`}
                          alt="user avatar"
                          className="w-11 h-11 min-w-9 rounded-lg"
                        />
                        {user.email}
                      </div>
                      <div
                        className={`px-[10px] py-[6px] rounded-[5px] text-white text-sm cursor-pointer ${
                          user.isOnline ? "bg-[#0066FF]" : "bg-[#67676C]"
                        }`}
                      >
                        {user.isOnline ? "Connected" : "Connect"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : select === 5 ? (
              <div className="flex flex-col p-5 w-full">
                <div
                  className="flex justify-between"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  <span className="font-bold font-[#FFFFFF] text-2xl font-sans">
                    Version History
                  </span>
                  <div onClick={() => setSelect(0)}>
                    <ExitIcon wight={30} height={30} color={"#00000099"} />
                  </div>
                </div>
                <div className="flex pt-5 w-full flex-col gap-3 max-h-[400px] overflow-y-auto">
                  {fetchedVersionHistoryList.map((version, index) => (
                    <div
                      key={index}
                      className={`flex w-full justify-between font-semibold p-5 ${versionSelect === index ? "bg-[#E8EEF3]" : "rounded-[5px] border border-slate-400"}`}
                      onClick={() => {
                        setVersionSelect(index);
                        setFetchedVersionHistoryList(
                          fetchedVersionHistoryList.map((version) =>
                            version.id === versionSelect + 1
                              ? { ...version, preview: true }
                              : version,
                          ),
                        );
                      }}
                    >
                      <div className="flex gap-3">
                        <div className="flex justify-center items-center gap-2.5">
                          <div className="w-[40px] h-[40px] transition-all rounded-lg items-center text-lg text-white bg-[#9222DC] rounded-full flex text-center align-center justify-center">
                            <div alt="user avatar">
                              {version.builder[0].toUpperCase()}
                            </div>
                          </div>
                          {version.email}
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <div className="font-bolt font-lg font-bold">
                              {version.name}
                            </div>
                            {versionSelect === index && (
                              <div className="px-[5px] py-[3px] bg-[#67676C] text-white font-sm leading-none rounded-md font-normal">
                                Preview
                              </div>
                            )}
                            {version.state.toLowerCase() === "draft" ? (
                              <div className="px-[5px] py-[3px] bg-[#EC7E11] text-white font-sm leading-none rounded-md font-normal">
                                Draft
                              </div>
                            ) : version.state.toLowerCase() === "published" ? (
                              <div className="px-[5px] py-[3px] bg-[#0066FF] text-white font-sm leading-none rounded-md font-normal">
                                Published
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="font-light text-sm">
                            <p className="font-[#00000033] font-[4px] leading-none">
                              {formatVersionUpdatedDateTime(version.updated_at)}
                              <span className="font-[black] font-[4px] leading-none font-semibold">
                                {version.builder}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-[15px] h-[15px] flex justify-center items-center cursor-poniter">
                          <PencilIcon />
                        </div>
                        <div className="w-[15px] h-[15px] flex justify-center items-center cursor-poniter">
                          <RefreshIcon />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-5 w-full gap-3">
                <div className="flex justify-between pb-2">
                  <span className="font-bold font-[#FFFFFF] text-2xl font-sans">
                    Settings
                  </span>
                  <div onClick={() => setSelect(0)}>
                    <ExitIcon wight={30} height={30} color={"#00000099"} />
                  </div>
                </div>
                <div className="flex flex-col p-3 w-full bg-[#F6F6F6] rounded-[5px] gap-2">
                  <div className="text-xl font-semibold">Confidence score</div>
                  <div>
                    Confidence score is the percentage, between 0 and 100, that
                    defines how precisely your chatbot interprets the user
                    input.
                  </div>
                  <div className="flex w-full items-center pt-2 gap-2 w-full ustify-between">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={confidenceScore}
                      onChange={handleConfidenceScore}
                      className="w-full"
                    />
                    <input
                      type="number"
                      value={confidenceScore}
                      onChange={handleConfidenceScore}
                      className="p-2 border border-gray-300 rounded-[5px]"
                      min="0"
                      max="100"
                    />
                    <p>%</p>
                  </div>
                </div>
                <div className="flex flex-col p-3 w-full bg-[#F6F6F6] rounded-[5px] gap-2">
                  <div className="text-xl font-semibold">Fallback</div>
                  <div className="flex justify-between">
                    <div className="text-xl font-medium">
                      React to Attachment input
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isFallbackChecked}
                        onChange={() =>
                          setIsfuallbackChecked(!isFallbackChecked)
                        }
                      />
                      <div
                        className={`relative w-16 h-8 ${isFallbackChecked ? "bg-0066FF" : "bg-[#67676C]"} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-[#67676C] peer-checked:bg-blue-600`}
                      >
                        <span
                          className={`absolute ${isFallbackChecked ? "invisible" : "visible"} right-[7px] top-1/2 transform -translate-y-1/2 text-sm font-medium text-white`}
                        >
                          OFF
                        </span>
                        <span
                          className={`absolute ${isFallbackChecked ? "visible" : "invisible"} left-[5px] start-0.5 top-1/2 transform -translate-y-1/2 text-sm font-medium text-white`}
                        >
                          ON
                        </span>
                        <div
                          className={`absolute top-[2px] start-[2px] bg-white border-gray-300 border rounded-full h-7 w-7 transition-all dark:border-gray-600 ${isFallbackChecked ? "translate-x-full" : ""}`}
                        ></div>
                      </div>
                    </label>
                  </div>
                  <div>
                    Trigger a Fallback message when the user shares an
                    attachment with your chatbot but your Story doesn’t contain
                    the Attachment input interaction.
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="absolute top-[2%] left-[calc(100%_-_120px)] flex items-center gap-2 px-4 py-3 font-bold bg-[#0066FF] text-white text-base rounded-[10px] cursor-pointer shadow-[0_8px_8px_#00000026] hover:bg-blue-700"
            onClick={() => saveStatus()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20px"
              height="20px"
            >
              <path d="M17 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-3 16H7v-2h7v2zm3-9H5V5h10v5z" />
            </svg>
            <span>SAVE</span>
          </button>
          <NotificationContainer className="absolute" />
        </div>
        {menuOpen && <RightSidePanel open={menuOpen} />}

        <AwesomeModal
          isOpen={type}
          title={"Email List"}
          onClose={() => setType(null)}
          children={
            <table className="w-full border-collapse shadow-md">
              <thead>
                <tr>
                  <th className="bg-gray-200 text-gray-800 text-left p-2.5 font-bold">
                    #
                  </th>
                  <th className="bg-gray-200 text-gray-800 text-left p-2.5 font-bold">
                    Email
                  </th>
                  <th className="bg-gray-200 text-gray-800 text-left p-2.5 font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((record, index) => (
                    <tr
                      key={record.id}
                      style={{ transition: "background-color 0.3s" }}
                    >
                      <td className="p-2.5 border-b border-gray-300">
                        {index + 1}
                      </td>
                      <td className="p-2.5 border-b border-gray-300">
                        {record.email}
                      </td>
                      <td className="p-2.5 border-b border-gray-300">
                        <button
                          onClick={() => {
                            selectEmail(record.id, record.email);
                          }}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="py-2.5 border-b border-gray-300 text-center"
                      colSpan="4"
                    >
                      No emails available. Add a email above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          }
        />
      </div>
    </div>
  );
}
