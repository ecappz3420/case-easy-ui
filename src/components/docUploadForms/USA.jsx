import React, { useState } from "react";
import {
  Form,
  Select,
  Input,
  InputNumber,
  Upload,
  Checkbox,
  Radio,
  DatePicker,
  Button,
  Flex,
  Space,
  Divider,
  message,
} from "antd";
import {
  UploadOutlined,
  MailOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  PAYMENT_DETAILS_OPTIONS,
  COUNTRY_CODE_OPTIONS,
} from "./utils/selectOptions";

import { LANGUAGE_OPTIONS } from "./utils/languageSelectOptions";

import addRecord from "../../api/addRecord";
import { useSelector } from "react-redux";
import uploadFile from "../../api/uploadFile";

const { TextArea } = Input;

const Phone1CountrySelect = (
  <Form.Item name="Phone1_Country_Code" initialValue="+91" noStyle>
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

const Phone2CountrySelect = (
  <Form.Item name="Phone2_Country_Code" initialValue="+91" noStyle>
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

const USA = ({ setDocObj }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const lead = useSelector((state) => state.client.details);

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log("Upload: ", e?.fileList);
    return e?.fileList;
  };

  const isFileEmpty = (_, fileList) => {
    if (fileList && fileList[0]?.size === 0) {
      return Promise.reject(
        new Error(
          "Empty file found. Please try uploading another file with data."
        )
      );
    }
    return Promise.resolve();
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
        Mobile: lead.Mobile,
        Email: lead.Email,

        //File upload fields
        Passport: "",
        Aadhar_card: "",
        th1: "",
        th: "",
        TRF: "",
        Offer_Letter: "",
        I20_Study: "",

        ...(data?.Phone_Number1 && {
          Phone_Number1: data.Phone1_Country_Code + data.Phone_Number1,
        }),
        ...(data?.Phone_Number2 && {
          Phone_Number2: data.Phone2_Country_Code + data.Phone_Number2,
        }),

        // Format date fields
        Father_DOB: data.Father_DOB?.format("DD-MMM-YYYY") || "",
        Mother_DOB: data.Mother_DOB?.format("DD-MMM-YYYY") || "",
        DOB: data.DOB?.format("DD-MMM-YYYY") || "",
        Starting_Date: data.Starting_Date?.format("DD-MMM-YYYY") || "",
        Employment_Starting_Date:
          data.Employment_Starting_Date?.format("DD-MMM-YYYY") || "",
        Employment_End_Date:
          data.Employment_End_Date?.format("DD-MMM-YYYY") || "",
        Course_Starting_Date:
          data.Course_Starting_Date?.format("DD-MMM-YYYY") || "",
        Course_End_Date: data.Course_End_Date?.format("DD-MMM-YYYY") || "",

        // Format Year fields in the Traveling_History array
        Traveling_History: data.Traveling_History?.map((item) => ({
          ...item,
          Year_field: item.Year_field?.format("DD-MMM-YYYY") || "",
        })),
      };

      //Exclude Country codes on form submission
      const { Phone1_Country_Code, Phone2_Country_Code, ...formData } =
        formattedData;

      await ZOHO.CREATOR.init();
      const response = await addRecord("USA", formData);
      console.log(response);

      if (response.code !== 3000) throw new Error(response.error);

      const recordId = response.data.ID;

      data.Passport?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Usa",
            recordId,
            "Passport",
            data.Passport[0].originFileObj
          )
        );
      data.Aadhar_card?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Usa",
            recordId,
            "Aadhar_card",
            data.Aadhar_card[0].originFileObj
          )
        );
      data.th1?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Usa",
            recordId,
            "th1",
            data.th1[0].originFileObj
          )
        );
      data.th?.length > 0 &&
        console.log(
          await uploadFile("All_Usa", recordId, "th", data.th[0].originFileObj)
        );
      data.TRF?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Usa",
            recordId,
            "TRF",
            data.TRF[0].originFileObj
          )
        );
      data.Offer_Letter?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Usa",
            recordId,
            "Offer_Letter",
            data.Offer_Letter[0].originFileObj
          )
        );
      data.I20_Study?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Usa",
            recordId,
            "I20_Study",
            data.I20_Study[0].originFileObj
          )
        );

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
      <h1 className="p-5 font-bold mb-2 border-b">USA</h1>
      <div className="p-5">
        <Form
          form={form}
          layout="vertical"
          scrollToFirstError={true}
          onFinish={onFinish}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
            <Form.Item
              name="Passport"
              label="Passport"
              valuePropName="fileList"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              getValueFromEvent={getFile}
              rules={[
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
              name="Aadhar_card"
              label="Aadhaar Card"
              valuePropName="fileList"
              getValueFromEvent={getFile}
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              rules={[
                // {
                //   required: true,
                //   message: "Kindly upload your Aadhaar Card!",
                // },
                {
                  validator: isFileEmpty,
                },
              ]}
            >
              <Upload
                name="Aadhar_card"
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
              name="th1"
              label="10th"
              valuePropName="fileList"
              getValueFromEvent={getFile}
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              rules={[
                // {
                //   required: true,
                //   message: "Kindly upload your 10th Document!",
                // },
                {
                  validator: isFileEmpty,
                },
              ]}
            >
              <Upload name="th1" maxCount={1} beforeUpload={() => false}>
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
              name="th"
              label="12th"
              valuePropName="fileList"
              getValueFromEvent={getFile}
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              rules={[
                // {
                //   required: true,
                //   message: "Kindly upload your 12th Document!",
                // },
                {
                  validator: isFileEmpty,
                },
              ]}
            >
              <Upload name="th" maxCount={1} beforeUpload={() => false}>
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
              name="TRF"
              label="TRF"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              valuePropName="fileList"
              getValueFromEvent={getFile}
              rules={[
                // {
                //   required: true,
                //   message: "Kindly upload your TRF!",
                // },
                {
                  validator: isFileEmpty,
                },
              ]}
            >
              <Upload name="TRF" maxCount={1} beforeUpload={() => false}>
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
              name="Offer_Letter"
              label="Offer Letter (Study)"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              valuePropName="fileList"
              getValueFromEvent={getFile}
              rules={[
                // {
                //   required: true,
                //   message: "Kindly upload your Offer Letter (Study)!",
                // },
                {
                  validator: isFileEmpty,
                },
              ]}
            >
              <Upload
                name="Offer_Letter_Study"
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
              name="I20_Study"
              label="I20 (Study)"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              valuePropName="fileList"
              getValueFromEvent={getFile}
              rules={[
                // {
                //   required: true,
                //   message: "Kindly upload your I20 (Study)!",
                // },
                {
                  validator: isFileEmpty,
                },
              ]}
            >
              <Upload name="I20_Study" maxCount={1} beforeUpload={() => false}>
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
          <Flex>
            <Form.Item
              name="Embassy_Fee"
              label={<label className="font-semibold">Embassy Fee</label>}
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] me-5 mb-0"
            >
              <Checkbox.Group>
                <Space direction="vertical">
                  <Checkbox
                    value="Sevis fee :- 29750"
                    className="w-max sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                    style={{
                      lineHeight: "86px",
                    }}
                  >
                    Sevis fee :- 29750
                  </Checkbox>
                  <Checkbox
                    value="DS160:-15725"
                    className="w-max sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                    style={{
                      lineHeight: "86px",
                    }}
                  >
                    DS160:-15725
                  </Checkbox>
                  <Checkbox
                    value="Offer Letter fees"
                    className="w-max sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                    style={{
                      lineHeight: "86px",
                    }}
                  >
                    Offer Letter fees
                  </Checkbox>
                </Space>
              </Checkbox.Group>
            </Form.Item>
            <Space direction="vertical" className="mt-[30px]">
              <Form.Item
                label="Sevis Payment Details"
                name="Sevis_Payment_Details"
                className="w-[200px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Select
                  placeholder="Choose"
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  options={PAYMENT_DETAILS_OPTIONS}
                />
              </Form.Item>
              <Form.Item
                label="DS160 Payment Details"
                name="DS160_Payment_Details"
                className="w-[200px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Select
                  placeholder="Choose"
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  options={PAYMENT_DETAILS_OPTIONS}
                />
              </Form.Item>
              <Form.Item
                label="Offer Letter Payment Details"
                name="Offer_Letter_Payment_Details"
                className="w-[200px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Select
                  placeholder="Choose"
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  options={PAYMENT_DETAILS_OPTIONS}
                />
              </Form.Item>
            </Space>
          </Flex>
          <Form.Item
            name="Choose"
            valuePropName="checked"
            layout="horizontal"
            className="mb-0"
          >
            <Checkbox className="font-semibold">Choose</Checkbox>
          </Form.Item>
          <p className="text-gray-600 text-xs mb-6">
            If Applicant want to Apply for Masters Degree then, education
            Assessment :-2500
          </p>
          <fieldset className="p-0">
            <legend className="font-bold !border-b-0 !text-black !text-2xl !mb-3">
              Question
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
              <Form.Item
                label="Preferred location of interview?"
                name="preferred_location_of_interview"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Instagram or Feedback Id (If Possible)"
                name="Instagram_or_Feedback_Id_If_Possible"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Person Paying for your trip (Relationship with person)"
                name="p"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                name="Have_You_Ever_Been_in_USA_or_Issued_any_USA_Visa"
                label="Have You Ever Been in USA or Issued any USA Visa?"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Radio.Group>
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </fieldset>
          <fieldset className="p-0">
            <legend className="font-bold !border-b-0 !text-black !text-lg !mb-3">
              USA Person Contact Where You Stay
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
              <Form.Item
                label="Person Or Organization Name"
                name="Person_Or_Organization_Name"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Relationship to You"
                name="Relationship_to_the_Sponser"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Address"
                name="Address"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <TextArea
                  maxLength={100}
                  style={{
                    height: 100,
                    resize: "none",
                  }}
                  className="sm:!max-w-[200px] md:!max-w-[250px] lg:!max-w-[300px]"
                />
              </Form.Item>
              <Flex vertical>
                <Form.Item
                  label="Phone Number"
                  name="Phone_Number1"
                  className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (value) {
                          // Get the country code from the `Phone1CountrySelect` dropdown
                          let countryCode =
                            form.getFieldValue("Phone1_Country_Code") || "";
                          // Strip the '+' if present
                          countryCode = countryCode.startsWith("+")
                            ? countryCode.slice(1)
                            : countryCode;

                          // Combine the country code and phone number
                          const fullNumber = `${countryCode}${value}`;

                          // Validate the length
                          if (fullNumber.length > 15) {
                            return Promise.reject(
                              new Error(
                                `The phone number (including the country code) should not exceed 15 digits.`
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
                    addonBefore={Phone1CountrySelect}
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  />
                </Form.Item>
                <Form.Item
                  name="Email_Address"
                  label="Email Address"
                  rules={[{ type: "email" }]}
                  className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                >
                  <Input
                    maxLength={80}
                    addonAfter={<MailOutlined />}
                    className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                  />
                </Form.Item>
              </Flex>
              <Form.Item
                label="Mother DOB"
                name="Mother_DOB"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <DatePicker
                  format="DD-MMM-YYYY"
                  className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Father DOB"
                name="Father_DOB"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <DatePicker
                  format="DD-MMM-YYYY"
                  className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
            </div>
            <Form.Item
              name="Is_Your_Mother_Or_Father_In_USA"
              label="Is Your Mother Or Father In USA"
            >
              <Radio.Group>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="Marital_Status1" label="Marital Status">
              <Radio.Group>
                <Radio value="Married">Married</Radio>
                <Radio value="Unmarried">Unmarried</Radio>
              </Radio.Group>
            </Form.Item>
          </fieldset>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.Marital_Status1 !== currentValues.Marital_Status1
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("Marital_Status1") === "Married" && (
                <fieldset className="p-0">
                  <legend className="font-bold !text-black">
                    Marital Status
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
                    <Form.Item
                      label="Spouse Name"
                      name="Spouse_Name"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Spouse Name!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="DOB"
                      name="DOB"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Spouse DOB!",
                        },
                      ]}
                    >
                      <DatePicker
                        format="DD-MMM-YYYY"
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="City Of Birth"
                      name="City_Of_Birth"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Spouse City of Birth!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Nationality"
                      name="Natiolity"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Spouse Nationality!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                  </div>
                </fieldset>
              )
            }
          </Form.Item>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">
              Occupation Details
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
              <Form.Item
                label="Primary Or Current Occupation"
                name="Primary_Or_Current_ccupation"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Address Of School Or Work"
                name="Address_Of_School_Or_Work"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <Input
                  maxLength={255}
                  className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
              <Form.Item
                label="Telephone Number"
                name="Telephone_Number"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              >
                <InputNumber
                  maxLength={10}
                  className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Starting Date"
              name="Starting_Date"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            >
              <DatePicker
                format="DD-MMM-YYYY"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              />
            </Form.Item>
            <Form.Item name="Previous_Employed1" label="Experience">
              <Radio.Group>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>
          </fieldset>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.Previous_Employed1 !== currentValues.Previous_Employed1
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("Previous_Employed1") === "Yes" && (
                <fieldset className="p-0">
                  <legend className="font-bold !text-black">
                    Experience Details
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
                    <Form.Item
                      label="Organization Name"
                      name="Organization_Name"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Organization Name!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Address"
                      name="Address1"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Organization Address!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Phone Number"
                      name="Phone_Number2"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message:
                            "Kindly input your Organization Phone Number!",
                        },
                        {
                          validator: (_, value) => {
                            if (value) {
                              // Get the country code from the `Phone2CountrySelect` dropdown
                              let countryCode =
                                form.getFieldValue("Phone2_Country_Code") || "";
                              // Strip the '+' if present
                              countryCode = countryCode.startsWith("+")
                                ? countryCode.slice(1)
                                : countryCode;

                              // Combine the country code and phone number
                              const fullNumber = `${countryCode}${value}`;

                              // Validate the length
                              if (fullNumber.length > 15) {
                                return Promise.reject(
                                  new Error(
                                    `The phone number (including the country code) should not exceed 15 digits.`
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
                        addonBefore={Phone2CountrySelect}
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Job Title"
                      name="Job_Title"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Job Title!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Employment Starting Date"
                      name="Employment_Starting_Date"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message:
                            "Kindly input your Employment Starting Date!",
                        },
                      ]}
                    >
                      <DatePicker
                        format="DD-MMM-YYYY"
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Employment End Date"
                      name="Employment_End_Date"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Employment End Date!",
                        },
                      ]}
                    >
                      <DatePicker
                        format="DD-MMM-YYYY"
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Main Duty"
                      name="Main_Duty"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly input your Main Duty!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                  </div>
                </fieldset>
              )
            }
          </Form.Item>
          <Form.Item
            name="Have_you_ever_Attended_any_Educational_institution_at_secondary_level_or_above"
            label="Have you ever Attended any Educational institution at secondary level or above?"
          >
            <Radio.Group>
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.Have_you_ever_Attended_any_Educational_institution_at_secondary_level_or_above !==
              currentValues.Have_you_ever_Attended_any_Educational_institution_at_secondary_level_or_above
            }
          >
            {({ getFieldValue }) =>
              getFieldValue(
                "Have_you_ever_Attended_any_Educational_institution_at_secondary_level_or_above"
              ) === "Yes" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
                    <Form.Item
                      label="Provide name of institution"
                      name="Provide_name_of_institution"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly provide your name of institution!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Address"
                      name="Address2"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message:
                            "Kindly provide your address of institution!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Course Of Study"
                      name="Course_Of_Study"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly provide your Course Of Study!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={255}
                        className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
                    <Form.Item
                      label="Course Starting Date"
                      name="Course_Starting_Date"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly provide your Course Starting Date!",
                        },
                      ]}
                    >
                      <DatePicker
                        format="DD-MMM-YYYY"
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Course End Date"
                      name="Course_End_Date"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      rules={[
                        {
                          required: true,
                          message: "Kindly provide your Course End Date!",
                        },
                      ]}
                    >
                      <DatePicker
                        format="DD-MMM-YYYY"
                        className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      />
                    </Form.Item>
                  </div>
                </>
              )
            }
          </Form.Item>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Language Details</legend>
            <Form.Item
              label="List of languages you speak"
              name="List_of_languages_you_speak"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            >
              <Select
                mode="multiple"
                options={LANGUAGE_OPTIONS}
                allowClear
                placeholder="Choose"
                className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] max-h-[145px] overflow-y-auto"
              />
            </Form.Item>
            <Form.Item
              name="Have_you_travel_to_any_country_within_last_five_years"
              label="Have you traveled to any country within last five years?"
            >
              <Radio.Group>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.Have_you_travel_to_any_country_within_last_five_years !==
                currentValues.Have_you_travel_to_any_country_within_last_five_years
              }
            >
              {({ getFieldValue }) =>
                getFieldValue(
                  "Have_you_travel_to_any_country_within_last_five_years"
                ) === "Yes" && (
                  <fieldset className="p-0">
                    <legend className="font-bold !text-black !border-b-0 !mb-2">
                      Traveling History
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
                      </Space>
                      <Form.List name="Traveling_History">
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
                                    format="DD-MMM-YYYY"
                                    className="w-[200px]"
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
          </fieldset>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Health Details</legend>
            <Form.Item
              name="Do_you_have_any_health_issues"
              label="Do you have any health issues?"
            >
              <Radio.Group>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.Do_you_have_any_health_issues !==
                currentValues.Do_you_have_any_health_issues
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("Do_you_have_any_health_issues") === "Yes" && (
                  <Form.Item
                    label="Health Issue"
                    name="Health_Issue"
                    className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                    rules={[
                      {
                        required: true,
                        message: "Kindly input details on Health Issue!",
                      },
                    ]}
                  >
                    <TextArea
                      maxLength={100}
                      style={{
                        height: 100,
                        resize: "none",
                      }}
                      className="sm:!max-w-[200px] md:!max-w-[250px] lg:!max-w-[300px]"
                    />
                  </Form.Item>
                )
              }
            </Form.Item>
          </fieldset>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">
              Additional Details
            </legend>
            <Form.Item
              name="ave_you_ever_served_in_military"
              label="Have you ever served in military"
            >
              <Radio.Group>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
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

export default USA;
