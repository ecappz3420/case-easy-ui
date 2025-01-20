import React from "react";
import {
  Form,
  Select,
  Input,
  InputNumber,
  Upload,
  Radio,
  DatePicker,
  Button,
  Divider,
  Flex,
  Space,
} from "antd";
import {
  UploadOutlined,
  MailOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  CASE_TYPE_OPTIONS,
  WHOM_THEY_MEET_OPTIONS,
  VISIT_PURPOSE_OPTIONS,
  SPONSOR_STATUS_OPTIONS,
  OCCUPATION_OPTIONS,
  TRAVEL_VISA_TYPE_OPTIONS,
  REFUSAL_VISA_TYPE_OPTIONS,
  RELATION_OPTIONS,
  COUNTRY_CODE_OPTIONS,
} from "./utils/selectOptions";

const { TextArea } = Input;

const selectCountry = (
  <Form.Item name="Country_Code" initialValue="+91" noStyle>
    <Select
      showSearch
      popupMatchSelectWidth={false}
      options={COUNTRY_CODE_OPTIONS.map(({ key, ...rest }) => ({
        ...rest,
        key,
      }))}
      optionFilterProp="label"
    />
  </Form.Item>
);

const VisitorVisa = () => {
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
    const formattedValues = {
      ...values,

      // If mobile number exists, concatenate mobile number with country code
      ...(values?.Mobile && {
        Mobile: values.Country_Code + values.Mobile,
      }),

      // Format Year fields in the Travel_History array
      Travel_History: values.Travel_History?.map((item) => ({
        ...item,
        Year_field: item.Year_field?.format("YYYY") || "",
      })),

      // Format Year fields in the Refusal_History array
      Refusal_History: values.Refusal_History?.map((item) => ({
        ...item,
        Year_field: item.Year_field?.format("YYYY") || "",
      })),
    };

    //Exclude Country code on form submission
    const { Country_Code, ...submissionValues } = formattedValues;

    console.log("Submitted Data:", submissionValues);
  };

  return (
    <>
      <h1 className="p-5 font-bold mb-2 border-b">Visitor Visa</h1>
      <div className="p-5">
        <Form
          form={form}
          layout="vertical"
          scrollToFirstError={true}
          onFinish={onFinish}
        >
          <fieldset className="p-0">
            <legend className="font-bold !text-black">
              Personal Information
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
              <Form.Item label="Lead" name="Lead" className="w-[300px]">
                <Select
                  placeholder="Choose"
                  className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Case Type"
                name="Case_Type"
                initialValue="Visitor Visa"
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
                label="Mobile"
                name="Mobile"
                className="w-[300px]"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value) {
                        // Get the country code from the `selectCountry` dropdown
                        let countryCode =
                          form.getFieldValue("Country_Code") || "";
                        // Strip the '+' if present
                        countryCode = countryCode.startsWith("+")
                          ? countryCode.slice(1)
                          : countryCode;

                        // Combine the country code and mobile number
                        const fullNumber = `${countryCode}${value}`;

                        // Validate the length
                        if (fullNumber.length > 15) {
                          return Promise.reject(
                            new Error(
                              `The mobile number (including the country code) should not exceed 15 digits.`
                            )
                          );
                        }
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber
                  stringMode
                  maxLength={15}
                  addonBefore={selectCountry}
                  className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                name="Email"
                label="Email"
                rules={[{ type: "email" }]}
                className="w-[300px]"
              >
                <Input
                  maxLength={80}
                  addonAfter={<MailOutlined />}
                  className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start items-end max-w-max">
              <Form.Item
                label="Whom They Meet"
                name="Whom_They_Meet"
                className="w-[300px]"
              >
                <Select
                  placeholder="Choose"
                  className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                  options={WHOM_THEY_MEET_OPTIONS}
                />
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.Whom_They_Meet !== currentValues.Whom_They_Meet
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("Whom_They_Meet") === "Other" && (
                    <Form.Item
                      name="Other_Whom_They_Meet"
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message:
                            "Kindly input information on Whom They Meet!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start items-end max-w-max">
              <Form.Item
                label="Purpose of Visit"
                name="Purpose_of_Visit"
                className="w-[300px]"
              >
                <Select
                  placeholder="Choose"
                  className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                  options={VISIT_PURPOSE_OPTIONS}
                />
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.Purpose_of_Visit !== currentValues.Purpose_of_Visit
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("Purpose_of_Visit") === "Other" && (
                    <Form.Item
                      name="Other_Purpose_of_Visit"
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Purpose of Visit!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>
            </div>
            <Form.Item
              label="GC Key Username"
              name="GC_Key_Username"
              className="w-[300px]"
            >
              <Input
                maxLength={255}
                className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
              />
            </Form.Item>
          </fieldset>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">
              Necessary documents will be
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
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
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                label="Ties to visiting country"
                name="Ties_to_visiting_country"
                className="w-[300px]"
              >
                <TextArea
                  maxLength={100}
                  style={{
                    height: 100,
                    resize: "none",
                  }}
                  className="sm:!max-w-[210px] md:!max-w-[250px] lg:!max-w-[300px]"
                />
              </Form.Item>
            </div>
          </fieldset>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Visitor Visa</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
              <Form.Item
                label="Age"
                name="Age"
                className="w-[300px]"
                rules={[{ validator: isWholeNumber }]}
              >
                <InputNumber
                  max={150}
                  className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                  placeholder="#######"
                />
              </Form.Item>
              <Form.Item label="Salary" name="Sallary" className="w-[300px]">
                <InputNumber
                  stringMode
                  maxLength={10}
                  className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                  addonAfter="₹"
                  placeholder="##,##,###.##"
                />
              </Form.Item>
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
                        className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
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
            <legend className="font-bold !text-black">Sponsor</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
              <Form.Item
                name="Name_Of_Sponsor"
                label="Name Of Sponsor"
                className="w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Number of Applicants"
                name="Number_of_Applicants"
              >
                <InputNumber
                  stringMode
                  maxLength={10}
                  className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                  placeholder="#######"
                />
              </Form.Item>
              <Form.Item
                label="Sponsor Status"
                name="Sponse_Status"
                className="w-[300px]"
              >
                <Select
                  placeholder="Choose"
                  className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                  options={SPONSOR_STATUS_OPTIONS}
                />
              </Form.Item>
              <Form.Item
                label="Reason Of Visit"
                name="Reason_Of_Visit"
                className="w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
            </div>
          </fieldset>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.Sponse_Status !== currentValues.Sponse_Status
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("Sponse_Status") !== undefined && (
                <fieldset className="p-0">
                  <legend className="font-bold !text-black">
                    Sponsor checklist
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.Sponse_Status !== currentValues.Sponse_Status
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("Sponse_Status") !== "Citizen" && (
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
                            <Upload name="Passport" maxCount={1}>
                              <Button
                                icon={<UploadOutlined />}
                                iconPosition="end"
                                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                        prevValues.Sponse_Status !== currentValues.Sponse_Status
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("Sponse_Status") === "Study Visa" && (
                          <Form.Item
                            name="Study_Permit1"
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
                        )
                      }
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.Sponse_Status !== currentValues.Sponse_Status
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("Sponse_Status") === "Citizen" && (
                          <Form.Item
                            name="Canadian_Passport"
                            label="Canadian Passport"
                            valuePropName="file"
                            getValueFromEvent={getFile}
                            className="w-[300px]"
                            rules={[
                              {
                                required: true,
                                message:
                                  "Kindly upload your Canadian Passport!",
                              },
                              {
                                validator: isFileEmpty,
                              },
                            ]}
                          >
                            <Upload name="Canadian_Passport" maxCount={1}>
                              <Button
                                icon={<UploadOutlined />}
                                iconPosition="end"
                                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                        prevValues.Sponse_Status !== currentValues.Sponse_Status
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("Sponse_Status") === "Study Visa" && (
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
                                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                              >
                                Select File
                              </Button>
                            </Upload>
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                    {/* <Form.Item
                      name="Convocation_Letter"
                      label="Convocation Letter"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        // {
                        //   required: true,
                        //   message: "Kindly upload your Convocation Letter!",
                        // },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Convocation_Letter" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                        >
                          Select File
                        </Button>
                      </Upload>
                    </Form.Item> */}
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.Sponse_Status !==
                          currentValues.Sponse_Status ||
                        prevValues.Current_Add !== currentValues.Current_Add
                      }
                    >
                      {({ getFieldValue }) => {
                        const shouldShowFields =
                          getFieldValue("Sponse_Status") === "Work Permit" ||
                          getFieldValue("Sponse_Status") === "PR" ||
                          (getFieldValue("Sponse_Status") === "Citizen" &&
                            getFieldValue("Current_Add") === "Job");

                        return (
                          shouldShowFields && (
                            <>
                              <Form.Item
                                name="Pay_Slips"
                                label="Pay Slips"
                                valuePropName="file"
                                getValueFromEvent={getFile}
                                className="w-[300px]"
                                rules={[
                                  {
                                    required: true,
                                    message: "Kindly upload your Pay Slips!",
                                  },
                                  {
                                    validator: isFileEmpty,
                                  },
                                ]}
                              >
                                <Upload name="Pay_Slips" maxCount={1}>
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
                                name="Job_Letter_Appointment_Letter"
                                label="Job Letter"
                                valuePropName="file"
                                getValueFromEvent={getFile}
                                className="w-[300px]"
                                rules={[
                                  {
                                    required: true,
                                    message: "Kindly upload your Job Letter!",
                                  },
                                  {
                                    validator: isFileEmpty,
                                  },
                                ]}
                              >
                                <Upload name="Job_Letter" maxCount={1}>
                                  <Button
                                    icon={<UploadOutlined />}
                                    iconPosition="end"
                                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                                  >
                                    Select File
                                  </Button>
                                </Upload>
                              </Form.Item>
                            </>
                          )
                        );
                      }}
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.Sponse_Status !== currentValues.Sponse_Status
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("Sponse_Status") === "Study Visa" && (
                          <Form.Item
                            name="Enrollment_Completion_Letter"
                            label="Enrollment / Completion Letter"
                            valuePropName="file"
                            getValueFromEvent={getFile}
                            className="w-[300px]"
                            rules={[
                              {
                                required: true,
                                message:
                                  "Kindly upload your Enrollment / Completion Letter!",
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
                                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                        prevValues.Current_Add !== currentValues.Current_Add
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("Sponse_Status") === "Citizen" &&
                        getFieldValue("Current_Add") === "Business" && (
                          <Form.Item
                            name="Business_Det"
                            label="Business Documents"
                            valuePropName="file"
                            getValueFromEvent={getFile}
                            className="w-[300px]"
                            rules={[
                              {
                                required: true,
                                message:
                                  "Kindly upload your Business Documents!",
                              },
                              {
                                validator: isFileEmpty,
                              },
                            ]}
                          >
                            <Upload name="Business_Documents" maxCount={1}>
                              <Button
                                icon={<UploadOutlined />}
                                iconPosition="end"
                                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                        prevValues.Sponse_Status !== currentValues.Sponse_Status
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("Sponse_Status") === "Citizen" && (
                          <Form.Item
                            name="Current_Add"
                            label="Current Occupation"
                            className="w-[300px]"
                            rules={[
                              {
                                required: true,
                                message: "Kindly input Current Occupation!",
                              },
                            ]}
                          >
                            <Radio.Group>
                              <Radio value="Business">Business</Radio>
                              <Radio value="Job">Job</Radio>
                            </Radio.Group>
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                    {/* <Form.Item
                      name="Completion_Letter"
                      label="Completion Letter"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        // {
                        //   required: true,
                        //   message: "Kindly upload your Completion Letter!",
                        // },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Completion_Letter" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                        >
                          Select File
                        </Button>
                      </Upload>
                    </Form.Item> */}
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.Sponse_Status !== currentValues.Sponse_Status
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("Sponse_Status") === "Study Visa" && (
                          <Form.Item
                            label="Current Address"
                            name="Current_Address"
                            className="w-[300px]"
                            rules={[
                              {
                                required: true,
                                message: "Kindly input Current Address!",
                              },
                            ]}
                          >
                            <Input
                              maxLength={255}
                              className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                            />
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.Sponse_Status !== currentValues.Sponse_Status
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("Sponse_Status") === "Work Permit" && (
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
                                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                        prevValues.Sponse_Status !== currentValues.Sponse_Status
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("Sponse_Status") === "PR" && (
                          <Form.Item
                            name="PR_Card"
                            label="PR Card"
                            valuePropName="file"
                            getValueFromEvent={getFile}
                            className="w-[300px]"
                            rules={[
                              {
                                required: true,
                                message: "Kindly upload your PR Card!",
                              },
                              {
                                validator: isFileEmpty,
                              },
                            ]}
                          >
                            <Upload name="PR_Card" maxCount={1}>
                              <Button
                                icon={<UploadOutlined />}
                                iconPosition="end"
                                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                              >
                                Select File
                              </Button>
                            </Upload>
                          </Form.Item>
                        )
                      }
                    </Form.Item>
                    <Form.Item
                      name="Indian_Passport"
                      label="Indian Passport"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your Indian Passport!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Indian_Passport" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                        >
                          Select File
                        </Button>
                      </Upload>
                    </Form.Item>
                    {/* <Form.Item
                      name="Driving_Licence"
                      label="Driving Licence"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        // {
                        //   required: true,
                        //   message: "Kindly upload your Driving Licence!",
                        // },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Driving_Licence" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                        >
                          Select File
                        </Button>
                      </Upload>
                    </Form.Item> */}
                  </div>
                </fieldset>
              )
            }
          </Form.Item>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">
              Occupation Details
            </legend>
            <Form.Item
              label="Present Occupation"
              name="Present_Occupation"
              className="w-[300px]"
            >
              <Select
                placeholder="Choose"
                className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                options={OCCUPATION_OPTIONS}
              />
            </Form.Item>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("Present_Occupation") === "Other" && (
                    <Form.Item
                      name="Other_Present_Occupation"
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Present Occupation!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("Present_Occupation") !== undefined &&
                  getFieldValue("Present_Occupation") !== "Home Maker" &&
                  getFieldValue("Present_Occupation") !== "Student" &&
                  getFieldValue("Present_Occupation") !== "Other" && (
                    <Form.Item
                      name="Digital_Photo"
                      label="Digital Photo"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your Digital Photo!",
                        },
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
                      >
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                        >
                          Select Image
                        </Button>
                      </Upload>
                    </Form.Item>
                  )
                }
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  (getFieldValue("Present_Occupation") === "Agriculturist" ||
                    getFieldValue("Present_Occupation") === "Retired") && (
                    <Form.Item
                      name="Lease_Agreement"
                      label="Lease Agreement"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your Lease Agreement!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Lease_Agreement" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  (getFieldValue("Present_Occupation") === "Businessman" ||
                    getFieldValue("Present_Occupation") === "Worker") && (
                    <Form.Item
                      name="NOC"
                      label="NOC"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your NOC!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="NOC" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("Present_Occupation") === "Agriculturist" && (
                    <Form.Item
                      name="Month_Statement"
                      label="3 Month Statement"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your 3 Month Statement!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Month_Statement" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                        >
                          Select File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )
                }
              </Form.Item>
              {/* <Form.Item
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
              </Form.Item> */}
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  (getFieldValue("Present_Occupation") === "Businessman" ||
                    getFieldValue("Present_Occupation") === "Retired" ||
                    getFieldValue("Present_Occupation") === "Worker") && (
                    <Form.Item
                      name="ITR1"
                      label="ITR"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your ITR Document!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="ITR1" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  (getFieldValue("Present_Occupation") === "Businessman" ||
                    getFieldValue("Present_Occupation") === "Worker") && (
                    <Form.Item
                      name="Month_Current_Account_Statement"
                      label="3 Month Current Account Statement"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message:
                            "Kindly upload your 3 Month Current Account Statement!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload
                        name="Month_Current_Account_Statement"
                        maxCount={1}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("Present_Occupation") === "Retired" && (
                    <Form.Item
                      name="Pension_Retirement_Order1"
                      label="Pension / Retirement Order"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message:
                            "Kindly upload your Pension / Retirement Order!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Pension_Retirement_Order1" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("Present_Occupation") === "Businessman" && (
                    <Form.Item
                      name="Shop_Establishment"
                      label="Shop Establishment"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message:
                            "Kindly upload your Shop Establishment Document!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Shop_Establishment" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                        >
                          Select File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )
                }
              </Form.Item>
              {/* <Form.Item
                name="Translated"
                label="Translated"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Translated Document!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload name="Translated" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item> */}
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  (getFieldValue("Present_Occupation") === "Agriculturist" ||
                    getFieldValue("Present_Occupation") === "Retired") && (
                    <Form.Item
                      name="Fard_With_Translation"
                      label="Fard With Translation"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your Fard With Translation!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Fard_With_Translation" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("Present_Occupation") === "Worker" && (
                    <Form.Item
                      name="Job_Letter"
                      label="Job Letter"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your Job Letter!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Job_Letter" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("Present_Occupation") === "Businessman" && (
                    <>
                      <Form.Item
                        name="Last_2_Pay_Slips"
                        label="Last 2 Pay Slips"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Last 2 Pay Slips!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload name="Last_2_Pay_Slips" maxCount={1}>
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
                        name="Business_ITR_if_possible"
                        label="Business ITR (if possible)"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
                        rules={[
                          {
                            required: true,
                            message:
                              "Kindly upload your Business ITR Document!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload name="Business_ITR_if_possible" maxCount={1}>
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
                        name="Business_Proof"
                        label="Business Proof"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Business Proof!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload name="Business_Proof" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
                  prevValues.Present_Occupation !==
                  currentValues.Present_Occupation
                }
              >
                {({ getFieldValue }) =>
                  (getFieldValue("Present_Occupation") === "Agriculturist" ||
                    getFieldValue("Present_Occupation") === "Retired") && (
                    <Form.Item
                      name="J_Form"
                      label="J Form"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your J Form!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="J_Form" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                        >
                          Select File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )
                }
              </Form.Item>
              {/* <Form.Item
                name="Fard"
                label="Fard"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Fard!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload name="Fard" maxCount={1}>
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition="end"
                    className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                  >
                    Select File
                  </Button>
                </Upload>
              </Form.Item> */}
            </div>
          </fieldset>
          <fieldset className="p-0">
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
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.Any_previous_travel_history !==
                currentValues.Any_previous_travel_history
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("Any_previous_travel_history") === "yes" && (
                  <fieldset className="p-0">
                    <legend className="font-bold !text-black !border-b-0 !mb-2">
                      Travel History
                    </legend>
                    <div className="w-[70vw] max-w-max overflow-x-auto mb-6">
                      <Space
                        className="border-t border-b w-max py-2 bg-zinc-50 !flex !mb-[15px]"
                        align="baseline"
                      >
                        <div className="w-[32px]"></div>
                        <div className="font-semibold w-[200px]">
                          Country Name
                        </div>
                        <div className="font-semibold w-[200px]">Year</div>
                        <div className="font-semibold w-[200px]">Duration</div>
                        <div className="font-semibold w-[200px]">Visa Type</div>
                      </Space>
                      <Form.List name="Travel_History">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                className="last: mb-0 !flex"
                                align="baseline"
                              >
                                <Button
                                  type="link"
                                  icon={<CloseOutlined />}
                                  danger
                                  onClick={() => remove(name)}
                                />
                                <Form.Item
                                  {...restField}
                                  name={[name, "Country_Name"]}
                                  className="w-[200px]"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Kindly input Country Name!",
                                    },
                                  ]}
                                >
                                  <Input maxLength={255} />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "Year_field"]}
                                  className="w-[200px]"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Kindly input Year!",
                                    },
                                  ]}
                                >
                                  <DatePicker
                                    picker="year"
                                    format="YYYY"
                                    className="w-[200px]"
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "Duration"]}
                                  className="w-[200px]"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Kindly input Duration!",
                                    },
                                  ]}
                                >
                                  <Input maxLength={255} />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "Visa_Type"]}
                                  className="w-[200px]"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Kindly select Visa Type!",
                                    },
                                  ]}
                                >
                                  <Select
                                    placeholder="Choose"
                                    options={TRAVEL_VISA_TYPE_OPTIONS}
                                  />
                                </Form.Item>
                              </Space>
                            ))}
                            {fields.length === 0 ? (
                              ""
                            ) : (
                              <Divider className="m-0" />
                            )}
                            <Form.Item
                              className={
                                fields.length === 0
                                  ? "text-center mb-3"
                                  : "mb-3"
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
                )
              }
            </Form.Item>
            <Form.Item
              name="Any_refusal"
              label="Any refusal"
              className="w-[300px]"
              rules={[
                {
                  required: true,
                  message: "Kindly input if any previous refusal!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.Any_refusal !== currentValues.Any_refusal
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("Any_refusal") === "yes" && (
                  <fieldset className="p-0">
                    <legend className="font-bold !text-black !border-b-0 !mb-2">
                      Refusal History
                    </legend>
                    <div className="w-[70vw] max-w-max overflow-x-auto mb-6">
                      <Space
                        className="border-t border-b w-max py-2 bg-zinc-50 !flex !mb-[15px]"
                        align="baseline"
                      >
                        <div className="w-[32px]"></div>
                        <div className="font-semibold w-[200px]">
                          Country Name
                        </div>
                        <div className="font-semibold w-[200px]">Year</div>
                        <div className="font-semibold w-[200px]">Visa Type</div>
                      </Space>
                      <Form.List name="Refusal_History">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                className="last: mb-0 !flex"
                                align="baseline"
                              >
                                <Button
                                  type="link"
                                  icon={<CloseOutlined />}
                                  danger
                                  onClick={() => remove(name)}
                                />
                                <Form.Item
                                  {...restField}
                                  name={[name, "Country_Name"]}
                                  className="w-[200px]"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Kindly input Country Name!",
                                    },
                                  ]}
                                >
                                  <Input maxLength={255} />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "Year_field"]}
                                  className="w-[200px]"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Kindly input Year!",
                                    },
                                  ]}
                                >
                                  <DatePicker
                                    picker="year"
                                    format="YYYY"
                                    className="w-[200px]"
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "Visa_Type"]}
                                  className="w-[200px]"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Kindly input Visa Type!",
                                    },
                                  ]}
                                >
                                  <Select
                                    placeholder="Choose"
                                    options={REFUSAL_VISA_TYPE_OPTIONS}
                                  />
                                </Form.Item>
                              </Space>
                            ))}
                            {fields.length === 0 ? (
                              ""
                            ) : (
                              <Divider className="m-0" />
                            )}
                            <Form.Item
                              className={
                                fields.length === 0
                                  ? "text-center mb-3"
                                  : "mb-3"
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
                )
              }
            </Form.Item>
            <Form.Item
              name="Any_health_issues"
              label="Any health issues"
              className="w-[300px]"
              rules={[
                {
                  required: true,
                  message: "Kindly input if any health issues!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.Any_health_issues !== currentValues.Any_health_issues
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("Any_health_issues") === "yes" && (
                  <>
                    <Form.Item
                      label="Health issues Details"
                      name="Health_issues_Deatils"
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input Health issues Details!",
                        },
                      ]}
                    >
                      <TextArea
                        maxLength={100}
                        style={{
                          height: 100,
                          resize: "none",
                        }}
                        className="sm:!max-w-[210px] md:!max-w-[250px] lg:!max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      name="Medical_Certificate"
                      label="Medical Certificate"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your Medical Certificate!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Medical_Certificate" maxCount={1}>
                        <Button
                          icon={<UploadOutlined />}
                          iconPosition="end"
                          className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
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
              name="English_proficiency_test"
              label="English proficiency test"
              className="w-[300px]"
              rules={[
                {
                  required: true,
                  message: "Kindly input if English Proficiency Test taken!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.English_proficiency_test !==
                currentValues.English_proficiency_test
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("English_proficiency_test") === "yes" && (
                  <>
                    <Form.Item
                      label="Band Score"
                      name="Band_Score"
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input Band Score!",
                        },
                      ]}
                    >
                      <InputNumber
                        className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                        placeholder="#######"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Reading"
                      name="Reading"
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input Reading Score!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Listening"
                      name="Listining"
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input Listening Score!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Writing"
                      name="Writing"
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input Writing Score!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Speaking"
                      name="Speaking"
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input Speaking Score!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Overall"
                      name="Overall"
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input Overall Score!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                  </>
                )
              }
            </Form.Item>
            <Form.Item
              name="Do_you_Depend_On_someone"
              label="Do You Need Financial help ?"
              className="w-[300px]"
              rules={[
                {
                  required: true,
                  message: "Kindly input if you need financial help!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.Do_you_Depend_On_someone !==
                currentValues.Do_you_Depend_On_someone
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("Do_you_Depend_On_someone") === "yes" && (
                  <Form.Item
                    label="Relation"
                    name="Relation"
                    className="w-[300px]"
                    rules={[
                      {
                        required: true,
                        message: "Kindly choose Relation!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Choose"
                      className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                      options={RELATION_OPTIONS}
                    />
                  </Form.Item>
                )
              }
            </Form.Item>
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
          <fieldset className="p-0">
            <legend className="font-bold !text-black">
              Sponser Check List
            </legend>
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
                  className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                >
                  Select File
                </Button>
              </Upload>
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

export default VisitorVisa;
