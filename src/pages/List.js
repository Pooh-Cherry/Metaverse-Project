import React, { useState } from "react";
import axios from "axios";
import { SERVER_ADDRESS } from "@constants/config";
import { AddURL, TrainURL, TrainContent, TrainQA } from "../apis";

const List = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qa, setQA] = useState([]);
  const [links, setLinks] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("Fetching links...");
  const [checkedLinks, setCheckedLinks] = useState([]);
  const [checkedFiles, setCheckedFiles] = useState([]);

  const handleCheckboxChange = (link) => {
    setCheckedLinks((prevCheckedLinks) => {
      if (prevCheckedLinks.includes(link)) {
        // If already checked, remove it from the array
        return prevCheckedLinks.filter((checkedLink) => checkedLink !== link);
      } else {
        // If not checked, add it to the array
        return [...prevCheckedLinks, link];
      }
    });
  };

  const handleCheckboxChangeWithfile = (file) => {
    setCheckedFiles((prevCheckFiles) => {
      if (prevCheckFiles.includes(file)) {
        // If already checked, remove it from the array
        return prevCheckFiles.filter((checkedFile) => checkedFile !== file);
      } else {
        // If not checked, add it to the array
        return [...prevCheckFiles, file];
      }
    });
  };

  const fetchLinks = async () => {
    try {
      if (url) {
        setCheckedLinks([]);
        setMsg("Fetching links...");
        setLoading(true);

        let processedUrl = url.startsWith("https://") ? url : `https://${url}`;

        const response = await AddURL(processedUrl.trim());
        setLinks(response.links);
        setLoading(false);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleFileChange = async ({ target: { files: newfiles } }) => {
    setCheckedFiles([]);
    const selectedFiles = [...newfiles];
    console.log(selectedFiles);
    setFiles([...files, ...selectedFiles]);
  };

  const updateFilesKnowledge = async () => {
    if (checkedFiles.length !== 0) {
      const formData = new FormData();

      checkedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      try {
        const response = await axios.post(
          SERVER_ADDRESS + "/api/upload-resource",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        console.log(response.data);

        if (response.status === 200) {
          console.log("Files uploaded successfully", checkedFiles);
        } else {
          console.error("Error uploading files");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const updateKnowledge = async () => {
    try {
      if (checkedLinks.length !== 0) {
        await TrainURL(checkedLinks, url);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateContentKnowledge = async () => {
    try {
      if (content !== "") {
        await TrainContent(content);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateQAKnowledge = async () => {
    try {
      if (qa.length !== 0) {
        await TrainQA(qa);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const update = async () => {
    setMsg("Updating knowledgebase...");
    setLoading(true);
    await updateKnowledge();
    await updateFilesKnowledge();
    await updateContentKnowledge();
    await updateQAKnowledge();
    setLoading(false);
  };

  const insertFAQ = async () => {
    if (question !== "" && answer !== "") {
      setQA([...qa, { question: question, answer: answer }]);
      setQuestion("");
      setAnswer("");
    }
  };

  const tabContent = [
    {
      title: "Website Links",
      content: (
        <div className="w-full">
          <div className="mt-4 flex items-center gap-4">
            <input
              type="text"
              placeholder="https://chillincheetah.ca"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
              onClick={() => fetchLinks()}
            >
              Fetch Links
            </button>
          </div>
          <p className="text-gray-400 mt-2 text-sm mb-4">
            This will crawl all the links starting with the URL (not including
            files on the website).
          </p>

          <div
            className="w-full overflow-scroll"
            style={{ maxHeight: "50vh", overflowY: "scroll" }}
          >
            <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-6">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[70%] max-w-[70%] overflow-x-scroll"
                  >
                    Page URL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {link}
                    </th>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-semibold">
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={checkedLinks.includes(link)}
                        onChange={() => handleCheckboxChange(link)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 bg-white border-t border-gray-300">
            <span>{links.length} pages found</span>
          </div>
        </div>
      ),
    },
    {
      title: "Documents",
      content: (
        <div className="mb-4">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Upload File
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  DOC, DOCX, TXT, PDF, CSV
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept=".doc, .docx, .txt, .pdf, .csv"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>
          <p className="text-gray-400 mt-2 text-sm mb-4">Attached files</p>

          <div
            className="w-full overflow-scroll"
            style={{ maxHeight: "50vh", overflowY: "scroll" }}
          >
            <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-6">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[70%] max-w-[70%] overflow-x-scroll"
                  >
                    File Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {file.name}
                    </th>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-semibold">
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={checkedFiles.includes(file)}
                        onChange={() => handleCheckboxChangeWithfile(file)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 bg-white border-t border-gray-300">
            <span>{files.length} files found</span>
          </div>
        </div>
      ),
    },
    {
      title: "Text",
      content: (
        <div className="relative w-full min-w-[200px]">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Here you can add description
          </label>
          <textarea
            className="mt-2 mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder=""
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            value={content}
          ></textarea>
          <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 bg-white border-t border-gray-300">
            <span></span>
          </div>
        </div>
      ),
    },
    {
      title: "FAQs",
      content: (
        <div className="relative w-full min-w-[200px]">
          <select
            id="options"
            className="mb-4 mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {qa.map((item, index) => (
              <option key={index}>{item["question"]}</option>
            ))}
          </select>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Question
          </label>
          <input
            type="text"
            placeholder=""
            className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Answer
          </label>
          <textarea
            className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder=""
            onChange={(e) => setAnswer(e.target.value)}
            rows={15}
            value={answer}
          ></textarea>
          <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 bg-white border-t border-gray-300">
            <span></span>
            <button
              className="text-indigo-400"
              onClick={() => {
                insertFAQ();
              }}
            >
              Add FAQ +
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen min-h-screen max-h-screen py-2 pr-2 w-full max-w-[100%]">
      <div
        className="h-full bg-[#F6F6F6] flex flex-col rounded-xl x-full"
        style={{ width: "100%" }}
      >
        <div className="p-6 flex flex-col h-full gap-4">
          {/* Header */}
          <h2 className="text-2xl font-bold">Data Sources</h2>
          <p className="text-gray-500">
            Add your data sources to train your Assistant
          </p>

          <div className="flex flex-col justify-between md:flex-row gap-4 h-full">
            {/* Left Panel */}
            <div className="bg-white p-6 rounded-lg shadow-md w-[80%]">
              {/* Tab Bar */}
              <div className="flex border-b border-gray-200">
                {tabContent.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`py-2 px-4 font-medium focus:outline-none ${
                      activeTab === index
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-indigo-600"
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="mt-4">{tabContent[activeTab].content}</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md w-[20%]">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-center"
                onClick={() => update()}
              >
                Update Knowledge
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div
            className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
            style={{ background: "rgb(0,0,0,0.3)" }}
          >
            <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
              <div className="loader-dots block relative w-20 h-5 mt-2">
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-500 text-xs font-medium mt-2 text-center">
                {msg}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
