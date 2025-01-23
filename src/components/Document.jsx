import { Button, Modal, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
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
import { fetchRecords } from "../api/fetchRecords";
const Document = () => {
  const lead = useSelector((state) => state.client.details);
  const [open, setOpen] = useState(false);
  const [docObj, setDocObj] = useState(false);
  const [loading, setLoading] = useState(true);

  const getReportName = (case_type) => {
    switch (case_type) {
      case "USA":
        return "All_Usa";
      case "Study Visa":
        return "All_Study_Visa";
    }
  };

  useEffect(() => {
    if (!lead) return;
    const fetchDocument = async () => {
      try {
        const report_name = getReportName(lead.Case_Type);
        const records = await fetchRecords(report_name, `Lead == ${lead.ID}`);
        setLoading(false);
        if (records.length > 0) {
          setDocObj(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocument();
  }, [lead]);

  if (loading) {
    return <Skeleton className="mt-3" />;
  }

  if (!lead) {
    return <div>Error 404</div>;
  } else {
    return (
      <div className="p-2">
        {docObj ? (
          <>
            <iframe
              height="100%"
              width="100%"
              src="https://creatorapp.zohopublic.in/torontoimmigrationcompany/visa-management/report-embed/All_Usa/njC7tm6yDusqm7DG07741jnU38AuPqqpvwRmjWKxzyf9QadzA4ZYKqhBCSk5J6wgb7JRbK8u2rACEh3pbOvdJ6WfqKOeJsJPQgX8?zc_AddRec=false&zc_Search=false&zc_Footer=false&zc_ReportName=false&zc_ShowAs=false"
            ></iframe>
          </>
        ) : (
          <>
            <div className="flex h-[600px] mt-2 flex-col items-center">
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
              {lead.Case_Type === "USA" && <USA setDocObj={setDocObj} />}
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
