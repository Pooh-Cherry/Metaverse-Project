import React, { useEffect, useState } from "react";
import { AddBotEmail, DeleteBotEmail, GetBotEmails } from "../apis";
import AwesomeModal from "../components/flows/modal";

const TableComponent = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ email: "", password: "" });
  const [isOpen, setOpen] = useState(false);
  const [isDeleted, setDelete] = useState(false);
  const [selectedId, setSelectId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const addRecord = async () => {
    if (newRecord.email && newRecord.password) {
      const response = await AddBotEmail(newRecord);
      if (response.response) {
        setRecords((prev) => [...prev, { ...newRecord, id: Date.now() }]);
      } else {
        alert("Duplicated email!");
      }
      setNewRecord({ email: "", password: "" });
    } else {
      alert("Please fill in all fields!");
    }
  };

  const deleteRecord = async (id) => {
    setOpen(true);
    setSelectId(id);
  };

  const onDelete = async (id) => {
    const record = records.filter((record) => record.id === id);
    await DeleteBotEmail(record[0].email);
    setRecords((prev) => prev.filter((record) => record.id !== id));
    setDelete(false);
    setOpen(false);
  };

  const getRecords = async () => {
    const response = await GetBotEmails();
    setRecords(response.emails);
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div className="h-screen min-h-screen max-h-screen w-screen py-2 pr-2 w-[calc(100%_-_56px)]">
      <div className="w-full h-full bg-[#F6F6F6] flex flex-col rounded-xl p-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Manage Bot Emails</h2>

          {/* Input Form */}
          <div className="flex justify-between gap-2">
            <input
              type="email"
              name="email"
              value={newRecord.email}
              placeholder="Enter email"
              onChange={handleInputChange}
              className="w-[45%] px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              name="password"
              value={newRecord.password}
              placeholder="Enter password"
              onChange={handleInputChange}
              className="w-[45%] px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              class="w-[10%] px-5 py-2.5 bg-green-500 text-white border-none rounded cursor-pointer font-bold"
              onClick={addRecord}
            >
              ➕ Add Email
            </button>
          </div>

          {/* Table */}
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
                  Password
                </th>
                <th className="bg-gray-200 text-gray-800 text-left p-2.5 font-bold w-[10%]">
                  Actions
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
                      {record.password}
                    </td>
                    <td className="py-2.5 border-b border-gray-300">
                      <button
                        className="w-full px-2.5 py-2 bg-red-600 text-white border-none rounded cursor-pointer font-bold"
                        onClick={() => deleteRecord(record.id)}
                      >
                        ❌ Delete
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
        </div>
        <AwesomeModal
          onClose={() => {
            setOpen(!isOpen);
          }}
          isOpen={isOpen}
          title={"Unsaved changes"}
          children={
            <>
              <p>Are you sure you want to delete the selected email?</p>
              <div style={{ float: "right" }}>
                <button
                  className="px-4 mx-2 my-4 bg-[#22272d] text-white rounded-lg"
                  onClick={() => {
                    setDelete(false);
                    setOpen(false);
                  }}
                >
                  No
                </button>
                <button
                  className="px-4 my-4 bg-[#22272d] text-white rounded-lg"
                  onClick={() => {
                    onDelete(selectedId);
                  }}
                >
                  Yes
                </button>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default TableComponent;
