import React from "react";
import { Tabs } from "antd";
import ProfileTab from "./ProfileTab";
import Tasks from "./Tasks";
import Chat from "./Chat";
import Document from "./Document";

const Body = () => {
  const items = [
    {
      key: "1",
      label: (
        <span className="text-xs tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Profile
        </span>
      ),
      children: <ProfileTab />,
    },
    {
      key: "2",
      label: (
        <span className="text-xs tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Questionnaires
        </span>
      ),
      children: <div>Tab 2</div>,
    },
    {
      key: "3",
      label: (
        <span className="text-xs tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Documents
        </span>
      ),
      children: <Document />,
    },
    {
      key: "4",
      label: (
        <span className="text-xs tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Forms
        </span>
      ),
      children: <div>Tab 4</div>,
    },
    {
      key: "5",
      label: (
        <span className="text-xs tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Tasks
        </span>
      ),
      children: <Tasks />,
    },
    {
      key: "6",
      label: (
        <span className="text-xs tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Agreements and Letters
        </span>
      ),
      children: <div>Tab 6</div>,
    },
    {
      key: "7",
      label: (
        <span className="text-xs tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Appointments
        </span>
      ),
      children: <div>Tab 7</div>,
    },
    {
      key: "8",
      label: (
        <span className="text-xs tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Communication
        </span>
      ),
      children: <Chat />,
    },
    {
      key: "9",
      label: (
        <span className="text-xs tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Billing
        </span>
      ),
      children: <div>Tab 9</div>,
    },
  ];
  return (
    <div className="p-2 rounded-lg mt-3 box-shadow bg-white min-h-[600px]">
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabBarStyle={{ marginLeft: "16px" }}
      />
    </div>
  );
};

export default Body;
