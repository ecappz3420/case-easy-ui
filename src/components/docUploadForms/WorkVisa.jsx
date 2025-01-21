import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Button,
  Flex,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import addRecord from "../../api/addRecord";
import { useSelector } from "react-redux";
import uploadFile from "../../api/uploadFile";

const WorkVisa = () => {
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
    if (fileList[0]?.size === 0) {
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
    if (fileList[0]) {
      const isImage = fileList[0].type.startsWith("image/");
      if (!isImage) {
        return Promise.reject(
          new Error(`${fileList[0].name} is not an image file`)
        );
      }
    }
    return Promise.resolve(); // Validation passed
  };

  const isWholeNumber = (_, value) => {
    if (value === undefined || value % 1 === 0) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Round off the Age field value to 0 decimal places")
    );
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

        Lead: lead.ID,
        Case_Type: lead.Case_Type,

        //File upload fields
        Passport: "",
        Digital_Photo: "",
        Marriage_Certificate: "",
        Marriage_Photo: "",
        Education_Details: "",
        Job_Letter: "",
        ITR1: "",
        Bank_Statment: "",
        Sallary: "",
        Sponsor_Passport: "",
        LOA: "",
        Lie: "",
        GIC_certi: "",
        Enrollment_Completion_Letter: "",
        Study_Permit: "",
        Visa_Copy: "",
        GIC: "",
        Chat_History: "",
        Video_Call_History: "",
        call_History: "",
        Work_permit: "",
        month_Pay_Slips: "",
        Job_Letter_Appointment_Letter: "",
        Account_Balan: "",
      };

      await ZOHO.CREATOR.init();
      const response = await addRecord("Work_Visa", formattedData);

      console.log(response);
      if (response.code !== 3000) throw new Error(response.error);

      //Uploading Files to Zoho after successful adding of Record
      const recordId = response.data.ID;

      data.Passport?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Passport",
            data.Passport[0].originFileObj
          )
        );
      data.Digital_Photo?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Digital_Photo",
            data.Digital_Photo[0].originFileObj
          )
        );
      data.Marriage_Certificate?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Marriage_Certificate",
            data.Marriage_Certificate[0].originFileObj
          )
        );
      data.Marriage_Photo?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Marriage_Photo",
            data.Marriage_Photo[0].originFileObj
          )
        );
      data.Education_Details?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Education_Details",
            data.Education_Details[0].originFileObj
          )
        );
      data.Job_Letter?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Job_Letter",
            data.Job_Letter[0].originFileObj
          )
        );
      data.ITR1?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "ITR1",
            data.ITR1[0].originFileObj
          )
        );
      data.Bank_Statment?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Bank_Statment",
            data.Bank_Statment[0].originFileObj
          )
        );
      data.Sallary?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Sallary",
            data.Sallary[0].originFileObj
          )
        );
      data.Sponsor_Passport?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Sponsor_Passport",
            data.Sponsor_Passport[0].originFileObj
          )
        );
      data.LOA?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "LOA",
            data.LOA[0].originFileObj
          )
        );
      data.Lie?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Lie",
            data.Lie[0].originFileObj
          )
        );
      data.GIC_certi?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "GIC_certi",
            data.GIC_certi[0].originFileObj
          )
        );
      data.Enrollment_Completion_Letter?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Enrollment_Completion_Letter",
            data.Enrollment_Completion_Letter[0].originFileObj
          )
        );
      data.Study_Permit?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Study_Permit",
            data.Study_Permit[0].originFileObj
          )
        );
      data.Visa_Copy?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Visa_Copy",
            data.Visa_Copy[0].originFileObj
          )
        );
      data.GIC?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "GIC",
            data.GIC[0].originFileObj
          )
        );
      data.Chat_History?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Chat_History",
            data.Chat_History[0].originFileObj
          )
        );
      data.Video_Call_History?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Video_Call_History",
            data.Video_Call_History[0].originFileObj
          )
        );
      data.call_History?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "call_History",
            data.call_History[0].originFileObj
          )
        );
      data.Work_permit?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Work_permit",
            data.Work_permit[0].originFileObj
          )
        );
      data.month_Pay_Slips?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "month_Pay_Slips",
            data.month_Pay_Slips[0].originFileObj
          )
        );
      data.Job_Letter_Appointment_Letter?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Job_Letter_Appointment_Letter",
            data.Job_Letter_Appointment_Letter[0].originFileObj
          )
        );
      data.Account_Balan?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Work_Visa",
            recordId,
            "Account_Balan",
            data.Account_Balan[0].originFileObj
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
      <h1 className="p-5 font-bold mb-2 border-b">Work Visa</h1>
      <div className="p-5">
        <Form
          form={form}
          layout="vertical"
          scrollToFirstError={true}
          onFinish={onFinish}
        >
          <fieldset className="p-0">
            <legend className="font-bold !text-black">
              Necessary Information For Work Permit
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
              <Form.Item
                label="Name"
                name="Name1"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Age"
                name="Age"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[{ validator: isWholeNumber }]}
              >
                <InputNumber
                  max={150}
                  className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  placeholder="#######"
                />
              </Form.Item>
              <Form.Item
                label="Occupation"
                name="Occupation"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Salary Or Monthly Income"
                name="Salary_Or_Monthly_Income"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <InputNumber
                  stringMode
                  maxLength={10}
                  className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  addonAfter="%"
                />
              </Form.Item>
              <Form.Item
                label="Bank Balance"
                name="Bank_Balance"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <InputNumber
                  stringMode
                  maxLength={10}
                  className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  addonAfter="₹"
                  placeholder="##,##,###.##"
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
              <Form.Item
                name="ITR"
                label="ITR"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Radio.Group>
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.ITR !== currentValues.ITR
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("ITR") === "Yes" && (
                    <Form.Item
                      label="ITR Amount"
                      name="ITR_Amount"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input ITR Amount!",
                        },
                      ]}
                    >
                      <InputNumber
                        stringMode
                        maxLength={10}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        addonAfter="₹"
                        placeholder="##,##,###.##"
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>
            </div>
          </fieldset>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Documents</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
              <Form.Item
                name="Passport"
                label="Passport"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Passport!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload name="Passport" maxCount={1} beforeUpload={() => false}>
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
              <Form.Item
                name="Marriage_Photo"
                label="Marriage Photos"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Marriage Photos!",
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
                  name="Marriage_Photo"
                  maxCount={1}
                  accept="image/*"
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
            <legend className="font-bold !text-black">
              Applicant Documents
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
              <Form.Item
                name="Education_Details"
                label="Education Documents"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Education Documents!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload
                  name="Education_Details"
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
                name="Job_Letter"
                label="Job Letter"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Job Letter!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload
                  name="Job_Letter"
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
                name="ITR1"
                label="ITR"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your ITR Document!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload name="ITR1" maxCount={1} beforeUpload={() => false}>
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
                name="Bank_Statment"
                label="Bank Statement"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Bank Statement!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload
                  name="Bank_Statment"
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
                name="Sallary"
                label="Salary Slips"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Salary Slips!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload name="Sallary" maxCount={1} beforeUpload={() => false}>
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
            <legend className="font-bold !text-black">Sponsor</legend>
            <Form.Item
              name="If_field"
              label="Sponsor's Country"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            >
              <Radio.Group>
                <Radio value="India">India</Radio>
                <Radio value="Canada">Canada</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.If_field !== currentValues.If_field
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("If_field") === "Canada" && (
                  <Form.Item
                    name="Satus"
                    label="Status"
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  >
                    <Radio.Group>
                      <Radio value="Work Permit">Work Permit</Radio>
                      <Radio value="Study Permit">Study Permit</Radio>
                    </Radio.Group>
                  </Form.Item>
                )
              }
            </Form.Item>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.If_field !== currentValues.If_field ||
                  prevValues.Status !== currentValues.Status
                }
              >
                {({ getFieldValue }) =>
                  (getFieldValue("If_field") === "India" ||
                    (getFieldValue("If_field") === "Canada" &&
                      getFieldValue("Status") === "Study Permit") ||
                    (getFieldValue("If_field") === "Canada" &&
                      getFieldValue("Status") === "Work Permit")) && (
                    <Form.Item
                      name="Sponsor_Passport"
                      label="Passport"
                      valuePropName="fileList"
                      getValueFromEvent={getFile}
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your Sponsor Passport!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload
                        name="Sponsor_Passport"
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
                  )
                }
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.If_field !== currentValues.If_field ||
                  prevValues.Status !== currentValues.Status
                }
              >
                {({ getFieldValue }) =>
                  (getFieldValue("If_field") === "India" ||
                    (getFieldValue("If_field") === "Canada" &&
                      getFieldValue("Status") === "Study Permit")) && (
                    <>
                      <Form.Item
                        name="LOA"
                        label="LOA"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your LOA!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="LOA"
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
                        name="Lie"
                        label="Fees Receipt"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Fees Receipt!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="Lie"
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
                        name="GIC_certi"
                        label="GIC Certificate"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your GIC Certificate!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="GIC_certi"
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
                    </>
                  )
                }
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.If_field !== currentValues.If_field ||
                  prevValues.Status !== currentValues.Status
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("If_field") === "Canada" &&
                  getFieldValue("Status") === "Study Permit" && (
                    <>
                      <Form.Item
                        name="Enrollment_Completion_Letter"
                        label="Enrollment Letter"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Enrollment Letter!",
                          },
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
                        name="Study_Permit"
                        label="Study Permit"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Study Permit!",
                          },
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
                        name="Visa_Copy"
                        label="Visa Copy"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Visa Copy!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="Visa_Copy"
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
                        name="GIC"
                        label="GIC Account Summary"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your GIC Account Summary!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="GIC"
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
                    </>
                  )
                }
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.If_field !== currentValues.If_field ||
                  prevValues.Status !== currentValues.Status
                }
              >
                {({ getFieldValue }) =>
                  ((getFieldValue("If_field") === "Canada" &&
                    getFieldValue("Status") === "Work Permit") ||
                    (getFieldValue("If_field") === "Canada" &&
                      getFieldValue("Status") === "Study Permit")) && (
                    <>
                      <Form.Item
                        name="Chat_History"
                        label="Chat History"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Chat History!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="Chat_History"
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
                        name="Video_Call_History"
                        label="Video Call History"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Video Call History!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="Video_Call_History"
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
                        name="call_History"
                        label="Call History"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Call History!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="call_History"
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
                    </>
                  )
                }
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.If_field !== currentValues.If_field ||
                  prevValues.Status !== currentValues.Status
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("If_field") === "Canada" &&
                  getFieldValue("Status") === "Work Permit" && (
                    <>
                      <Form.Item
                        name="Work_permit"
                        label="Work Permit"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Work Permit!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="Work_permit"
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
                        name="month_Pay_Slips"
                        label="3 month Pay Slips"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your 3 month Pay Slips!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="month_Pay_Slips"
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
                        name="Job_Letter_Appointment_Letter"
                        label="Job Letter / Appointment Letter"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message:
                              "Kindly upload your Job Letter / Appointment Letter!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="Job_Letter_Appointment_Letter"
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
                        name="Account_Balan"
                        label="Account Summary"
                        valuePropName="fileList"
                        getValueFromEvent={getFile}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Account Summary!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload
                          name="Account_Balan"
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
                    </>
                  )
                }
              </Form.Item>
            </div>
          </fieldset>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">
              Compulsory Question
            </legend>
            <Form.Item
              name="Any_previous_travel_history"
              label="Any previous travel history"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              rules={[
                {
                  required: true,
                  message: "Kindly input if any previous travel history!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>
          </fieldset>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Visa Chances</legend>
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

export default WorkVisa;
