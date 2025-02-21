import React, { useState } from "react";
import { Drawer, Dropdown, Button, Space } from "antd";
import Note from "./Note";
import NoteForm from "./NoteForm";

const Buttonrow = () => {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const handleClick = () => setShowForm(false);

  const caseDropdownOptions = [
    {
      key: "1",
      label: "Download Application",
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Send Invite",
    },
    {
      key: "3",
      label: "Archive",
    },
    {
      key: "4",
      label: "Close",
    },
    {
      key: "5",
      label: "Delete",
      danger: true,
    },
  ];

  return (
    <div className="flex gap-2 mt-[30px] overflow-y-auto">
      <Dropdown menu={{ items: caseDropdownOptions }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Button
              type="primary"
              icon={<i className="bi bi-caret-down-fill"></i>}
              iconPosition="end"
            >
              Case Options
            </Button>
          </Space>
        </a>
      </Dropdown>
      <button className="py-2 px-4 text-xs text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all">
        <i className="bi bi-person mr-2"></i>Users
      </button>
      <button
        onClick={() => setOpen(true)}
        className="py-2 px-4 text-xs text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all"
      >
        <i className="bi bi-clipboard mr-2"></i>Notes
      </button>
      <button className="py-2 px-4 text-xs text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all">
        <i className="bi bi-clipboard mr-2"></i>Activities
      </button>
      <button className="py-2 px-4 text-xs text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all">
        <i className="bi bi-clock mr-2"></i>Time Entries
      </button>
      <button className="py-2 px-4 text-xs text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all">
        <i className="bi bi-file-earmark-spreadsheet mr-2"></i>Statement of
        Account
      </button>
      <button className="py-2 px-4 text-xs text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all">
        <i className="bi bi-shuffle mr-2"></i>Workflow
      </button>
      <Drawer
        title={<h5 className="font-semibold text-gray-500">Notes</h5>}
        open={open}
        onClose={() => setOpen(false)}
        width="450"
      >
        <div className="mt-5">
          {showForm === true ? (
            <NoteForm handleClick={handleClick} />
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white p-2 rounded text-xs transition-all hover:bg-blue-500"
            >
              + Add Note
            </button>
          )}
        </div>
        <div className="mt-5">
          <Note />
        </div>
      </Drawer>
    </div>
  );
};

export default Buttonrow;
