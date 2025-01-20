import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

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
  } else {
    return (
      <div className="p-2">
        {docObj ? (
          <USADocumentView />
        ) : (
          <>
            <div className="flex h-[600px] mt-2 flex-col justify-center items-center">
              <div>
                <i className="bi bi-folder-x text-[100px] text-blue-600"></i>
              </div>
              <div className="font-semibold text-lg">
                No Documents were uploaded
              </div>
              <div className="mt-3 text-sm">
                There are no Documents uploaded as yet.
              </div>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={() => setOpen(true)}
                className="mt-4"
              >
                Upload Documents
              </Button>
            </div>

            <Modal
              open={open}
              width={"80vw"}
              footer={null}
              onClose={() => setOpen((curr) => !curr)}
              onCancel={() => setOpen((curr) => !curr)}
            >
              {lead.Case_Type === "Study Permit Extension" && (
                <StudyPermitExtension />
              )}
              {lead.Case_Type === "Study Visa" && <StudyVisa />}
              {lead.Case_Type === "Study+ Work Permit Extension" && (
                <StudyWorkPermitExtension />
              )}
              {lead.Case_Type === "Study+Spouse" && <StudySpouse />}
              {lead.Case_Type === "USA" && <USA />}
              {lead.Case_Type === "Visitor to Study" && <VisitorStudies />}
              {lead.Case_Type === "Visitor Visa" && <VisitorVisa />}
              {lead.Case_Type === "Work Permit Extension" && (
                <WorkPermitExtension />
              )}
              {lead.Case_Type === "Work Visa" && <WorkVisa />}
            </Modal>
          </>
        )}
      </div>
    );
  }
};

export default Document;
