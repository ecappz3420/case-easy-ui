import React from "react";
import { Form } from "antd";

const USADocumentView = () => {
  return (
    <div className="text-center text-2xl">
      <Form>
        <Form.Item label="Passport">
          <a href="#">Passport.pdf</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default USADocumentView;
