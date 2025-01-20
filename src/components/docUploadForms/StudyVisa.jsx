import React from "react";
import {
  Form,
  Select,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Button,
  Flex,
  Space,
  Row,
  Col,
  Upload,
  DatePicker,
  Divider,
} from "antd";
import { UploadOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { CASE_TYPE_OPTIONS } from "./utils/selectOptions";

const { TextArea } = Input;

const StudyVisa = () => {
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

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      Education_Details: values.Education_Details?.map((item) => ({
        ...item,
        Year_field: item.Year_field?.format("YYYY") || "",
      })),
    };
    console.log("Submitted Data:", formattedValues);
  };

  return (
    <>
      <h1 className="p-5 font-bold mb-2 border-b">Study Visa</h1>
      <div className="p-5">
        <Form
          form={form}
          layout="vertical"
          scrollToFirstError={true}
          onFinish={onFinish}
        >
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
              initialValue="Study Visa"
              className="w-[300px]"
            >
              <Select
                placeholder="Choose"
                className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                options={CASE_TYPE_OPTIONS}
                disabled
              />
            </Form.Item>
          </div>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Basic Questions</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
              <Form.Item
                name="Is_Passport"
                label="Is Passport"
                className="w-[300px]"
              >
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.Is_Passport !== currentValues.Is_Passport
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("Is_Passport") === "yes" && (
                    <Form.Item
                      name="Passport_Upload"
                      label="Passport Upload"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your Passport!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Passport_Upload" maxCount={1}>
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
              <Form.Item name="IELTS" label="IELTS" className="w-[300px]">
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.IELTS !== currentValues.IELTS
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("IELTS") === "yes" && (
                    <Form.Item
                      name="TRF"
                      label="TRF"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your TRF!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="TRF" maxCount={1}>
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
            </div>
            <Form.Item
              name="All_Education_Documents"
              label="All Education Documents"
              className="w-[300px]"
            >
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox
                      value="10th"
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      10th
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="12th"
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      12th
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="Bachelors"
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      Bachelors
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="Masters"
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      Masters
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value="Diploma"
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      Diploma
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.All_Education_Documents !==
                currentValues.All_Education_Documents
              }
            >
              {({ getFieldValue }) => {
                const selectedDocs =
                  getFieldValue("All_Education_Documents") || [];
                return (
                  <Flex vertical>
                    {selectedDocs.includes("10th") && (
                      <Form.Item
                        name="th1"
                        label="10th"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your 10th Document!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload name="th1" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                    )}
                    {selectedDocs.includes("12th") && (
                      <Form.Item
                        name="th"
                        label="12th"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your 12th Document!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload name="th" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                    )}
                    {selectedDocs.includes("Bachelors") && (
                      <Form.Item
                        name="Bachelors"
                        label="Bachelors"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Bachelors Document!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload name="Bachelors" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                    )}
                    {selectedDocs.includes("Masters") && (
                      <Form.Item
                        name="Masters"
                        label="Masters"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Masters Document!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload name="Masters" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                    )}
                    {selectedDocs.includes("Diploma") && (
                      <Form.Item
                        name="Diploma"
                        label="Diploma"
                        valuePropName="file"
                        getValueFromEvent={getFile}
                        className="w-[300px]"
                        rules={[
                          {
                            required: true,
                            message: "Kindly upload your Diploma Document!",
                          },
                          {
                            validator: isFileEmpty,
                          },
                        ]}
                      >
                        <Upload name="Diploma" maxCount={1}>
                          <Button
                            icon={<UploadOutlined />}
                            iconPosition="end"
                            className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px] mb-1"
                          >
                            Select File
                          </Button>
                        </Upload>
                      </Form.Item>
                    )}
                  </Flex>
                );
              }}
            </Form.Item>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
              <Form.Item
                name="if_spou"
                valuePropName="checked"
                className="w-[300px]"
              >
                <Checkbox className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]">
                  if spouse is in CANADA but on Work Permit
                </Checkbox>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.if_spou !== currentValues.if_spou
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("if_spou") === true && (
                    <Form.Item
                      name="Spouse_Passport"
                      label="Spouse Passport"
                      valuePropName="file"
                      getValueFromEvent={getFile}
                      className="w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly upload your Spouse Passport!",
                        },
                        {
                          validator: isFileEmpty,
                        },
                      ]}
                    >
                      <Upload name="Spouse_Passport" maxCount={1}>
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
              <Form.Item
                name="Pay_Slips"
                label="3 Pay Slips"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your 3 Pay Slips!",
                  // },
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
                name="Account_Balance"
                label="Account Summary and Balance"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Account Summary and Balance Document!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload name="Account_Balance" maxCount={1}>
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
                name="Work_Permit"
                label="Work Permit"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Work Permit!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload name="Work_Permit" maxCount={1}>
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
                label="Job Letter / Appointment Letter"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Job Letter / Appointment Letter!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload name="Job_Letter_Appointment_Letter" maxCount={1}>
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
                name="Chat_and_call_History"
                label="Chat and Call History"
                valuePropName="file"
                getValueFromEvent={getFile}
                className="w-[300px]"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Kindly upload your Chat and Call History!",
                  // },
                  {
                    validator: isFileEmpty,
                  },
                ]}
              >
                <Upload name="Chat_and_call_History" maxCount={1}>
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
            <legend className="font-bold !text-black">
              Study Visa Questions
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10em] justify-items-start max-w-max">
              <Form.Item
                label="Any Previous Refusal"
                name="Any_Previous_Refusal"
                className="w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Backlog"
                name="Backlog"
                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
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
                label="Any Specific preference for College, Program or Campus"
                name="Any_Specific_preference_for_College_Program_or_Campus"
                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
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
                label="Gap Justification"
                name="Gap_Justification"
                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
                labelCol={{ style: { height: 52 } }}
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
                            picker="year"
                            format="YYYY"
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
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Visa Chances</legend>
            <Form.Item
              label="Visa Chances"
              name="Visa_Chances"
              className="w-[300px]"
            >
              <InputNumber
                className="w-[300px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[300px]"
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

export default StudyVisa;
