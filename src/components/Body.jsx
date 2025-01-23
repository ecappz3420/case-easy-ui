import React from "react";
import { Tabs } from "antd";
import ProfileTab from "./ProfileTab";
import Tasks from "./Tasks";
import Chat from "./Chat";
import Document from "./Document";

const Body = () => {
  // const [value, setValue] = React.useState("1");

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  // const CustomTab = (props) => {
  //   const { index, children } = props;
  //   return (
  //     <div className={index == value ? "block" : "hidden"}>{children}</div>
  //   );
  // };
  const items = [
    {
      key: "1",
      label: (
        <span className="text-sm tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Profile
        </span>
      ),
      children: <ProfileTab />,
    },
    {
      key: "2",
      label: (
        <span className="text-sm tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Questionnaires
        </span>
      ),
      children: <div>Tab 2</div>,
    },
    {
      key: "3",
      label: (
        <span className="text-sm tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Documents
        </span>
      ),
      children: <Document />,
    },
    {
      key: "4",
      label: (
        <span className="text-sm tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Forms
        </span>
      ),
      children: <div>Tab 4</div>,
    },
    {
      key: "5",
      label: (
        <span className="text-sm tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Tasks
        </span>
      ),
      children: <Tasks />,
    },
    {
      key: "6",
      label: (
        <span className="text-sm tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Agreements and Letters
        </span>
      ),
      children: <div>Tab 6</div>,
    },
    {
      key: "7",
      label: (
        <span className="text-sm tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Appointments
        </span>
      ),
      children: <div>Tab 7</div>,
    },
    {
      key: "8",
      label: (
        <span className="text-sm tracking-wider text-gray-600 hover:text-blue-600 uppercase">
          Communication
        </span>
      ),
      children: <Chat />,
    },
    {
      key: "9",
      label: (
        <span className="text-sm tracking-wider text-gray-600 hover:text-blue-600 uppercase">
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
      {/* <Tabs value={value} onChange={handleChange}>
        <Tab label="profile" className="hover:text-blue-600" value="1" />
        <Tab label="Questionnaires" className="hover:text-blue-600" value="2" />
        <Tab label="Documents" className="hover:text-blue-600" value="3" />
        <Tab label="Forms" className="hover:text-blue-600" value="4" />
        <Tab label="Tasks" className="hover:text-blue-600" value="5" />
        <Tab
          label="Agreements and Letters"
          className="hover:text-blue-600"
          value="6"
        />
        <Tab label="Appointments" className="hover:text-blue-600" value="7" />
        <Tab label="Communication" className="hover:text-blue-600" value="8" />
        <Tab label="Billing" className="hover:text-blue-600" value="9" />
      </Tabs>
      <CustomTab index="1">
        <ProfileTab />
      </CustomTab>
      <CustomTab index="2">
        <div>Tab 2</div>
      </CustomTab>
      <CustomTab index="3">
        <Document />
      </CustomTab>
      <CustomTab index="4">
        <div>Tab 4</div>
      </CustomTab>
      <CustomTab index="5">
        <Tasks />
      </CustomTab>
      <CustomTab index="6">
        <div>Tab 6</div>
      </CustomTab>
      <CustomTab index="7">
        <div>Tab 7</div>
      </CustomTab>
      <CustomTab index="8">
        <Chat />
      </CustomTab>
      <CustomTab index="9">
        <div>Tab 9</div>
      </CustomTab> */}
    </div>
  );
};

export default Body;
