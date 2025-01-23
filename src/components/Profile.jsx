import React, { useState } from "react";
import { Drawer, Modal } from "antd";
import { Tooltip } from "flowbite-react";
import ChatMessage from "./ChatMessage";
import Email from "./Email";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const leadData = useSelector((state) => state.client.details);
  const [imageUrl, setImageUrl] = useState();

  return (
    <div className="">
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
        <div className="py-2 px-[30px] flex justify-center items-center">
          <div className="rounded-full relative bg-sky-100 h-[130px] w-[130px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-cyan-500 icon icon-tabler icons-tabler-filled icon-tabler-user"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
              <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
            </svg>
            <Tooltip className="text-nowrap" content="Click to change photo">
              <span
                onClick={() => setOpenProfileModal(true)}
                className="absolute bottom-[10px] cursor-pointer right-0 bg-white hover:bg-blue-200 hover:transition-all transition-all rounded-full border p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-camera"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                </svg>
              </span>
            </Tooltip>
            <Modal
              open={openProfileModal}
              width={"50vw"}
              footer={null}
              onClose={() => setOpenProfileModal((curr) => !curr)}
              onCancel={() => setOpenProfileModal((curr) => !curr)}
            >
              <div className="flex justify-between mb-[30px]">
                <div className="text-lg">Upload Image</div>
                <div
                  className="cursor-pointer"
                  onClick={() => setOpenProfileModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <label className="w-[150px] cursor-pointer h-[140px] border border-dashed rounded hover:border-blue-600 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-plus-lg text-gray-500"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                    />
                  </svg>
                </label>
                <input type="file" className="hidden" />
              </div>
              <div className="text-center text-sm mt-2">
                Supported formats: <br /> JPG/JPEG, PNG
              </div>
              <div className="text-center text-md mt-3">
                Click to Upload your Image
              </div>
              <div className="mt-[30px] text-end">
                <button
                  onClick={() => setOpenProfileModal(false)}
                  className="text-blue-600 p-2 rounded hover:bg-blue-50"
                >
                  Close
                </button>
              </div>
            </Modal>
          </div>
        </div>
        <div className="">
          <div className="text-2xl font-semibold py-2 text-blue-500">
            {leadData
              ? `${leadData.Name.first_name} ${leadData.Name.last_name}`
              : ""}
          </div>
          <div className="text-sm font-semibold">
            Marital Status:{" "}
            <span className="font-normal">
              {leadData ? leadData.Marital_Status : ""}{" "}
            </span>
            <span className="text-sm font-semibold">
              Date of Birth:{" "}
              <span className="font-normal">
                {leadData ? leadData.DOB : ""}
              </span>
            </span>
            {leadData && leadData.Age && (
              <small className="bg-blue-600 p-1 rounded-xl text-white font-semibold text-[10px] ms-2">
                {leadData && leadData.AGE && `AGE:${leadData.Age}`}
              </small>
            )}
          </div>
          <div className="text-sm font-semibold">
            Country of Residence:{" "}
            <span className="font-normal">
              {leadData ? leadData.Country_of_Residence : ""}{" "}
            </span>
            <span className="text-sm font-semibold">
              Client ID:{" "}
              <span className="font-normal">
                {leadData ? leadData.Lead_id : ""}
              </span>
            </span>
          </div>
          <div className="flex gap-[30px] my-3">
            <div
              className="flex justify-center flex-col items-center"
              onClick={() => setOpen(true)}
            >
              <div className="flex justify-center p-2 rounded-full bg-white hover:bg-blue-100 cursor-pointer transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler text-blue-500 icons-tabler-outline icon-tabler-messages"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                  <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                </svg>
              </div>
              <div className="text-xs text-blue-600">Chat</div>
            </div>
            <Drawer
              open={open}
              closeIcon={false}
              onClose={() => setOpen(false)}
              width="700"
            >
              <ChatMessage />
            </Drawer>
            <Tooltip style="dark" content="test@gmail.com" placement="bottom">
              <div
                className="flex justify-center flex-col items-center"
                onClick={() => setOpenEmail(true)}
              >
                <div className="flex justify-center p-2 rounded-full bg-white hover:bg-blue-100 cursor-pointer transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-mail text-blue-500"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                    <path d="M3 7l9 6l9 -6" />
                  </svg>
                </div>
                <div className="text-xs text-blue-600">Email</div>
              </div>
              <Drawer
                open={openEmail}
                closeIcon={false}
                onClose={() => setOpenEmail(false)}
                width="70vw"
                className="h-dvh overflow-y-hidden"
              >
                <Email />
              </Drawer>
            </Tooltip>
            <Tooltip style="dark" placement="bottom" content="62399-72229">
              <a href="https://web.telegram.org/k/#6239972229" target="_Blank">
                <div className="flex justify-center flex-col items-center">
                  <div className="flex justify-center p-2 rounded-full bg-white hover:bg-blue-100 cursor-pointer transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram text-blue-500"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                    </svg>
                  </div>
                  <div className="text-xs text-blue-600">Telegram</div>
                </div>
              </a>
            </Tooltip>
            <Tooltip placement="bottom" content="62399-72229">
              <a
                href="https://api.whatsapp.com/send?phone=6239972229"
                target="_Blank"
              >
                <div className="flex justify-center flex-col items-center">
                  <div className="flex justify-center p-2 rounded-full bg-white hover:bg-blue-100 cursor-pointer transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp text-blue-500"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                    </svg>
                  </div>
                  <div className="text-xs text-blue-600">Whatsapp</div>
                </div>
              </a>
            </Tooltip>
            <Tooltip placement="bottom" content="62399-72229">
              <a href="">
                <div className="flex justify-center items-center flex-col">
                  <div className="flex justify-center p-2 rounded-full bg-white hover:bg-blue-100 cursor-pointer transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-device-mobile text-blue-500"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
                      <path d="M11 4h2" />
                      <path d="M12 17v.01" />
                    </svg>
                  </div>
                  <div className="text-xs text-blue-600">Text</div>
                </div>
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
