import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Flex,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import addRecord from "../../api/addRecord";
import { useSelector } from "react-redux";
import uploadFile from "../../api/uploadFile";

const StudyWorkPermitExtension = ({ setDocObj }) => {
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

  //Upload file type check for images
  const isImage = (_, fileList) => {
    if (fileList && fileList[0]) {
      const isImage = fileList[0].type.startsWith("image/");
      if (!isImage) {
        return Promise.reject(
          new Error(`${fileList[0].name} is not an image file`)
        );
      }
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
        Study_Permit: "",
        Passport_Visa: "",
        Medical: "",
        File_upload: "",
        Digital_Photo: "",
        New_Loa_And_2_Pay_Slips: "",
        Enrollment_Completion_Letter: "",
        Study_Permit1: "",
        Marriage_Certificate: "",
      };

      await ZOHO.CREATOR.init();
      const response = await addRecord(
        "Study_Work_Permit_Extension",
        formattedData
      );

      console.log(response);
      if (response.code !== 3000) throw new Error(response.error);

      //Uploading Files to Zoho after successful adding of Record
      const recordId = response.data.ID;

      data.Study_Permit?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Work_Permit_Extensions",
            recordId,
            "Study_Permit",
            data.Study_Permit[0].originFileObj
          )
        );
      data.Passport_Visa?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Work_Permit_Extensions",
            recordId,
            "Passport_Visa",
            data.Passport_Visa[0].originFileObj
          )
        );
      data.Medical?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Work_Permit_Extensions",
            recordId,
            "Medical",
            data.Medical[0].originFileObj
          )
        );
      data.File_upload?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Work_Permit_Extensions",
            recordId,
            "File_upload",
            data.File_upload[0].originFileObj
          )
        );
      data.Digital_Photo?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Work_Permit_Extensions",
            recordId,
            "Digital_Photo",
            data.Digital_Photo[0].originFileObj
          )
        );
      data.New_Loa_And_2_Pay_Slips?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Work_Permit_Extensions",
            recordId,
            "New_Loa_And_2_Pay_Slips",
            data.New_Loa_And_2_Pay_Slips[0].originFileObj
          )
        );
      data.Enrollment_Completion_Letter?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Work_Permit_Extensions",
            recordId,
            "Enrollment_Completion_Letter",
            data.Enrollment_Completion_Letter[0].originFileObj
          )
        );
      data.Study_Permit1?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Work_Permit_Extensions",
            recordId,
            "Study_Permit1",
            data.Study_Permit1[0].originFileObj
          )
        );
      data.Marriage_Certificate?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Study_Work_Permit_Extensions",
            recordId,
            "Marriage_Certificate",
            data.Marriage_Certificate[0].originFileObj
          )
        );

      messageApi.destroy();
      messageApi.success("Record Successfully Added!");
      setDocObj(true);
      console.log("Submitted Data:", data);
    } catch (error) {
      console.log(error);
      messageApi.error("Error Adding Record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="p-5 font-bold mb-2 border-b">
        Study + Work Permit Extension
      </h1>
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
            className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
          >
            <Checkbox>Profile Details</Checkbox>
          </Form.Item>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">
              Study + Work Extension
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
              <Form.Item
                label="Applicant"
                name="Study_work_extension1"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                name="Study_Permit"
                label="Study Permit"
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
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Passport_Visa"
                label="Passport + Visa"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Passport and Visa!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload
                  name="Passport_Visa"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Medical"
                label="Medical"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Medical Document!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload name="Medical" maxCount={1} beforeUpload={() => false}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="File_upload"
                label="File Upload"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your File!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload
                  name="File_upload"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Digital_Photo"
                label="Digital Photo"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Digital Photo!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                  {
                    validator: isImage,
                  },
                ]}
              >
                <Upload
                  name="Digital_Photo"
                  maxCount={1}
                  accept="image/*"
                  beforeUpload={() => false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select Image
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="New_Loa_And_2_Pay_Slips"
                label="New Loa And 2 Pay Slips"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your New Loa And 2 Pay Slips!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload
                  name="New_Loa_And_2_Pay_Slips"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Enrollment_Completion_Letter"
                label="Enrollment / Completion Letter"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Enrollment / Completion Letter!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload
                  name="Enrollment_Completion_Letter"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Study_Permit1"
                label="Study Permit"
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
                  name="Study_Permit1"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Marriage_Certificate"
                label="Marriage Certificate"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Marriage Certificate!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload
                  name="Marriage_Certificate"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </fieldset>
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
          <fieldset className="p-0 w-[70vw]">
            <legend className="font-bold !text-black">Check List</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 justify-items-start">
              <Form.Item
                name="Study_Permit2"
                valuePropName="checked"
                layout="horizontal"
                className="justify-self-start md:self-center"
              >
                <Checkbox>Study Permit</Checkbox>
              </Form.Item>
              <Form.Item
                name="Passport_Visa1"
                valuePropName="checked"
                layout="horizontal"
                className="justify-self-start md:self-center"
              >
                <Checkbox>Passport + Visa</Checkbox>
              </Form.Item>
              <Form.Item
                label="Medical"
                name="Medical1"
                layout="horizontal"
                colon={false}
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                name="File_upload1"
                valuePropName="checked"
                layout="horizontal"
                className="justify-self-start md:self-center"
              >
                <Checkbox>File Upload</Checkbox>
              </Form.Item>
              <Form.Item
                name="Digital_Photo1"
                valuePropName="checked"
                layout="horizontal"
                className="justify-self-start md:self-center"
              >
                <Checkbox>Digital Photo</Checkbox>
              </Form.Item>
              <Form.Item
                name="New_Loa_And_2_Pay_Slips1"
                valuePropName="checked"
                layout="horizontal"
                className="justify-self-start md:self-center"
              >
                <Checkbox>New Loa And 2 Pay Slips</Checkbox>
              </Form.Item>
              <Form.Item
                name="Enrollment_Completion_Letter1"
                valuePropName="checked"
                layout="horizontal"
                className="justify-self-start md:self-center"
              >
                <Checkbox>Enrollment / Completion Letter</Checkbox>
              </Form.Item>
              <Form.Item
                name="Study_Permit3"
                valuePropName="checked"
                layout="horizontal"
                className="justify-self-start md:self-center"
              >
                <Checkbox>Study Permit</Checkbox>
              </Form.Item>
              <Form.Item
                name="Marriage_Certificate1"
                valuePropName="checked"
                layout="horizontal"
                className="justify-self-start md:self-center"
              >
                <Checkbox>Marriage Certificate</Checkbox>
              </Form.Item>
            </div>
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

export default StudyWorkPermitExtension;
