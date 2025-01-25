import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Flex,
  message,
} from "antd";

import addRecord from "../../api/addRecord";
import { useSelector } from "react-redux";
import { WORK_PERMIT_EXTENSION_FORM } from "./utils/formNameConstants";

const WorkPermitExtension = ({ setDocObj }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const lead = useSelector((state) => state.client.details);

  const onFinish = async (data) => {
    try {
      messageApi.open({
        type: "loading",
        content: "Adding Record",
      });
      setLoading(true);

      const formattedData = {
        ...data,
        Case_Type: lead.Case_Type,
      };

      await ZOHO.CREATOR.init();
      const response = await addRecord(
        WORK_PERMIT_EXTENSION_FORM,
        formattedData
      );
      console.log(response);

      messageApi.destroy();
      messageApi.success("Record Successfully Added!");
      setDocObj(true);
      console.log("Submitted Data:", formattedData);
    } catch (error) {
      console.log(error);
      messageApi.error("Error Adding Record");
    } finally {
      setLoading(false);
    }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
            <Form.Item
              label="counselling id"
              name="counselling_id"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            >
              <Input
                maxLength={255}
                className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              />
            </Form.Item>
            <Form.Item
              label="Counselling Name"
              name="Counselling_Name"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            >
              <Input
                maxLength={255}
                className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="Profile_Details"
            valuePropName="checked"
            layout="horizontal"
          >
            <Checkbox>Profile Details</Checkbox>
          </Form.Item>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Visa Chances</legend>
            <Form.Item
              label="Visa Chances"
              name="Visa_Chances1"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            >
              <InputNumber
                maxLength={10}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                addonAfter="%"
              />
            </Form.Item>
          </fieldset>
          {contextHolder}
          <Flex justify="center" gap="large">
            <Form.Item label={null}>
              <Button className="w-28" htmlType="reset">
                Reset
              </Button>
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-28"
                loading={loading}
              >
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
