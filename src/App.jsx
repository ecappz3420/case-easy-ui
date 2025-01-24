import React, { useEffect } from "react";
import Profile from "./components/Profile";
import Buttonrow from "./components/Buttonrow";
import "bootstrap-icons/font/bootstrap-icons.css";
import Body from "./components/Body";
import { useDispatch } from "react-redux";
import { setClient } from "./store/slices/clientSlice";
import fetchRecordByID from "./api/fetch";
import { setTeamMember } from "./store/slices/teamMemberSlice";
import { fetchRecords } from "./api/fetchRecords";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const runApi = async () => {
      await ZOHO.CREATOR.init();
      const queryParams = await ZOHO.CREATOR.UTIL.getQueryParams();
      const result = await fetchRecordByID(queryParams.lead);
      dispatch(setClient(result));
      const response = await fetchRecords("All_Users", "ID != 0");
      dispatch(setTeamMember(response));
    };
    runApi();
  }, [dispatch]);
  return (
    <div className="bg-slate-100 p-2 monsterrat">
      <Profile />
      <Buttonrow />
      <Body />
    </div>
  );
};

export default App;
