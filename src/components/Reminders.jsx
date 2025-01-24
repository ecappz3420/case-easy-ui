import React from "react";
import { useState } from "react";
import {
  Modal,
  Form,
  Checkbox,
  DatePicker,
  Input,
  Radio,
  Select,
  Button,
  Flex,
} from "antd";

const Reminders = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const [open, setOpen] = useState(false);

  const onFinish = (data) => {
    const formattedData = {
      ...data,
      // Format date fields
      Expires: data.Expires?.format("DD-MMM-YYYY") || "",
      Reminder_Date: data.Reminder_Date?.format("DD-MMM-YYYY") || "",
    };
    console.log("Submitted data: ", formattedData);
  };

  return (
    <>
      <div className="flex justify-between border-b">
        <div className="font-bold text-lg">Reminders</div>
        <div
          className="cursor-pointer text-blue-600 text-sm"
          onClick={() => setOpen(true)}
        >
          Create
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-center">
          <i className="bi bi-folder-x text-[100px] text-blue-600"></i>
        </div>
        <div className="font-semibold text-blue-600 text-lg text-center">
          No Reminders Created
        </div>
        <div className="mt-3 text-sm text-center">
          There is no Reminders yet.
        </div>
        <div className="mt-3 text-sm text-center">
          Click{" "}
          <span
            onClick={() => setOpen(true)}
            className="text-blue-600 cursor-pointer"
          >
            here
          </span>{" "}
          to get Started
        </div>
      </div>
      <Modal
        title="Add Reminder"
        open={open}
        width={"80vw"}
        footer={null}
        onClose={() => setOpen((curr) => !curr)}
        onCancel={() => setOpen((curr) => !curr)}
      >
        <Form
          form={form}
          layout="vertical"
          scrollToFirstError={true}
          onFinish={onFinish}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 mt-5">
            <Form.Item
              label="Expires"
              name="Expires"
              rules={[
                {
                  required: true,
                  message: "Kindly select Expire Date!",
                },
              ]}
              className="w-[300px] md:max-w-[180px] lg:max-w-[250px]"
            >
              <DatePicker
                format="DD-MMM-YYYY"
                className="w-[300px] md:max-w-[180px] lg:max-w-[250px]"
              />
            </Form.Item>
            <Form.Item
              label="Send Reminder"
              name="Send_Reminder"
              rules={[
                {
                  required: true,
                  message: "Kindly select when to Send Reminder!",
                },
              ]}
              className="w-[300px] md:max-w-[180px] lg:max-w-[250px]"
            >
              <Select
                placeholder="Please Select"
                options={[
                  {
                    value: "Within 3 Days of expiration",
                    label: "Within 3 Days of expiration",
                  },
                  {
                    value: "Within 5 Days of expiration",
                    label: "Within 5 Days of expiration",
                  },
                  {
                    value: "Within 7 Days of expiration",
                    label: "Within 7 Days of expiration",
                  },
                  {
                    value: "Within 15 Days of expiration",
                    label: "Within 15 Days of expiration",
                  },
                  {
                    value: "Within 30 Days of expiration",
                    label: "Within 30 Days of expiration",
                  },
                  {
                    value: "Within 60 Days of expiration",
                    label: "Within 60 Days of expiration",
                  },
                  {
                    value: "Within 90 Days of expiration",
                    label: "Within 90 Days of expiration",
                  },
                  {
                    value: "Within 120 Days of expiration",
                    label: "Within 120 Days of expiration",
                  },
                ]}
                className="md:max-w-[180px] lg:max-w-[250px]"
              />
            </Form.Item>
            <Form.Item
              label="Reminder Date"
              name="Reminder_Date"
              rules={[
                {
                  required: true,
                  message: "Kindly select Reminder Date!",
                },
              ]}
              className="w-[300px] md:max-w-[180px] lg:max-w-[250px]"
            >
              <DatePicker
                format="DD-MMM-YYYY"
                className="w-[300px] md:max-w-[180px] lg:max-w-[250px]"
              />
            </Form.Item>
          </div>
          <fieldset className="flex flex-col gap-4 p-0">
            <legend className="!mb-1 !text-black !border-b-0">
              Notifications
            </legend>
            <Form.Item name="Notify">
              <Radio.Group>
                <Radio value="SMS">SMS</Radio>
                <Radio value="Email">Email</Radio>
                <Radio value="Chat">Chat</Radio>
              </Radio.Group>
            </Form.Item>
          </fieldset>
          <Form.Item label="Subject" name="Subject">
            <Input />
          </Form.Item>
          <Form.Item
            label="Message"
            name="Message"
            rules={[
              {
                required: true,
                message: "Kindly input Message!",
              },
            ]}
          >
            <TextArea
              maxLength={100}
              style={{
                height: 100,
                resize: "none",
              }}
            />
          </Form.Item>
          <Form.Item
            name="Send_Notification"
            valuePropName="checked"
            layout="horizontal"
          >
            <Checkbox>Send Notification</Checkbox>
          </Form.Item>
          <Flex justify="center" gap="large">
            <Form.Item label={null}>
              <Button
                className="w-28"
                htmlType="reset"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" className="w-28 rounded">
                Save
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default Reminders;
