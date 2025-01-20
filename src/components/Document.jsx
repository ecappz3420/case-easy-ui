import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import StudyPermitExtension from "../components/docUploadForms/StudyPermitExtension";
import StudySpouse from "../components/docUploadForms/StudySpouse";
import StudyVisa from "../components/docUploadForms/StudyVisa";
import StudyWorkPermitExtension from "../components/docUploadForms/StudyWorkPermitExtension";
import USA from "../components/docUploadForms/USA";
import VisitorStudies from "../components/docUploadForms/VisitorStudies";
import VisitorVisa from "../components/docUploadForms/VisitorVisa";
import WorkPermitExtension from "../components/docUploadForms/WorkPermitExtension";
import WorkVisa from "../components/docUploadForms/WorkVisa";
import USADocumentView from "./USADocumentView";

const Document = () => {
  const lead = useSelector((state) => state.client.details);
  const [open, setOpen] = useState(false);
  const [docObj, setDocObj] = useState(null);

  if (!lead) {
    return <div>Error 404</div>;
  }
  if (lead.Case_Type === "USA") {
    return (
      <div className="p-2">
        {docObj ? (
          <USADocumentView />
        ) : (
          <div className="">
            <div className="h-[40vh] flex justify-center items-center">
              <Button type="primary" onClick={() => setOpen(true)}>
                Upload Documents
              </Button>
            </div>

            <Modal
              open={open}
              width={"80vw"}
              footer={<></>}
              onClose={() => setOpen((curr) => !curr)}
              onCancel={() => setOpen((curr) => !curr)}
            >
              <USA />
            </Modal>
          </div>
        )}
      </div>
    );
  }
};

export default Document;
