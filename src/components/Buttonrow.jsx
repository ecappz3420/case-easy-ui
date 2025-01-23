import React, { useState } from "react";
import { Drawer, Dropdown, Button, Space } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Note from "./Note";
import NoteForm from "./NoteForm";

const Buttonrow = () => {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const handleClick = () => setShowForm(false);

  const items = [
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
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Button
              type="primary"
              icon={<CaretDownOutlined />}
              iconPosition="end"
            >
              Case Options
            </Button>
          </Space>
        </a>
      </Dropdown>
      {/* <Dropdown label='Case Options' color='blue'>
        <DropdownItem>Download Application</DropdownItem>
        <DropdownDivider/>
        <DropdownItem>Send Invite</DropdownItem>
        <DropdownItem>Archive</DropdownItem>
        <DropdownItem>Close</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </Dropdown> */}
      <button className="py-2 px-4 text-sm text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all">
        <i className="bi bi-person mr-2"></i>Users
      </button>
      <button
        onClick={() => setOpen(true)}
        className="py-2 px-4 text-sm text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all"
      >
        <i className="bi bi-clipboard mr-2"></i>Notes
      </button>
      <button className="py-2 px-4 text-sm text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all">
        <i className="bi bi-clipboard mr-2"></i>Activities
      </button>
      <button className="py-2 px-4 text-sm text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all">
        <i className="bi bi-clock mr-2"></i>Time Entries
      </button>
      <button className="py-2 px-4 text-sm text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all">
        <i className="bi bi-file-earmark-spreadsheet mr-2"></i>Statement of
        Account
      </button>
      <button className="py-2 px-4 text-sm text-nowrap bg-white rounded border hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition-all">
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
              className="bg-blue-600 text-white p-2 rounded text-sm transition-all hover:bg-blue-500"
            >
              + Add Note
            </button>
          )}
        </div>
        <div className="mt-5">
          <Note />
        </div>
      </Drawer>
      {/* <Drawer open={visible} position="right" className="w-[450px]">
        <DrawerHeader title="Notes" titleIcon={() => <></>} />
        <DrawerItems>
          <div className="mt-5">
            {showForm === true ? (
              <NoteForm handleClick={handleClick} />
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white p-2 rounded text-sm transition-all hover:bg-blue-500"
              >
                + Add Note
              </button>
            )}
          </div>
          <div className="mt-5">
            <Note />
          </div>
        </DrawerItems>
      </Drawer> */}
    </div>
  );
};

export default Buttonrow;
