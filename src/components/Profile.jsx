import React, { useState, useEffect } from "react";
import { Drawer, Modal, Upload, Tooltip } from "antd";
import ChatMessage from "./ChatMessage";
import Email from "./Email";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const leadData = useSelector((state) => state.client.details);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {});

  const uploadProfilePicture = async (img) => {
    try {
      const config = {
        appName: "visa-management",
        reportName: "All_Leads",
        id: leadData.ID,
        fieldName: "Profile_Picture",
        file: img,
      };
      await ZOHO.CREATOR.init();
      const response = await ZOHO.CREATOR.API.uploadFile(config);
      setImageUrl(img);
      setOpenProfileModal(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
        <div className="py-2 px-[30px] flex justify-center items-center">
          <div className="rounded-full relative bg-sky-100 h-[130px] w-[130px] flex justify-center items-center">
            {imageUrl ? (
              <img src={imageUrl} />
            ) : (
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
            )}

            <Tooltip title="Click to change photo">
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
              onCancel={() => setOpenProfileModal(false)}
              onClose={() => setOpenProfileModal(false)}
              title="Upload Image"
              footer={<></>}
            >
              <div className="flex justify-center">
                <Upload
                  name="profile-pic"
                  listType="picture-card"
                  className="text-center"
                  maxCount={1}
                  action={uploadProfilePicture}
                >
                  <img src={imageUrl} alt="Upload" />
                </Upload>
              </div>

              <div className="text-center text-sm mt-2">
                Supported formats: <br /> JPG/JPEG, PNG
              </div>
              <div className="text-center text-md mt-3">
                Click to Upload your Image
              </div>
            </Modal>
          </div>
        </div>
        <div className="">
          <div className="text-xl font-semibold py-2 text-blue-500">
            {leadData
              ? `${leadData.Name.first_name} ${leadData.Name.last_name}`
              : ""}
          </div>
          <div className="text-xs font-semibold mb-1">
            Marital Status:{" "}
            <span className="font-normal me-1">
              {leadData ? leadData.Marital_Status : ""}{" "}
            </span>
            <span className="text-xs font-semibold">
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
          <div className="text-xs font-semibold">
            Country of Residence:{" "}
            <span className="font-normal me-1">
              {leadData ? leadData.Country_of_Residence : ""}{" "}
            </span>
            <span className="text-xs font-semibold">
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
            <Tooltip title="test@gmail.com" placement="bottom">
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
            <Tooltip placement="bottom" title="62399-72229">
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
            <Tooltip placement="bottom" title="62399-72229">
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
            <Tooltip placement="bottom" title="62399-72229">
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
