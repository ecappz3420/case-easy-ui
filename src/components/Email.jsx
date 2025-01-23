import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import React from "react";
import { Form, Select, Button, Input, Flex } from "antd";

const Email = () => {
  const [form] = Form.useForm();

  const onFinish = (data) => {
    console.log("Submitted data: ", data);
  };
  return (
    <div className="p-2 border rounded">
      <Form
        form={form}
        layout="vertical"
        scrollToFirstError={true}
        onFinish={onFinish}
      >
        <div className="h-[80vh] overflow-y-auto">
          <Form.Item label="From" name="From" className="w-[300px]">
            <Select
              allowClear
              options={[{ value: "test@gmail.com", label: "test@gmail.com" }]}
            />
          </Form.Item>

          <Form.Item label="To" name="To" className="w-[300px]">
            <Select
              mode="multiple"
              allowClear
              options={[{ value: "test@gmail.com", label: "test@gmail.com" }]}
            />
          </Form.Item>
          <Form.Item
            label="Send a copy to team member"
            name="Send_a_copy_to_team_member"
            className="w-[300px]"
          >
            <Select
              allowClear
              options={[{ value: "test@gmail.com", label: "test@gmail.com" }]}
            />
          </Form.Item>
          <Form.Item label="Subject" name="Subject">
            <Input className="w-[300px] rounded"></Input>
          </Form.Item>
          <div className="flex flex-col gap-2 mb-4">
            <FroalaEditorComponent
              tag="textarea"
              config={{
                heightMin: 300,
              }}
            />
          </div>
        </div>
        <Flex justify="center" gap="large">
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" className="w-28">
              Submit
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};

export default Email;
