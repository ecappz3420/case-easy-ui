import React from "react";
import {
  Form,
  Select,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Flex,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CASE_TYPE_OPTIONS } from "./utils/selectOptions";

const StudyWorkPermitExtension = () => {
  const [form] = Form.useForm();

  //For file upload, setting File fields in form with respective file details
  const getFile = (e) => {
    console.log("Upload event:", e);
    if (e?.file && e.file.status !== "removed") {
      return e.file; // Return the uploaded file
    }
    return null; // If no file or file is removed
  };

  //Upload file checked if empty
  const isFileEmpty = (_, file) => {
    if (file?.size === 0) {
      return Promise.reject(
        new Error(
          "Empty file found. Please try uploading another file with data."
        )
      );
    }
    return Promise.resolve(); // Validation passed
  };

  //Upload file type check for images
  const isImage = (_, file) => {
    if (file) {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        return Promise.reject(new Error(`${file.name} is not an image file`));
      }
    }
    return Promise.resolve(); // Validation passed
  };

  const onFinish = (values) => {
    console.log("Submitted Data:", values);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 justify-items-start max-w-max">
            <Form.Item
              label="counselling id"
              name="counselling_id"
              className="w-[300px]"
            >
              <Input
                maxLength={255}
                className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
              />
            </Form.Item>
            <Form.Item
              label="Case Type"
              name="Case_Type"
              initialValue="Study + Work Permit Extension"
              className="w-[300px]"
            >
              <Select
                placeholder="Choose"
                className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
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
                className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
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
            <legend className="font-bold !text-black">
              Study + Work Extension
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 justify-items-start max-w-max">
              <Form.Item
                label="Applicant"
                name="Study_work_extension1"
                className="w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                name="Study_Permit"
                label="Study Permit"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Study_Permit" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Passport_Visa"
                label="Passport + Visa"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Passport_Visa" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Medical"
                label="Medical"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Medical" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="File_upload"
                label="File Upload"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="File_upload" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Digital_Photo"
                label="Digital Photo"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Digital_Photo" maxCount={1} accept="image/*">
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select Image
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="New_Loa_And_2_Pay_Slips"
                label="New Loa And 2 Pay Slips"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="New_Loa_And_2_Pay_Slips" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Enrollment_Completion_Letter"
                label="Enrollment / Completion Letter"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Enrollment_Completion_Letter" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Study_Permit1"
                label="Study Permit"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Study_Permit1" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Marriage_Certificate"
                label="Marriage Certificate"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Marriage_Certificate" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
              className="w-[300px]"
            >
              <InputNumber
                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                addonAfter="%"
              />
            </Form.Item>
          </fieldset>
          <fieldset className="p-0 w-[70vw]">
            <legend className="font-bold !text-black">Check List</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 justify-items-start">
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
                  className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
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

export default StudyWorkPermitExtension;
