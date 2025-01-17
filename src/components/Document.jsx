import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

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
            footer={<></>}
            onClose={() => setOpen((curr) => !curr)}
            onCancel={() => setOpen((curr) => !curr)}
          >
            <div className="p-2">
              <Form>
                <Form.Item label="Test">
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button>Submit</Button>
                </Form.Item>
              </Form>
            </div>
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
