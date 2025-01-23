import React from "react";
import { Form, Checkbox, DatePicker, Input, Button, Flex } from "antd";

const NoteForm = ({ handleClick }) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const onFinish = (data) => {
    handleClick();
    console.log("Submitted data: ", data);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      scrollToFirstError={true}
      onFinish={onFinish}
    >
      <Form.Item label="Date" name="Date">
        <DatePicker format="DD-MMM-YYYY" className="w-[300px]" />
      </Form.Item>
      <Form.Item label="Subject (Optional)" name="Subject_Optional">
        <Input className="w-[300px] rounded"></Input>
      </Form.Item>
      <Form.Item label="Notes" name="Notes">
        <TextArea
          maxLength={100}
          style={{
            height: 200,
            resize: "none",
          }}
          className="w-[300px]"
        />
      </Form.Item>
      <Form.Item
        name="Notify_assigned_team_by_email"
        valuePropName="checked"
        layout="horizontal"
      >
        <Checkbox>Notify assigned team by email</Checkbox>
      </Form.Item>
      <Flex justify="center" gap="large">
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="w-28 rounded">
            Save
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default NoteForm;
