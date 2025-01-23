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

import * as caseTypes from "./docUploadForms/utils/caseTypeConstants";
import * as reportNames from "./docUploadForms/utils/reportNameConstants";

const Document = () => {
  const lead = useSelector((state) => state.client.details);
  const [open, setOpen] = useState(false);
  const [docObj, setDocObj] = useState(false);
  const [loading, setLoading] = useState(true);

  const getReportName = (case_type) => {
    switch (case_type) {
      case caseTypes.STUDY_PERMIT_EXTENSION:
        return reportNames.STUDY_PERMIT_EXTENSION;
      case caseTypes.STUDY_VISA:
        return reportNames.STUDY_VISA;
      case caseTypes.STUDY_WORK_PERMIT_EXTENSION:
        return reportNames.STUDY_WORK_PERMIT_EXTENSION;
      case caseTypes.STUDY_SPOUSE:
        return reportNames.STUDY_SPOUSE;
      case caseTypes.USA:
        return reportNames.USA;
      case caseTypes.VISITOR_TO_STUDY:
        return reportNames.VISITOR_TO_STUDY;
      case caseTypes.VISITOR_VISA:
        return reportNames.VISITOR_VISA;
      case caseTypes.WORK_PERMIT_EXTENSION:
        return reportNames.WORK_PERMIT_EXTENSION;
      case caseTypes.WORK_VISA:
        return reportNames.WORK_VISA;
      default:
        console.log("Error: Case Type and Report Name mismatch.");
    }
  };

  let embedCode = null;

  const getEmbedCode = (case_type) => {
    switch (case_type) {
      case caseTypes.STUDY_PERMIT_EXTENSION:
        embedCode = `https://creatorapp.zohopublic.in/torontoimmigrationcompany/visa-management/report-embed/All_Study_Permit_Extensions/ZGBbQZTNdFWEU9sngxmGpwU91QbHuD6sQMHpVEkp2fCG65BnP0x33m5f46KZt8C5E30m25ZURXEp8XU9O35qRdmujNhFbHqzbgpC${lead.ID}?zc_AddRec=false&zc_Search=false&zc_Footer=false&zc_ReportName=false&zc_ShowAs=false`;
        break;
      case caseTypes.STUDY_VISA:
        embedCode = `https://creatorapp.zohopublic.in/torontoimmigrationcompany/visa-management/report-embed/All_Study_Visa/DfQnd4UJdht3Wrrr9y8rAY3AC0pXXtTP6249R0DB7PF3sVfJsa0pVqH745nOwUdftgwDBY4GNvHPDQTgH3ORzxsVm7K0avDrZNKJ${lead.ID}?zc_AddRec=false&zc_Search=false&zc_Footer=false&zc_ReportName=false&zc_ShowAs=false`;
        break;
      case caseTypes.STUDY_WORK_PERMIT_EXTENSION:
        embedCode = `https://creatorapp.zohopublic.in/torontoimmigrationcompany/visa-management/report-embed/All_Study_Work_Permit_Extensions/qWfOsseKVe3bVdWq8p0J6j5RjGhszzAvAMpBkAkG34sfhbxRN7geesJpCC6vXmAGjYkY8bxtHhAVzA7U8muCNmhPzDbW5udMBz9s${lead.ID}?zc_AddRec=false&zc_Search=false&zc_Footer=false&zc_ReportName=false&zc_ShowAs=false`;
        break;
      case caseTypes.STUDY_SPOUSE:
        embedCode = `https://creatorapp.zohopublic.in/torontoimmigrationcompany/visa-management/report-embed/Study_Spouse_Report/TquvmjdCXsYUyhbNgETuQ8z3kwfGKDaDTmdC2MZmZF35u7r5dUU8s8As66ney2MD7uy7erhdbKT0rx8Jg07WXwY6VOvyevsh69Oz${lead.ID}?zc_AddRec=false&zc_Search=false&zc_Footer=false&zc_ReportName=false&zc_ShowAs=false`;
        break;
      case caseTypes.USA:
        embedCode = `https://creatorapp.zohopublic.in/torontoimmigrationcompany/visa-management/report-embed/All_Usa/njC7tm6yDusqm7DG07741jnU38AuPqqpvwRmjWKxzyf9QadzA4ZYKqhBCSk5J6wgb7JRbK8u2rACEh3pbOvdJ6WfqKOeJsJPQgX8${lead.ID}?zc_AddRec=false&zc_Search=false&zc_Footer=false&zc_ReportName=false&zc_ShowAs=false`;
        break;
      case caseTypes.VISITOR_TO_STUDY:
        embedCode = `https://creatorapp.zohopublic.in/torontoimmigrationcompany/visa-management/report-embed/All_Visitor_Studies/zHzPAsZ1hmm552uX5ejhezvrJuMka2PRB1wOZRMxt3kR55AYjUJVxfB1huNYYFx4jhSp4KSH4TJRhTZ49T0rEkr2PFYsbexnPMKO${lead.ID}?zc_AddRec=false&zc_Search=false&zc_Footer=false&zc_ReportName=false&zc_ShowAs=false`;
        break;
      case caseTypes.VISITOR_VISA:
        embedCode = `https://creatorapp.zohopublic.in/torontoimmigrationcompany/visa-management/report-embed/All_Visitor_Visa/EhdWqfV2EXPCPhOrE4nNgaJWE3sD1HtV5OfBVXrYugDZp3B5h0Onz9ESz7V0nQS4B8MS9NKSa2nADBRXV9rGvrpJEYH1qOVYCD1J?Lead=${lead.ID}zc_AddRec=false&zc_Search=false&zc_Footer=false&zc_ReportName=false&zc_ShowAs=false`;
        break;
      case caseTypes.WORK_PERMIT_EXTENSION:
        embedCode = `https://creatorapp.zohopublic.in/torontoimmigrationcompany/visa-management/report-embed/All_Work_Permit_Extensions/fyS2p7YjzZ44NB8JQ77qQvPmtaJ3VnmfTUUAb3yMnZ222YpVO1CTafbOpJyS6RfCa7WfCP1GkVpxkxCuaO9B8xjPrfNTXu8qhTpF${lead.ID}?zc_AddRec=false&zc_Search=false&zc_Footer=false&zc_ReportName=false&zc_ShowAs=false`;
        break;
      case caseTypes.WORK_VISA:
        embedCode = `https://creatorapp.zohopublic.in/torontoimmigrationcompany/visa-management/report-embed/All_Work_Visa/j4YzA2yny7ZD3zAmO5ESGr1EF7U0RT2guC5EyhfzvMsUnHFs6XwNZkuxwD2GBfS4m1D5bEvV5x2GC1fq2gDMznKR4XrNSkOMAjgy${lead.ID}?zc_AddRec=false&zc_Search=false&zc_Footer=false&zc_ReportName=false&zc_ShowAs=false`;
        break;
      default:
        console.log("Error: Case Type and Report Name mismatch.");
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
    getEmbedCode(lead.Case_Type);
    return (
      <div className="p-2">
        {docObj ? (
          embedCode !== null && (
            <iframe height="100%" width="100%" src={embedCode}></iframe>
          )
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
              {lead.Case_Type === caseTypes.STUDY_PERMIT_EXTENSION && (
                <StudyPermitExtension setDocObj={setDocObj} />
              )}
              {lead.Case_Type === caseTypes.STUDY_VISA && (
                <StudyVisa setDocObj={setDocObj} />
              )}
              {lead.Case_Type === caseTypes.STUDY_WORK_PERMIT_EXTENSION && (
                <StudyWorkPermitExtension setDocObj={setDocObj} />
              )}
              {lead.Case_Type === caseTypes.STUDY_SPOUSE && (
                <StudySpouse setDocObj={setDocObj} />
              )}
              {lead.Case_Type === caseTypes.USA && (
                <USA setDocObj={setDocObj} />
              )}
              {lead.Case_Type === caseTypes.VISITOR_TO_STUDY && (
                <VisitorStudies setDocObj={setDocObj} />
              )}
              {lead.Case_Type === caseTypes.VISITOR_VISA && (
                <VisitorVisa setDocObj={setDocObj} />
              )}
              {lead.Case_Type === caseTypes.WORK_PERMIT_EXTENSION && (
                <WorkPermitExtension setDocObj={setDocObj} />
              )}
              {lead.Case_Type === caseTypes.WORK_VISA && (
                <WorkVisa setDocObj={setDocObj} />
              )}
            </Modal>
          </>
        )}
      </div>
    );
  }
};

export default Document;
