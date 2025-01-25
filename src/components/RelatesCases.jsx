import React from "react";

const RelatesCases = () => {
  return (
    <>
      <div className="flex justify-between border-b">
        <div className="font-bold text-base">Related Cases</div>
      </div>
      <div className="p-3">
        <div className="flex justify-center">
          <i className="bi bi-folder-x text-[100px] text-blue-600"></i>
        </div>
        <div className="font-semibold text-blue-600 text-sm text-center">
          No Related Case
        </div>
        <div className="mt-3 text-xs text-center">
          There are no Related Case
        </div>
      </div>
    </>
  );
};

export default RelatesCases;
