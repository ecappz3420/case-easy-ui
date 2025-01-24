import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  Button,
  Flex,
  Space,
  Upload,
  DatePicker,
  Divider,
  message,
} from "antd";

import addRecord from "../../api/addRecord";
import { useSelector } from "react-redux";
import uploadFile from "../../api/uploadFile";

const VisitorStudies = ({ setDocObj }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const lead = useSelector((state) => state.client.details);

  //Set TRF_File field in form with file details
  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
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
    return Promise.resolve();
  };

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

        //File upload fields
        TRF: "",

        // Format intake date field
        intake: data.intake?.format("DD-MMM-YYYY") || "",

        // Format Year fields in the Education_Details array
        Education_Details: data.Education_Details?.map((item) => ({
          ...item,
          Year_field: item.Year_field?.format("DD-MMM-YYYY") || "",
        })),
      };
      await ZOHO.CREATOR.init();
      const response = await addRecord("Visitor_to_Study", formattedData);
      console.log(response);

      if (response.code !== 3000) throw new Error(response.error);

      //Uploading Files to Zoho after successful adding of Record
      const recordId = response.data.ID;

      data.TRF?.length > 0 &&
        console.log(
          await uploadFile(
            "All_Visitor_Studies",
            recordId,
            "TRF",
            data.TRF[0].originFileObj
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
      <h1 className="p-5 font-bold mb-2 border-b">Visitor to Study</h1>
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
                          icon={<i className="bi bi-x"></i>}
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
                            maxLength={10}
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
                        icon={<i className="bi bi-plus"></i>}
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
            <legend className="font-bold !text-black">Visitor To Study</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
              <Form.Item
                name="IELTS"
                label="IELTS"
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
                  prevValues.IELTS !== currentValues.IELTS
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("IELTS") === "Yes" && (
                    <Form.Item
                      name="TRF"
                      label="TRF"
                      className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
                      valuePropName="fileList"
                      getValueFromEvent={getFile}
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
                      <Upload
                        name="TRF"
                        maxCount={1}
                        beforeUpload={() => false}
                      >
                        <Button
                          icon={<i className="bi bi-upload"></i>}
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
            </div>
          </fieldset>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.IELTS !== currentValues.IELTS
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("IELTS") === "Yes" && (
                <fieldset className="p-0">
                  <legend className="font-bold !text-black !border-b-0 !mb-2">
                    IELTS Details
                  </legend>
                  <div className="w-[70vw] max-w-max overflow-x-auto mb-6">
                    <Space
                      className="border-t border-b w-max py-2 bg-zinc-50 !flex !mb-[15px]"
                      align="baseline"
                    >
                      <div className="w-[32px]"></div>
                      <div className="font-semibold w-[200px]">Reading</div>
                      <div className="font-semibold w-[200px]">Listening</div>
                      <div className="font-semibold w-[200px]">Speaking</div>
                      <div className="font-semibold w-[200px]">Writing</div>
                    </Space>
                    <Form.List name="Ilets_Details">
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
                                icon={<i className="bi bi-x"></i>}
                                danger
                                onClick={() => remove(name)}
                              />
                              <Form.Item
                                {...restField}
                                name={[name, "Reading"]}
                                className="w-[200px]"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Kindly input information on Reading!",
                                  },
                                ]}
                              >
                                <Input maxLength={255} />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "Listening"]}
                                className="w-[200px]"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Kindly input information on Listening!",
                                  },
                                ]}
                              >
                                <Input maxLength={255} />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "Speaking"]}
                                className="w-[200px]"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Kindly input information on Speaking!",
                                  },
                                ]}
                              >
                                <Input maxLength={255} />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "Writing"]}
                                className="w-[200px]"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Kindly input information on Writing!",
                                  },
                                ]}
                              >
                                <Input maxLength={255} />
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
                              fields.length === 0 ? "text-center mb-3" : "mb-3"
                            }
                          >
                            <Button
                              type="link"
                              onClick={() => add()}
                              icon={<i className="bi bi-plus"></i>}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 justify-items-start max-w-[100%]">
            <Form.Item
              label="Preferred College"
              name="Preferred_College"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            >
              <Input
                maxLength={255}
                className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              />
            </Form.Item>
            <Form.Item
              label="Location"
              name="Location"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            >
              <Input
                maxLength={255}
                className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              />
            </Form.Item>
            <Form.Item
              label="Program"
              name="Program"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            >
              <Input
                maxLength={255}
                className="sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              />
            </Form.Item>
            <Form.Item
              label="Intake"
              name="intake"
              className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
            >
              <DatePicker
                format="DD-MMM-YYYY"
                className="w-[300px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
              />
            </Form.Item>
          </div>
          <fieldset className="p-0">
            <legend className="font-bold !text-black">Check List</legend>
            <Form.Item
              name="TRF1"
              valuePropName="checked"
              layout="horizontal"
              className="justify-self-start md:self-center"
            >
              <Checkbox>TRF</Checkbox>
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

export default VisitorStudies;
