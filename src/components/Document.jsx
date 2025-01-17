import { Button, Form, Input, Modal } from "antd";
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
        <div className="text-end">
          <Button type="primary" onClick={() => setOpen(true)}>
            Upload Document
          </Button>
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
        <div className="mt-3">
          {docObj ? (
            <></>
          ) : (
            <div className="text-center text-2xl">
              <Form>
                <Form.Item label="Passport">
                  <a href="#">Passport.pdf</a>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Document;
