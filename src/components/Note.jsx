import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Note = () => {
  const [openForm, setOpenForm] = useState(false);
  const lead = useSelector((state) => state.client.details);
  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline w-full">
        <div className="flex items-center gap-2">
          <div className="p-1 border border-blue-600 rounded-full">
            <svg
              className="w-6 h-6 text-blue-600 font-normal dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
              />
            </svg>
          </div>
          <div className="text-sm">
            <b>Test</b>
            <div>Arunkumar A.</div>
          </div>
        </div>
        <div className="font-light text-sm">Oct 26, 2024</div>
      </div>
      <div className="ml-10 box-border box-shadow px-[15px] py-[15px] text-sm">
        <p>{lead?.Description}</p>
        <div className="flex justify-end gap-3 text-lg">
          <i className="bi bi-pencil text-blue-600"></i>
          <i className="bi bi-trash text-red-600"></i>
        </div>
      </div>
    </div>
  );
};

export default Note;
