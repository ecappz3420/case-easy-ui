import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Flex,
  Space,
  Upload,
  DatePicker,
  Divider,
  message,
} from "antd";
import { UploadOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";

import addRecord from "../../api/addRecord";
import { useSelector } from "react-redux";
import uploadFile from "../../api/uploadFile";

const StudyPermitExtension = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const lead = useSelector((state) => state.client.details);

  //For file upload, setting File fields in form with respective file details
  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log("Upload: ", e?.fileList);
    return e?.fileList;
  };

  //Upload file checked if empty
  const isFileEmpty = (_, fileList) => {
    if (fileList && fileList[0]?.size === 0) {
      return Promise.reject(
        new Error(
          "Empty file found. Please try uploading another file with data."
        )
      );
    }
    return Promise.resolve(); // Validation passed
  };

  const onFinish = async (data) => {
    try {
      messageApi.open({
        type: "loading",
        content: "Adding Record...",
      });
      setLoading(true);

      const formattedData = {
        ...data,

        Case_Type: lead.Case_Type,

        //File upload fields
        Medical_Certificate: "",
        Study_Permit: "",

        // Format Year fields in the Education_Details array
        Education_Details: data.Education_Details?.map((item) => ({
          ...item,
          Year_field: item.Year_field?.format("DD-MMM-YYYY") || "",
        })),
      };

      await ZOHO.CREATOR.init();
      const response = await addRecord("Study_Permit_Extension", formattedData);

      console.log(response);
      if (response.code !== 3000) throw new Error(response.error);

      //Uploading Files to Zoho after successful adding of Record
      const recordId = response.data.ID;

      data.Medical_Certificate?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Permit_Extensions",
            recordId,
            "Medical_Certificate",
            data.Medical_Certificate[0].originFileObj
          )
        );

      data.Study_Permit?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Permit_Extensions",
            recordId,
            "Study_Permit",
            data.Study_Permit[0].originFileObj
          )
        );

      messageApi.destroy();
      messageApi.success("Record Successfully Added!");
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
      <h1 className="p-5 font-bold mb-2 border-b">Study Permit Extension</h1>
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
            name="profile_details"
            valuePropName="checked"
            layout="horizontal"
          >
            <Checkbox>Profile Details</Checkbox>
          </Form.Item>
          <fieldset className="p-0">
            <legend className="font-bold !text-black !border-b-0 !mb-2">
              Education Details
            </legend>
            <div className="w-[70vw] max-w-max overflow-x-auto mb-6">
              <Space
                className="border-t border-b w-max py-2 bg-zinc-50 !flex !mb-[15px]"
                align="baseline"
              >
                <div className="w-[32px]"></div>
                <div className="font-semibold w-[200px]">Class</div>
                <div className="font-semibold w-[200px]">College Name</div>
                <div className="font-semibold w-[200px]">Board/University</div>
                <div className="font-semibold w-[200px]">Year</div>
                <div className="font-semibold w-[200px]">Marks %</div>
              </Space>
              <Form.List name="Education_Details">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        className="last: mb-0 !flex"
                        align="center"
                      >
                        <Button
                          type="link"
                          icon={<CloseOutlined />}
                          danger
                          onClick={() => remove(name)}
                          className="mb-7"
                        />
                        <Form.Item
                          {...restField}
                          name={[name, "Class"]}
                          className="w-[200px]"
                        >
                          <Input maxLength={255} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "College_Name"]}
                          className="w-[200px]"
                        >
                          <Input maxLength={255} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "Board_University"]}
                          className="w-[200px]"
                        >
                          <Input maxLength={255} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "Year_field"]}
                          className="w-[200px]"
                        >
                          <DatePicker
                            format="DD-MMM-YYYY"
                            className="w-[200px]"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "Marks"]}
                          className="w-[200px]"
                        >
                          <InputNumber
                            min={0}
                            max={100}
                            step={0.01}
                            addonAfter="%"
                          />
                        </Form.Item>
                      </Space>
                    ))}
                    {fields.length === 0 ? "" : <Divider className="m-0" />}
                    <Form.Item
                      className={
                        fields.length === 0 ? "text-center mb-3" : "mb-3"
                      }
                    >
                      <Button
                        type="link"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add New
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </fieldset>
          <Form.Item
            label="Medical Certificate"
            name="Medical_Certificate"
            valuePropName="fileList"
            getValueFromEvent={getFile}
            className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            rules={[
              // {
              //   required: true,
              //   message: "Kindly upload your Medical Certificate!",
              // },
              {
                validator: isFileEmpty,
              },
            ]}
          >
            <Upload
              name="Medical_Certificate"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button
                icon={<UploadOutlined />}
                iconPosition="end"
                className="w-[300px] sm:w-[200px] md:w-[250px] lg:w-[300px] mb-1"
              >
                Select File
              </Button>
            </Upload>
          </Form.Item>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Visa Chances</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-max">
              <Form.Item
                label="Visa Chances"
                name="Visa_Chances1"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <InputNumber
                  className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  addonAfter="%"
                />
              </Form.Item>
              <Form.Item
                label="Study Permit"
                name="Study_Permit"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Study Permit!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload
                  name="Study_Permit"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:w-[200px] md:w-[250px] lg:w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </fieldset>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Check List</legend>
            <Form.Item
              name="Medical_Certificate1"
              valuePropName="checked"
              layout="horizontal"
              className="justify-self-start md:self-center"
            >
              <Checkbox>Medical Certificate</Checkbox>
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

export default StudyPermitExtension;
