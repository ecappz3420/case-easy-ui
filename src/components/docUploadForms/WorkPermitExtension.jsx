import React from "react";
import { Form, Select, Input, InputNumber, Checkbox, Button, Flex } from "antd";
import { CASE_TYPE_OPTIONS } from "./utils/selectOptions";

const WorkPermitExtension = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Submitted Data:", values);
  };

  return (
    <>
      <h1 className="p-5 font-bold mb-2 border-b">Work Permit Extension</h1>
      <div className="p-5">
        <Form
          form={form}
          layout="vertical"
          scrollToFirstError={true}
          onFinish={onFinish}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 justify-items-start max-w-max">
            <Form.Item
              label="counselling id"
              name="counselling_id"
              className="w-[300px]"
            >
              <Input
                maxLength={255}
                className="sm:max-w-[260px] md:max-w-[300px]"
              />
            </Form.Item>
            <Form.Item
              label="Case Type"
              name="Case_Type"
              initialValue="Work Permit Extension"
              className="w-[300px]"
            >
              <Select
                placeholder="Choose"
                className="sm:max-w-[260px] md:max-w-[300px]"
                options={CASE_TYPE_OPTIONS}
                disabled
              />
            </Form.Item>
            <Form.Item
              label="Counselling Name"
              name="Counselling_Name"
              className="w-[300px]"
            >
              <Input
                maxLength={255}
                className="sm:max-w-[260px] md:max-w-[300px]"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="Profile_Details"
            valuePropName="checked"
            layout="horizontal"
            className="w-[300px]"
          >
            <Checkbox>Profile Details</Checkbox>
          </Form.Item>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Visa Chances</legend>
            <Form.Item
              label="Visa Chances"
              name="Visa_Chances1"
              className="w-[300px]"
            >
              <InputNumber
                className="w-[300px] sm:max-w-[260px] md:max-w-[300px]"
                addonAfter="%"
              />
            </Form.Item>
          </fieldset>
          <Flex justify="center" gap="large">
            <Form.Item label={null}>
              <Button className="w-28" htmlType="reset">
                Reset
              </Button>
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" className="w-28">
                Submit
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </div>
    </>
  );
};

export default WorkPermitExtension;
