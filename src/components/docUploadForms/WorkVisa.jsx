import React from "react";
import {
  Form,
  Select,
  Input,
  InputNumber,
  Radio,
  Button,
  Flex,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CASE_TYPE_OPTIONS_WORK_VISA } from "../selectOptions";

const WorkVisa = () => {
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

  const isWholeNumber = (_, value) => {
    if (value === undefined || value % 1 === 0) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Round off the Age field value to 0 decimal places")
    );
  };

  const onFinish = (values) => {
    console.log("Submitted Data:", values);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 justify-items-start max-w-max">
            <Form.Item label="Lead" name="Lead" className="w-[300px]">
              <Select
                placeholder="Choose"
                className="sm:max-w-[260px] md:max-w-[300px]"
              />
            </Form.Item>
            <Form.Item
              label="Case Type"
              name="Case_Type"
              initialValue="Work Visa"
              className="w-[300px]"
            >
              <Select
                placeholder="Choose"
                className="sm:max-w-[260px] md:max-w-[300px]"
                options={CASE_TYPE_OPTIONS_WORK_VISA}
                disabled
              />
            </Form.Item>
          </div>
          <fieldset>
            <legend className="font-bold !text-black">
              Necessary Information For Work Permit
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 justify-items-start max-w-max">
              <Form.Item label="Name" name="Name1" className="w-[300px]">
                <Input
                  maxLength={255}
                  className="sm:max-w-[260px] md:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Age"
                name="Age"
                className="w-[300px]"
                rules={[{ validator: isWholeNumber }]}
              >
                <InputNumber
                  max={150}
                  className="w-[300px] sm:max-w-[260px] md:max-w-[300px]"
                  placeholder="#######"
                />
              </Form.Item>
              <Form.Item
                label="Occupation"
                name="Occupation"
                className="w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[260px] md:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Salary Or Monthly Income"
                name="Salary_Or_Monthly_Income"
                className="w-[300px]"
              >
                <InputNumber
                  stringMode
                  maxLength={10}
                  className="w-[300px] sm:max-w-[260px] md:max-w-[300px]"
                  addonAfter="%"
                />
              </Form.Item>
              <Form.Item
                label="Bank Balance"
                name="Bank_Balance"
                className="w-[300px]"
              >
                <InputNumber
                  stringMode
                  maxLength={10}
                  className="w-[300px] sm:max-w-[260px] md:max-w-[300px]"
                  addonAfter="₹"
                  placeholder="##,##,###.##"
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 justify-items-start max-w-max">
              <Form.Item name="ITR" label="ITR" className="w-[300px]">
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.ITR !== currentValues.ITR
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("ITR") === "yes" && (
                    <Form.Item
                      label="ITR Amount"
                      name="ITR_Amount"
                      className="w-[300px]"
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
                        className="w-[300px] sm:max-w-[260px] md:max-w-[300px]"
                        addonAfter="₹"
                        placeholder="##,##,###.##"
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-bold !text-black">Documents</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 justify-items-start max-w-max">
              <Form.Item
                name="Passport"
                label="Passport"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Passport" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
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
                    className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                  >
                    Select Image
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
                    className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Marriage_Photo"
                label="Marriage Photos"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Marriage_Photo" maxCount={1} accept="image/*">
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-bold !text-black">
              Applicant Documents
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 justify-items-start max-w-max">
              <Form.Item
                name="Education_Details"
                label="Education Documents"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Education_Details" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Job_Letter"
                label="Job Letter"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Job_Letter" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="ITR1"
                label="ITR"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="ITR1" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Bank_Statment"
                label="Bank Statement"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Bank_Statment" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="Sallary"
                label="Salary Slips"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
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
                <Upload name="Sallary" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-bold !text-black">Sponsor</legend>
            <Form.Item
              name="If_field"
              label="Sponsor's Country"
              className="w-[300px]"
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
                  <Form.Item name="Status" label="Status" className="w-[300px]">
                    <Radio.Group>
                      <Radio value="Work Permit">Work Permit</Radio>
                      <Radio value="Study Permit">Study Permit</Radio>
                    </Radio.Group>
                  </Form.Item>
                )
              }
            </Form.Item>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 justify-items-start max-w-max">
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
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
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
                      <Upload name="Sponsor_Passport" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
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
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="LOA" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="Lie"
                        label="Fees Receipt"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="Lie" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="GIC_certi"
                        label="GIC Certificate"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="GIC_certi" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
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
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        >
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="Study_Permit"
                        label="Study Permit"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="Study_Permit" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="Visa_Copy"
                        label="Visa Copy"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="Visa_Copy" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="GIC"
                        label="GIC Account Summary"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="GIC" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
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
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="Chat_History" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="Video_Call_History"
                        label="Video Call History"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="Video_Call_History" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="call_History"
                        label="Call History"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="call_History" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
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
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="Work_permit" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="month_Pay_Slips"
                        label="3 month Pay Slips"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="month_Pay_Slips" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:max-w-[260px] md:max-w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="Job_Letter_Appointment_Letter"
                        label="Job Letter / Appointment Letter"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        >
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:w-[260px] md:w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        name="Account_Balan"
                        label="Account Summary"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
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
                        <Upload name="Account_Balan" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:max-w-[260px] md:max-w-[300px] mb-1"
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
          <fieldset>
            <legend className="font-bold !text-black">
              Compulsory Question
            </legend>
            <Form.Item
              name="Any_previous_travel_history"
              label="Any previous travel history"
              className="w-[300px]"
              rules={[
                {
                  required: true,
                  message: "Kindly input if any previous travel history!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
          </fieldset>
          <fieldset>
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

export default WorkVisa;
