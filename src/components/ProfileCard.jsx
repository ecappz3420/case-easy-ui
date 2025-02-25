import React from "react";
import { useSelector } from "react-redux";
const ProfileCard = () => {
  const client = useSelector((state) => state.client.details);
  return (
    <>
      <div className="flex justify-between border-b text-xs">
        <div className="font-bold text-base">Profile Details</div>
        <a
          className="cursor-pointer text-blue-600 text-xs"
          href={`https://creatorapp.zoho.in/torontoimmigrationcompany/visa-management/#Form:Lead?recLinkID=${
            client ? client.ID : 0
          }&viewLinkName=LeadsA`}
          target="_Blank"
        >
          Edit
        </a>
      </div>
      <div className="overflow-y-auto h-[270px]">
        <div className="flex justify-between mt-3">
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              First Name
            </div>
            <div className="text-xs">
              {client ? client.Name.first_name : "-"}
            </div>
          </div>
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Last Name
            </div>
            <div className="text-xs">
              {client ? client.Name.last_name : "-"}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Date of Birth
            </div>
            <div className="text-xs">{client ? client.DOB : ""}</div>
          </div>
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">Age</div>
            <div className="text-xs">{client ? client?.Age : ""}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Country of Residence
            </div>
            <div className="text-xs">
              {client ? client.Country_of_Residence : ""}
            </div>
          </div>
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Country of Citizenship
            </div>
            <div className="text-xs">{}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Marital Status
            </div>
            <div className="text-xs">{client ? client?.Marital_Status : ""}</div>
          </div>
          {/* <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Client ID
            </div>
            <div className="text-xs">{client ? client.ID : ""}</div>
          </div> */}
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Created By
            </div>
            <div className="text-xl">
              <i className="bi bi-dash-lg"></i>
            </div>
          </div>
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Login Email
            </div>
            <div className="text-xs">{client ? client.Email : ""}</div>
          </div>
        </div>
        <div className="flex justify-between">
          {/* <div className="w-1/2 mb-1"></div> */}
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Primary Phone
            </div>
            <div className="text-xs">{client ? client.Mobile : ""}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Other Emails
            </div>
            <div className="text-xl">
              <i className="bi bi-dash-lg"></i>
            </div>
          </div>
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs uppercase">
              Other Contacts
            </div>
            <div className="text-xs">
              {client ? client.Secondary_Number : ""}
            </div>
          </div>
        </div>
        <div className="text-slate-500 font-semibold text-xs uppercase">
          Description
        </div>
        <div className="text-xs mb-1">
          {client ? client.Description : "-"}
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs">
              Associated Company
            </div>
            <div className="text-xl">
              <i className="bi bi-dash-lg"></i>
            </div>
          </div>
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs">UCI</div>
            <div className="text-xl">
              <i className="bi bi-dash-lg"></i>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs">
              Passport No
            </div>
            <div className="text-xl">
              <i className="bi bi-dash-lg"></i>
            </div>
          </div>
          <div className="w-1/2 mb-1">
            <div className="text-slate-500 font-semibold text-xs">
              Passport Expiry
            </div>
            <div className="text-xl">
              <i className="bi bi-dash-lg"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
