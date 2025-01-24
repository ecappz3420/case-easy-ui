import React from "react";
import ProfileCard from "./ProfileCard";
import CaseInfo from "./CaseInfo";
import TeamMembers from "./TeamMembers";
import Reminders from "./Reminders";
import Milestones from "./Milestones";
import RelatesCases from "./RelatesCases";

const ProfileTab = () => {
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
        {/* {Profile} */}
        <div className="h-[350px] rounded border p-2 mb-3 box-shadow">
          <ProfileCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
          <div className="h-[350px] rounded mb-3 box-shadow border p-2">
            <CaseInfo />
          </div>
          <div className="h-[350px] rounded mb-3 box-shadow border p-2">
            <TeamMembers />
          </div>
        </div>
        <div className="h-[350px] rounded border mb-3 box-shadow p-2">
          <Reminders />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
          <div className="h-[350px] rounded mb-3 box-shadow border p-2">
            <Milestones />
          </div>
          <div className="h-[350px] rounded mb-3 box-shadow border p-2">
            <RelatesCases />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
