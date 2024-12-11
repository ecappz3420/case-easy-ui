import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Select } from "antd";
const TeamMembers = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const users = useSelector((state) => state.teamMember.details);
  const leadData = useSelector((state) => state.client.details);

  useEffect(() => {
    if (users && Array.isArray(users)) {
      const allUsers = users.map((user) => ({
        label: user.User_Name,
        value: user.User_Name,
      }));
      setOptions(allUsers);
    }
  }, [users]);

  return (
    <>
      {open === false ? (
        <>
          <div className="flex justify-between border-b">
            <div className="font-bold text-lg">Team Members</div>
            <div
              className="cursor-pointer text-blue-600 text-sm"
              onClick={() => setOpen(true)}
            >
              Edit
            </div>
          </div>
          <div className="p-3">
            <div className="flex justify-center">
              <i className="bi bi-folder-x text-[100px] text-blue-600"></i>
            </div>
            <div className="font-semibold text-blue-600 text-lg text-center">
              No Team Member Assigned
            </div>
            <div className="mt-3 text-sm text-center">
              Only you have the access to the case
            </div>
            <div className="mt-3 text-sm text-center">
              Click{" "}
              <span
                onClick={() => setOpen(true)}
                className="text-blue-600 cursor-pointer"
              >
                here
              </span>{" "}
              to get Started
            </div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between border-b">
            <div className="font-bold text-lg">Team Members</div>
            <div className="cursor-pointer text-blue-600 text-sm flex gap-2">
              <div onClick={() => setOpen(false)}>Save</div>
              <div onClick={() => setOpen(false)}>Cancel</div>
            </div>
          </div>
          <div className="mt-2">
            <Select
              allowClear
              options={options}
              value={leadData ? leadData.Assigned_to.display_value : ""}
              className="w-full"
            />
          </div>
        </>
      )}
    </>
  );
};

export default TeamMembers;
